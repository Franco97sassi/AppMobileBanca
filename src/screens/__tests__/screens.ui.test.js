import React from 'react';
import { Alert } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { initialTransactions } from '../../data/demo';
import { ActivityScreen } from '../ActivityScreen';
import { CardsScreen } from '../CardsScreen';
import { HomeScreen } from '../HomeScreen';
import { LoginScreen } from '../LoginScreen';
import { ProfileScreen } from '../ProfileScreen';
import { TransferScreen } from '../TransferScreen';

describe('pantallas principales', () => {
  afterEach(() => jest.useRealTimers());

  test('inicia sesión con las credenciales demo y permite mostrar la contraseña', () => {
    jest.useFakeTimers();
    const onLogin = jest.fn();
    render(<LoginScreen onLogin={onLogin} />);
    fireEvent.press(screen.getByLabelText('Mostrar contraseña'));
    expect(screen.getByLabelText('Ocultar contraseña')).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Acceder' }));
    expect(screen.getByText('Accediendo…')).toBeOnTheScreen();
    jest.advanceTimersByTime(650);
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  test('filtra la actividad por texto y tipo', () => {
    render(<ActivityScreen transactions={initialTransactions} />);
    fireEvent.changeText(screen.getByPlaceholderText('Buscar movimientos'), 'spotify');
    expect(screen.getByText('Spotify')).toBeOnTheScreen();
    expect(screen.queryByText('Mercado Central')).not.toBeOnTheScreen();
    fireEvent.changeText(screen.getByPlaceholderText('Buscar movimientos'), '');
    fireEvent.press(screen.getByText('Ingresos'));
    expect(screen.getByText('Nómina Acme Studio')).toBeOnTheScreen();
    expect(screen.queryByText('Spotify')).not.toBeOnTheScreen();
  });

  test('navega desde inicio y oculta el saldo', () => {
    const goTransfer = jest.fn(); const goActivity = jest.fn();
    render(<HomeScreen transactions={initialTransactions} goTransfer={goTransfer} goActivity={goActivity} />);
    fireEvent.press(screen.getByLabelText('Mostrar u ocultar saldo'));
    expect(screen.getAllByText('••••••').length).toBeGreaterThan(0);
    fireEvent.press(screen.getByText('Enviar'));
    fireEvent.press(screen.getByText('Ver todo'));
    expect(goTransfer).toHaveBeenCalled(); expect(goActivity).toHaveBeenCalled();
  });

  test('actualiza controles de tarjeta y cierra sesión desde perfil', () => {
    const { unmount } = render(<CardsScreen />);
    fireEvent(screen.getByRole('switch', { name: 'Congelar tarjeta' }), 'valueChange', true);
    expect(screen.getByText('Tarjeta congelada')).toBeOnTheScreen();
    unmount();
    const logout = jest.fn(); render(<ProfileScreen logout={logout} />);
    fireEvent.press(screen.getByText('Cerrar sesión'));
    expect(logout).toHaveBeenCalled();
  });
});

describe('transferencias', () => {
  test('valida datos incompletos y completa un envío', async () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const onSubmit = jest.fn().mockResolvedValue(initialTransactions[0]);
    render(<TransferScreen onSubmit={onSubmit} />);
    fireEvent.press(screen.getByRole('button', { name: 'Revisar y enviar' }));
    expect(alert).toHaveBeenCalled();
    fireEvent.press(screen.getByText('Ana'));
    fireEvent.changeText(screen.getByPlaceholderText('0,00'), '25,50');
    fireEvent.changeText(screen.getByPlaceholderText('¿Para qué es?'), 'Cena');
    fireEvent.press(screen.getByRole('button', { name: 'Revisar y enviar' }));
    await waitFor(() => expect(screen.getByText('¡Transferencia enviada!')).toBeOnTheScreen());
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ beneficiaryName: 'Ana López', amount: 25.5, concept: 'Cena' }), expect.any(AbortSignal));
    alert.mockRestore();
  });

  test('muestra el error entregado por el repositorio', async () => {
    render(<TransferScreen onSubmit={jest.fn().mockRejectedValue(new Error('Servicio no disponible'))} />);
    fireEvent.press(screen.getByText('Ana'));
    fireEvent.changeText(screen.getByPlaceholderText('0,00'), '10');
    fireEvent.press(screen.getByRole('button', { name: 'Revisar y enviar' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Servicio no disponible');
  });
});

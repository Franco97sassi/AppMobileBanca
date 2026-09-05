import React from 'react';
import { Linking } from 'react-native';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import App from '../../App';

jest.spyOn(Linking, 'addEventListener').mockReturnValue({ remove: jest.fn() });
jest.spyOn(Linking, 'getInitialURL').mockResolvedValue(null);

test('integra autenticación, carga y navegación principal', async () => {
  jest.useFakeTimers();
  render(<App />);
  fireEvent.press(screen.getByRole('button', { name: 'Acceder' }));
  await act(async () => { jest.advanceTimersByTime(700); });
  await waitFor(() => expect(screen.getByText('Hola, Daniela')).toBeOnTheScreen());
  fireEvent.press(screen.getByRole('tab', { name: 'Actividad' }));
  expect(screen.getByText('Todos tus movimientos')).toBeOnTheScreen();
  fireEvent.press(screen.getByRole('tab', { name: 'Enviar' }));
  expect(screen.getByText('Transferencia inmediata')).toBeOnTheScreen();
  jest.useRealTimers();
});

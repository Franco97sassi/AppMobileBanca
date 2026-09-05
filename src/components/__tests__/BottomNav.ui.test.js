import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { BottomNav } from '../BottomNav';

test('expone navegación accesible y comunica el destino seleccionado', () => {
  const onChange = jest.fn();
  render(<BottomNav active="home" onChange={onChange} />);
  expect(screen.getByRole('tab', { name: 'Inicio' })).toHaveAccessibilityState({ selected: true });
  fireEvent.press(screen.getByRole('tab', { name: 'Actividad' }));
  expect(onChange).toHaveBeenCalledWith('activity');
});

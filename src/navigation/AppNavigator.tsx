import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { Screen } from '../types';

type Props = {
  initialScreen: Screen;
  screen: Screen;
  onScreenChange: (screen: Screen) => void;
  children: (screen: Screen, navigate: (next: Screen) => void) => React.ReactNode;
};

/** Small typed navigator for this dependency-free demo, including Android back history. */
export function AppNavigator({ initialScreen, screen, onScreenChange, children }: Props) {
  const [history, setHistory] = useState<Screen[]>([initialScreen]);

  const navigate = useCallback((next: Screen) => {
    setHistory(current => current.at(-1) === next ? current : [...current, next]);
    onScreenChange(next);
  }, [onScreenChange]);

  useEffect(() => {
    if (history.at(-1) !== screen) setHistory(current => [...current, screen]);
  }, [history, screen]);

  useEffect(() => BackHandler.addEventListener('hardwareBackPress', () => {
    if (history.length <= 1) return false;
    const previous = history.at(-2);
    if (!previous) return false;
    setHistory(current => current.slice(0, -1));
    onScreenChange(previous);
    return true;
  }).remove, [history, onScreenChange]);

  return <>{children(screen, navigate)}</>;
}

import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Linking } from 'react-native';
import { Screen } from '../types';
import { screenFromUrl } from './router';

export function useAppNavigation(initialScreen: Screen = 'home') {
  const [screen, setScreen] = useState<Screen>(initialScreen);

  const navigate = useCallback((destination: Screen) => setScreen(destination), []);
  const reset = useCallback(() => setScreen('home'), []);

  useEffect(() => {
    const open = ({ url }: { url: string }) => {
      const destination = screenFromUrl(url);
      if (destination) navigate(destination);
    };
    void Linking.getInitialURL().then(url => url && open({ url }));
    const linkingSubscription = Linking.addEventListener('url', open);
    const backSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'home') return false;
      reset();
      return true;
    });
    return () => {
      linkingSubscription.remove();
      backSubscription.remove();
    };
  }, [navigate, reset, screen]);

  return { screen, navigate, reset };
}

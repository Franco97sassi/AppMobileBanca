import { Screen } from '../types';

const routes: Record<string, Screen> = {
  home: 'home', activity: 'activity', transfer: 'transfer', cards: 'cards', profile: 'profile',
};

export function screenFromUrl(url: string): Screen | undefined {
  const route = url.replace(/^.*?:\/\//, '').split(/[/?#]/)[0]?.toLowerCase();
  return route ? routes[route] : undefined;
}

export function urlForScreen(screen: Screen) {
  return `aurea://${screen}`;
}

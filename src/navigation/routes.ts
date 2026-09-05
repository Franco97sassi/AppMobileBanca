import { Screen } from '../types';

export const screens: readonly Screen[] = ['home', 'activity', 'transfer', 'cards', 'profile'];

export function screenFromUrl(url: string): Screen | undefined {
  try {
    const { hostname, pathname } = new URL(url);
    const candidate = pathname.split('/').filter(Boolean).at(-1) ?? hostname;
    return screens.find(screen => screen === candidate);
  } catch {
    return undefined;
  }
}

export function urlForScreen(screen: Screen) {
  return `aurea://${screen}`;
}

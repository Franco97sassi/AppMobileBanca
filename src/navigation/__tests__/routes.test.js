/* global describe, expect, it */
import { screenFromUrl, urlForScreen } from '../routes';

describe('deep-link routes', () => {
  it.each([
    ['aurea://transfer', 'transfer'],
    ['aurea://activity', 'activity'],
    ['https://aurea.app/open/cards', 'cards'],
  ])('maps %s to %s', (url, screen) => expect(screenFromUrl(url)).toBe(screen));

  it.each(['aurea://unknown', 'not a URL', ''])('safely rejects %s', url => {
    expect(screenFromUrl(url)).toBeUndefined();
  });

  it('creates a canonical application URL', () => {
    expect(urlForScreen('profile')).toBe('aurea://profile');
  });
});

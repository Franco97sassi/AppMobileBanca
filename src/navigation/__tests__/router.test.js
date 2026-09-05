/* global describe, it, expect */
import { screenFromUrl, urlForScreen } from '../router';

describe('deep-link router', () => {
  it.each(['home', 'activity', 'transfer', 'cards', 'profile'])('round-trips %s', screen => {
    expect(screenFromUrl(urlForScreen(screen))).toBe(screen);
  });

  it('supports query strings and rejects unknown routes', () => {
    expect(screenFromUrl('aurea://transfer?beneficiary=ana')).toBe('transfer');
    expect(screenFromUrl('aurea://unknown')).toBeUndefined();
  });
});

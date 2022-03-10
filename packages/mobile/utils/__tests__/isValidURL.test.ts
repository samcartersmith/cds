import { isValidURL } from '../isValidURL';

describe('isValidURL', () => {
  it('returns true on valid URLs', () => {
    expect(isValidURL('http://coinbase.com')).toBe(true);
    expect(isValidURL('https://coinbase.com')).toBe(true);
    expect(isValidURL('coinbase.com')).toBe(true);
    expect(isValidURL('https://coinbase.com/earn/something')).toBe(true);
  });

  it('return false on invalid URLs', () => {
    expect(isValidURL('something')).toBe(false);
    expect(isValidURL('/earn/something')).toBe(false);
    expect(isValidURL('')).toBe(false);
    expect(isValidURL('http://coinbase')).toBe(false);
  });
});

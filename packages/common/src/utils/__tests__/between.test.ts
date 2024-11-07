import { between } from '../between';

describe('between', () => {
  const testValue = 10;

  it('returns true if the value is between the given range', () => {
    expect(between(testValue, 0, 11)).toBe(true);
  });

  it('returns false if the value is not between the given range', () => {
    expect(between(testValue, 1, 5)).toBe(false);
  });

  it('returns true if value is equal to mininum value', () => {
    expect(between(testValue, 10, 11)).toBe(true);
  });

  it('returns true if value is equal to maximum value', () => {
    expect(between(testValue, 9, 10)).toBe(true);
  });
});

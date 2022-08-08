import { add } from '../src';

describe('add()', () => {
  it('adds numbers', () => {
    expect(add(1, 1)).toBe(2);
  });
});

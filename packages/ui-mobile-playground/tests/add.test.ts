import { add } from '../src/add';

describe('add()', () => {
  it('adds numbers', () => {
    expect(add(1, 1)).toBe(2);
  });
});

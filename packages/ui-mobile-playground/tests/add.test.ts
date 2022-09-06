import { add } from '../src/components/add';

describe('add()', () => {
  it('adds numbers', () => {
    expect(add(1, 1)).toBe(2);
  });
});

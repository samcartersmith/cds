import { getOverflowTextStyles, getZIndexFromRow } from '../overflow';

describe('overflow', () => {
  it('getZIndexFromRow', () => {
    expect(getZIndexFromRow(2, 5)).toBe(4);
  });

  it('getOverflowTextStyles', () => {
    expect(getOverflowTextStyles(true)).toBe('overflowStyles');
    expect(getOverflowTextStyles(false)).toBe('truncatedStyles');
  });
});

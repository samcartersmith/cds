import { getResponsiveSpacingStyles } from '../getResponsiveSpacingStyles';

describe('getResponsiveSpacingStyles.ts', () => {
  it('returns spacing class name', () => {
    expect(getResponsiveSpacingStyles('desktop', 'spacing', 2).split(' ')).toHaveLength(1);
    expect(getResponsiveSpacingStyles('desktop', 'offset', 2).split(' ')).toHaveLength(1);
    expect(getResponsiveSpacingStyles('tablet', 'spacingVertical', 3).split(' ')).toHaveLength(2);
    expect(getResponsiveSpacingStyles('tablet', 'spacingHorizontal', 0).split(' ')).toHaveLength(2);
    expect(getResponsiveSpacingStyles('tablet', 'spacingTop', 4).split(' ')).toHaveLength(1);
    expect(getResponsiveSpacingStyles('phone', 'spacingBottom', 4).split(' ')).toHaveLength(1);
    expect(getResponsiveSpacingStyles('tablet', 'spacingStart', 4).split(' ')).toHaveLength(1);
    expect(getResponsiveSpacingStyles('phone', 'spacingEnd', 4).split(' ')).toHaveLength(1);
    expect(getResponsiveSpacingStyles('desktop', 'spacing', 2, true).split(' ')).toHaveLength(1);
  });
});

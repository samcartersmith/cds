import { getContrastRatio } from '../getContrastRatio';

describe('getContrastRatio', () => {
  it('returns a high contrast if white background with blue foreground', () => {
    expect(getContrastRatio('white', 'blue')).toBe(8.592471358428805);
  });

  it('returns a high contrast if blue background with white foreground', () => {
    expect(getContrastRatio('blue', 'white')).toBe(8.592471358428805);
  });

  it('returns a medium contrast if white background with orange40 foreground', () => {
    expect(getContrastRatio('white', '#EC7030')).toBe(3.031649705729726);
  });

  it('returns a low contrast if white background with orange foreground', () => {
    expect(getContrastRatio('white', 'orange')).toBe(1.9747879003183526);
  });

  it('returns 1 if background and foreground are the same color', () => {
    expect(getContrastRatio('yellow', 'yellow')).toBe(1);
  });

  it('returns a low contrast if background is an invalid color', () => {
    expect(getContrastRatio('', 'yellow')).toBe(1);
  });

  it('returns a low contrast if foreground is an invalid color', () => {
    expect(getContrastRatio('yellow', '')).toBe(1);
  });
});

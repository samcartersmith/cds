import { isAccessibleColor } from '../isAccessibleColor';

describe('isAccessibleColor', () => {
  it('passes for graphic but not normal or large text if white background with orange40 foreground', () => {
    expect(isAccessibleColor('white', '#EC7030', 'graphic')).toBe(true);
    expect(isAccessibleColor('white', '#EC7030', 'largeText')).toBe(false);
    expect(isAccessibleColor('white', '#EC7030', 'normalText')).toBe(false);
  });

  it('passes for all usages if white background with blue foreground', () => {
    expect(isAccessibleColor('white', 'blue', 'graphic')).toBe(true);
    expect(isAccessibleColor('white', 'blue', 'largeText')).toBe(true);
    expect(isAccessibleColor('white', 'blue', 'normalText')).toBe(true);
  });

  it('fails for any usages if white background with yellow foreground', () => {
    expect(isAccessibleColor('white', 'yellow', 'graphic')).toBe(false);
    expect(isAccessibleColor('white', 'yellow', 'largeText')).toBe(false);
    expect(isAccessibleColor('white', 'yellow', 'normalText')).toBe(false);
  });

  it('fails for any usages if orange background with yellow foreground', () => {
    expect(isAccessibleColor('orange', 'yellow', 'graphic')).toBe(false);
    expect(isAccessibleColor('orange', 'yellow', 'largeText')).toBe(false);
    expect(isAccessibleColor('orange', 'yellow', 'normalText')).toBe(false);
  });

  it('fails for any usages if blue background with gray foreground', () => {
    expect(isAccessibleColor('blue', 'gray', 'graphic')).toBe(false);
    expect(isAccessibleColor('blue', 'gray', 'largeText')).toBe(false);
    expect(isAccessibleColor('blue', 'gray', 'normalText')).toBe(false);
  });

  it('passes for all usages if blue background with white foreground', () => {
    expect(isAccessibleColor('blue', 'white', 'graphic')).toBe(true);
    expect(isAccessibleColor('blue', 'white', 'largeText')).toBe(true);
    expect(isAccessibleColor('blue', 'white', 'normalText')).toBe(true);
  });
});

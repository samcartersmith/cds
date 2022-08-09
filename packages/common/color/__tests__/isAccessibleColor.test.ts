import { isAccessibleColor } from '../isAccessibleColor';

describe('isAccessibleColor', () => {
  it('passes for graphic but not normal or large text if white background with orange40 foreground if enhanced is set to true', () => {
    expect(
      isAccessibleColor({
        background: 'white',
        foreground: '#EC7030',
        usage: 'graphic',
        enhanced: true,
      }),
    ).toBe(true);
    expect(
      isAccessibleColor({
        background: 'white',
        foreground: '#EC7030',
        usage: 'largeText',
        enhanced: true,
      }),
    ).toBe(false);
    expect(
      isAccessibleColor({
        background: 'white',
        foreground: '#EC7030',
        usage: 'normalText',
        enhanced: true,
      }),
    ).toBe(false);
  });

  it('passes for all usages if white background with blue foreground', () => {
    expect(isAccessibleColor({ background: 'white', foreground: 'blue', usage: 'graphic' })).toBe(
      true,
    );
    expect(isAccessibleColor({ background: 'white', foreground: 'blue', usage: 'largeText' })).toBe(
      true,
    );
    expect(
      isAccessibleColor({ background: 'white', foreground: 'blue', usage: 'normalText' }),
    ).toBe(true);
  });

  it('fails for any usages if white background with yellow foreground', () => {
    expect(isAccessibleColor({ background: 'white', foreground: 'yellow', usage: 'graphic' })).toBe(
      false,
    );
    expect(
      isAccessibleColor({ background: 'white', foreground: 'yellow', usage: 'largeText' }),
    ).toBe(false);
    expect(
      isAccessibleColor({ background: 'white', foreground: 'yellow', usage: 'normalText' }),
    ).toBe(false);
  });

  it('fails for any usages if orange background with yellow foreground', () => {
    expect(
      isAccessibleColor({ background: 'orange', foreground: 'yellow', usage: 'graphic' }),
    ).toBe(false);
    expect(
      isAccessibleColor({ background: 'orange', foreground: 'yellow', usage: 'largeText' }),
    ).toBe(false);
    expect(
      isAccessibleColor({ background: 'orange', foreground: 'yellow', usage: 'normalText' }),
    ).toBe(false);
  });

  it('fails for any usages if blue background with gray foreground', () => {
    expect(isAccessibleColor({ background: 'blue', foreground: 'gray', usage: 'graphic' })).toBe(
      false,
    );
    expect(isAccessibleColor({ background: 'blue', foreground: 'gray', usage: 'largeText' })).toBe(
      false,
    );
    expect(isAccessibleColor({ background: 'blue', foreground: 'gray', usage: 'normalText' })).toBe(
      false,
    );
  });

  it('passes for all usages if blue background with white foreground', () => {
    expect(isAccessibleColor({ background: 'blue', foreground: 'white', usage: 'graphic' })).toBe(
      true,
    );
    expect(isAccessibleColor({ background: 'blue', foreground: 'white', usage: 'largeText' })).toBe(
      true,
    );
    expect(
      isAccessibleColor({ background: 'blue', foreground: 'white', usage: 'normalText' }),
    ).toBe(true);
  });
});

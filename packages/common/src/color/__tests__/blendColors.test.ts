import { blendColors } from '../blendColors';

describe('blendColors', () => {
  it('returns second color if the second color does not have opacity', () => {
    expect(
      blendColors({ underlayColor: 'rgb(255, 255, 255)', overlayColor: 'rgba(33, 98, 238, 1)' }),
    ).toBe('rgb(33, 98, 238)');
    expect(
      blendColors({ underlayColor: 'rgb(33, 98, 238)', overlayColor: 'rgb(255, 255, 255)' }),
    ).toBe('rgb(255, 255, 255)');
    expect(
      blendColors({ underlayColor: 'rgba(33, 98, 238, 0.2)', overlayColor: 'rgb(255, 255, 255)' }),
    ).toBe('rgb(255, 255, 255)');
    expect(blendColors({ underlayColor: 'yellow', overlayColor: 'blue' })).toBe('rgb(0, 0, 255)');
    expect(blendColors({ underlayColor: '#20e75e', overlayColor: '#e56925' })).toBe(
      'rgb(229, 105, 37)',
    );
    expect(
      blendColors({ underlayColor: 'hsl(30, 100%, 50%)', overlayColor: 'hsl(17, 100%, 50%)' }),
    ).toBe('rgb(255, 72, 0)');
  });

  it('returns blended color if the second color has opacity', () => {
    expect(
      blendColors({ underlayColor: 'rgb(255, 255, 255)', overlayColor: 'rgba(33, 98, 238, 0.2)' }),
    ).toBe('rgb(211, 224, 252)');
  });

  it('returns blended color if the second color has opacity and finalOpacity is provided', () => {
    expect(
      blendColors({
        underlayColor: 'rgb(255, 255, 255)',
        overlayColor: 'rgba(33, 98, 238, 0.2)',
        finalOpacity: 0.5,
      }),
    ).toBe('rgba(211, 224, 252, 0.5)');
  });
});

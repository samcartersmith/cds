import { decrementHueStep } from '../decrementHueStep';

describe('decrementHueStep', () => {
  it('correctly decrements a hue step', () => {
    expect(decrementHueStep('blue60')).toBe('blue50');
  });

  it('handles lowest hue step correctly', () => {
    expect(decrementHueStep('red0')).toBe('red0');
  });

  it('handles highest hue step correctly', () => {
    expect(decrementHueStep('orange100')).toBe('orange90');
  });
});

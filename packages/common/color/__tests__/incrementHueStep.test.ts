import { incrementHueStep } from '../incrementHueStep';

describe('incrementHueStep', () => {
  it('correctly increments a hue step', () => {
    expect(incrementHueStep('blue60')).toBe('blue70');
  });

  it('handles lowest hue step correctly', () => {
    expect(incrementHueStep('red0')).toBe('red5');
  });

  it('handles highest hue step correctly', () => {
    expect(incrementHueStep('orange100')).toBe('orange100');
  });
});

import { decrementHueStep } from '../decrementHueStep';

describe('decrementHueStep', () => {
  it('correctly decrements a hue step', () => {
    expect(decrementHueStep('blue60')).toEqual('blue50');
  });

  it('handles lowest hue step correctly', () => {
    expect(decrementHueStep('red0')).toEqual('red0');
  });

  it('handles highest hue step correctly', () => {
    expect(decrementHueStep('orange100')).toEqual('orange90');
  });
});

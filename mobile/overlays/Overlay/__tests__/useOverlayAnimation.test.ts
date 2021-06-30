import { AnyObject } from '@cbhq/cds-utils';
import { renderHook } from '@testing-library/react-hooks';
import { Animated } from 'react-native';

import { useOverlayAnimation } from '../useOverlayAnimation';

jest.useFakeTimers();

jest.mock('react-native/Libraries/Animated/src/AnimatedImplementation', () => ({
  ...jest.requireActual<AnyObject>('react-native/Libraries/Animated/src/AnimatedImplementation'),
  timing: jest.fn((animatedValue: Animated.Value, config: { toValue: number }) => ({
    start: jest.fn(() => {
      return setTimeout(() => {
        animatedValue.setValue(config.toValue);
      }, 1000);
    }),
    stop: jest.fn(),
  })),
}));

function getAnimatedValue(val: Animated.Value) {
  // @ts-expect-error: I know what I'm doing.
  // eslint-disable-next-line no-underscore-dangle
  return val._value;
}

describe('useOverlayAnimation', () => {
  it('returns correct animated value', async () => {
    const { result } = renderHook(() => useOverlayAnimation());
    const [opacity] = result.current;
    expect(getAnimatedValue(opacity)).toEqual(0);
  });

  it('handles animateIn animation', async () => {
    const { result } = renderHook(() => useOverlayAnimation());
    const [opacity, animateIn] = result.current;
    animateIn.start();
    jest.runAllTimers();
    expect(Animated.timing).toHaveBeenCalled();
    expect(getAnimatedValue(opacity)).toEqual(1);
  });

  it('handles animateOut animation', async () => {
    const { result } = renderHook(() => useOverlayAnimation());
    const [opacity, , animateOut] = result.current;
    animateOut.start();
    expect(Animated.timing).toHaveBeenCalled();
    expect(getAnimatedValue(opacity)).toEqual(0);
  });
});

import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { useChartContext } from './ChartProvider';

const CHART_ANIMATED_PATH_DURATION = 450;

function easeOutQuint(x: number): number {
  return 1 - (1 - x) ** 5;
}

const animationConfig = {
  toValue: 1,
  easing: easeOutQuint,
  useNativeDriver: true,
  duration: CHART_ANIMATED_PATH_DURATION,
};

type Params = {
  animationListener: Animated.ValueListenerCallback;
  onInterrupt: () => void;
};

export const useInterruptiblePathAnimation = ({ animationListener, onInterrupt }: Params) => {
  const { animateMinMaxIn } = useChartContext();
  const isRunning = useRef(false);
  const animationProgress = useRef(new Animated.Value(0)).current;

  const animation = Animated.sequence([
    Animated.timing(animationProgress, animationConfig),
    animateMinMaxIn,
  ]);

  const onFinishAnimation = useCallback(
    ({ finished }: { finished: boolean }) => {
      if (finished) {
        animationProgress.removeAllListeners();
        animationProgress.setValue(0);
        isRunning.current = false;
      }
    },
    [animationProgress],
  );

  // Clean up listeners
  useEffect(() => {
    return () => {
      animationProgress.removeAllListeners();
    };
  }, [animationProgress]);

  return useCallback(() => {
    // If try to re-run animation while currently running
    // we should interrupt it and start new one
    if (isRunning.current) {
      animation.stop();
      onFinishAnimation({ finished: true });
      onInterrupt();
    } else {
      isRunning.current = true;
      animationProgress.addListener(animationListener);
      animation.start(onFinishAnimation);
    }
  }, [animation, animationListener, animationProgress, onFinishAnimation, onInterrupt]);
};

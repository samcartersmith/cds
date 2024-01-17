import { useMemo, useRef, useState } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export function useScrollOffset() {
  const xOffset = useRef(new Animated.Value(0));
  const yOffset = useRef(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const index = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(index);
  };

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: xOffset.current,
            y: yOffset.current,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
      listener: handleScroll,
    },
  );

  return useMemo(() => {
    return {
      onScroll,
      xOffset: xOffset.current,
      yOffset: yOffset.current,
      currentIndex,
    };
  }, [onScroll, currentIndex]);
}

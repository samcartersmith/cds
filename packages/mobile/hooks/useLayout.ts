import { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

export type OnLayout = (event: LayoutChangeEvent) => void;

// TODO: remove from RN design system once this landed
export const useLayout = (): [LayoutRectangle, OnLayout] => {
  const [size, setSize] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setSize(event.nativeEvent.layout);
  }, []);

  return useMemo(() => [size, onLayout], [onLayout, size]);
};

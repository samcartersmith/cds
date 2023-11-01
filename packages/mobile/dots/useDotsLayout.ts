import { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

import { OnLayout } from '../hooks/useLayout';

export const useDotsLayout = (): [LayoutRectangle | null, OnLayout] => {
  const [size, setSize] = useState<LayoutRectangle | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setSize(event.nativeEvent.layout);
  }, []);

  return useMemo(() => [size, onLayout], [onLayout, size]);
};

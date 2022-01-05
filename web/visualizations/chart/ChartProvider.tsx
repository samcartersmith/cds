import React, {
  createContext,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from '@cbhq/cds-utils';

type ChartProviderProps = {
  children: React.ReactNode;
  compact?: boolean;
};

type ChartContextInterface = {
  isFallbackVisible: boolean;
  compact: boolean;
  width: number;
  height: number;
  showFallback: () => void;
  hideFallback: () => void;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
};

const ChartContext = createContext<ChartContextInterface>({
  isFallbackVisible: true,
  compact: false,
  width: 0,
  height: 0,
  showFallback: noop,
  hideFallback: noop,
  setWidth: noop,
  setHeight: noop,
});

export const ChartProvider = memo(({ children, compact = false }: ChartProviderProps) => {
  const [isFallbackVisible, setIsFallbackVisible] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const showFallback = useCallback(() => {
    setIsFallbackVisible(true);
  }, [setIsFallbackVisible]);

  const hideFallback = useCallback(() => {
    setIsFallbackVisible(false);
  }, [setIsFallbackVisible]);

  const value = useMemo(
    () => ({
      compact,
      width,
      height,
      showFallback,
      hideFallback,
      isFallbackVisible,
      setHeight,
      setWidth,
    }),
    [compact, height, hideFallback, isFallbackVisible, showFallback, width],
  );

  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>;
});

export function useChartContext() {
  return useContext(ChartContext);
}

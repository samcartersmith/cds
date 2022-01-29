import React, {
  createContext,
  Dispatch,
  memo,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from '@cbhq/cds-utils';

type ChartScrubContextInterface = {
  setLineDOMNode: Dispatch<SetStateAction<HTMLDivElement | null>>; // update the dom directly for performance
  setMaskDOMNode: Dispatch<SetStateAction<HTMLDivElement | null>>; // update the dom directly for performance
  setHoverDateDOMNode: Dispatch<SetStateAction<HTMLSpanElement | null>>; // update the dom directly for performance
  lineDOMNode: HTMLDivElement | null;
  maskDOMNode: HTMLDivElement | null;
  hoverDateDOMNode: HTMLSpanElement | null;
};

const ChartScrubContext = createContext<ChartScrubContextInterface>({
  setLineDOMNode: noop,
  setMaskDOMNode: noop,
  setHoverDateDOMNode: noop,
  lineDOMNode: null,
  maskDOMNode: null,
  hoverDateDOMNode: null,
});

export const ChartScrubProvider = memo(({ children }: { children: React.ReactNode }) => {
  const [lineDOMNode, setLineDOMNode] = useState<HTMLDivElement | null>(null);
  const [maskDOMNode, setMaskDOMNode] = useState<HTMLDivElement | null>(null);
  const [hoverDateDOMNode, setHoverDateDOMNode] = useState<HTMLSpanElement | null>(null);

  const value = useMemo(
    () => ({
      setLineDOMNode,
      setMaskDOMNode,
      lineDOMNode,
      maskDOMNode,
      hoverDateDOMNode,
      setHoverDateDOMNode,
    }),
    [hoverDateDOMNode, lineDOMNode, maskDOMNode],
  );

  return <ChartScrubContext.Provider value={value}>{children}</ChartScrubContext.Provider>;
});

export function useChartScrubContext() {
  return useContext(ChartScrubContext);
}

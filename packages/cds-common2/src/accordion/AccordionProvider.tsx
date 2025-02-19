import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { isDevelopment } from '@cbhq/cds-utils/env';

import { AccordionBaseProps } from '../types';

export type AccordionContextValue = {
  activeKey: string | null;
  setActiveKey: (activeKey: string | null) => void;
};

export const AccordionContext = createContext<AccordionContextValue>({
  activeKey: null,
  setActiveKey: () => {},
});

export const useAccordionContext = () => {
  return useContext(AccordionContext);
};

export const AccordionProvider = ({
  activeKey,
  children,
  defaultActiveKey,
  setActiveKey,
  onChange,
}: AccordionBaseProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState<AccordionContextValue['activeKey']>(
    defaultActiveKey ?? null,
  );

  if (
    isDevelopment() &&
    ((typeof activeKey !== 'undefined' && typeof setActiveKey === 'undefined') ||
      (typeof activeKey === 'undefined' && typeof setActiveKey !== 'undefined'))
  ) {
    throw Error('A controlled Accordion must have both activeKey and setActiveKey props');
  }

  const [currentActiveKey = null, setActiveKeyFn] = setActiveKey
    ? [activeKey, setActiveKey]
    : [internalActiveKey, setInternalActiveKey];

  const handleChangeActiveKey: React.Dispatch<
    React.SetStateAction<AccordionContextValue['activeKey']>
  > = useCallback(
    (nextActiveKey) => {
      const newActiveKey =
        typeof nextActiveKey === 'function' ? nextActiveKey(currentActiveKey) : nextActiveKey;
      if (newActiveKey === currentActiveKey) return;
      onChange?.(newActiveKey);
      setActiveKeyFn(newActiveKey);
    },
    [onChange, currentActiveKey, setActiveKeyFn],
  );

  const api = useMemo(
    () => ({
      activeKey: currentActiveKey,
      setActiveKey: handleChangeActiveKey,
    }),
    [currentActiveKey, handleChangeActiveKey],
  );

  return <AccordionContext.Provider value={api}>{children}</AccordionContext.Provider>;
};

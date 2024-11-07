import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { AccordionBaseProps } from '../types';

export const AccordionParentContext = createContext<{
  activeKey: AccordionBaseProps['defaultActiveKey'];
  onChange: (key: string) => void;
}>({
  activeKey: undefined,
  onChange: () => {},
});

export const useAccordionParent = () => {
  return useContext(AccordionParentContext);
};

export const AccordionParentProvider = ({
  children,
  defaultActiveKey,
  onChange,
}: AccordionBaseProps) => {
  const [activeKey, setActiveKey] =
    useState<AccordionBaseProps['defaultActiveKey']>(defaultActiveKey);

  const handleItemPress = useCallback(
    (key: string) => {
      onChange?.(key);
      // close itself if it's expanded
      setActiveKey(key === activeKey ? undefined : key);
    },
    [onChange, activeKey],
  );

  const contextValue = useMemo(
    () => ({
      activeKey,
      onChange: handleItemPress,
    }),
    [activeKey, handleItemPress],
  );

  return (
    <AccordionParentContext.Provider value={contextValue}>
      {children}
    </AccordionParentContext.Provider>
  );
};

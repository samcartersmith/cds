import React, { createContext, useCallback, useContext, useMemo,useState } from 'react';

import { AccordionBaseProps } from '../types';

export const AccordionParentContext = createContext<{
  activeKey: AccordionBaseProps['defaultActiveKey'];
  onItemPress: (key: string) => void;
}>({
  activeKey: undefined,
  onItemPress: () => {},
});

export const useAccordionParent = () => {
  const context = useContext(AccordionParentContext);
  if (context === undefined) {
    // eslint-disable-next-line no-console
    console.error('useAccordionParent must be used within a AccordionParentProvider');
  }
  return context;
};

export const AccordionParentProvider = ({
  children,
  defaultActiveKey,
  onItemPress,
}: AccordionBaseProps) => {
  const [activeKey, setActiveKey] =
    useState<AccordionBaseProps['defaultActiveKey']>(defaultActiveKey);

  const handleItemPress = useCallback(
    (key: string) => {
      onItemPress?.(key);
      // close itself if it's expanded
      setActiveKey(key === activeKey ? undefined : key);
    },
    [onItemPress, activeKey],
  );

  const contextValue = useMemo(
    () => ({
      activeKey,
      onItemPress: handleItemPress,
    }),
    [activeKey, handleItemPress],
  );

  return (
    <AccordionParentContext.Provider value={contextValue}>
      {children}
    </AccordionParentContext.Provider>
  );
};

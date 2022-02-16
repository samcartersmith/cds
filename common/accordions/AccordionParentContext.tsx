import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AccordionBaseProps } from '../types';

export const AccordionParentContext = createContext<{
  defaultActiveKey: AccordionBaseProps['defaultActiveKey'];
  activeKey: AccordionBaseProps['defaultActiveKey'];
  onItemPress: (key: string) => void;
}>({
  defaultActiveKey: undefined,
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
      defaultActiveKey,
      activeKey,
      onItemPress: handleItemPress,
    }),
    [defaultActiveKey, activeKey, handleItemPress],
  );

  return (
    <AccordionParentContext.Provider value={contextValue}>
      {children}
    </AccordionParentContext.Provider>
  );
};

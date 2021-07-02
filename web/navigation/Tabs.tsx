import React, { memo, useEffect, useMemo, Children, cloneElement } from 'react';

import { useIndexCounter } from '@cbhq/cds-common/hooks/useIndexCounter';
import { SetState } from '@cbhq/cds-common/types';

import { TabItemBaseProps, TabItemProps } from './TabItem';
import { HStack } from '../layout';

export type TabsProps = {
  activeIndex?: number;
  setActiveIndex?: SetState<number>;
  onChange?: (params: TabItemBaseProps) => void;
  children: React.ReactElement<TabItemProps>[];
};

export const Tabs = memo(({ activeIndex = 0, setActiveIndex, onChange, children }: TabsProps) => {
  const { activeIndex: currentIndex, setActiveIndex: setCurrentIndex } = useIndexCounter({
    length: Children.count(children),
  });

  const updateHandler = setActiveIndex ?? setCurrentIndex;

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex, setCurrentIndex]);

  const tabChildren = useMemo(
    () =>
      Children.map(children, (child, idx) => {
        return cloneElement(child, {
          active: idx === currentIndex,
          onPress: (evt: React.MouseEvent<HTMLButtonElement>) => {
            updateHandler(idx);
            onChange?.({ label: child.props.label, value: child.props?.value });
            child.props?.onPress?.(evt);
          },
        });
      }),
    [currentIndex, children, onChange, updateHandler]
  );

  return (
    <HStack role="tablist" gap={0.5}>
      {tabChildren}
    </HStack>
  );
});

Tabs.displayName = 'Tabs';

import React, { memo, useEffect, useMemo, Children, cloneElement } from 'react';

import { useIndexCounter } from '@cbhq/cds-common/hooks/useIndexCounter';
import { SetState } from '@cbhq/cds-common/types';

import { TabItemBaseProps, TabItemProps } from './TabItem';

export type TabsProps = {
  activeIndex?: number;
  setActiveIndex?: SetState<number>;
  onChange?: (params: TabItemBaseProps) => void;
  children: React.ReactElement<TabItemProps>[];
};

export const Tabs = memo(({ activeIndex = 0, setActiveIndex, onChange, children }: TabsProps) => {
  const { activeIndex: _activeIndex, setActiveIndex: _setActiveIndex } = useIndexCounter({
    length: Children.count(children),
  });

  const updateHandler = setActiveIndex ?? _setActiveIndex;

  useEffect(() => {
    _setActiveIndex(activeIndex);
  }, [activeIndex, _setActiveIndex]);

  const tabChildren = useMemo(
    () =>
      Children.map(children, (child, idx) => {
        return cloneElement(child, {
          active: idx === _activeIndex,
          onPress: (evt: React.MouseEvent<HTMLButtonElement>) => {
            updateHandler(idx);
            onChange?.({ label: child.props.label, value: child.props?.value });
            child.props?.onPress?.(evt);
          },
        });
      }),
    [_activeIndex, children, onChange, updateHandler]
  );

  return <div role="tablist">{tabChildren}</div>;
});

Tabs.displayName = 'Tabs';

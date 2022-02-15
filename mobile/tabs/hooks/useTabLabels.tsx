import React, { useEffect, useCallback, useState, useMemo, createElement } from 'react';
import { TabIndicatorProps, TabNavigationProps } from '@cbhq/cds-common';
import { View, LayoutChangeEvent } from 'react-native';
import { TabLabel } from '../TabLabel';
import { PressableOpacity } from '../../system/PressableOpacity';

type LayoutMap = Record<string, { width: number; xPosition: number }>;
type UseTabLabelsProps = Required<
  Pick<TabNavigationProps, 'tabs' | 'defaultTab' | 'variant' | 'onChange'>
>;

/** This hook provides decorated TabLabels and animated props for a TabIndicator - and handles onChange events */
export const useTabLabels = ({ tabs, defaultTab = '', variant, onChange }: UseTabLabelsProps) => {
  // Keep track of the active item
  const [activeId, setActiveId] = useState(defaultTab);
  useEffect(() => {
    if (!defaultTab) setActiveId(tabs[0].id);
  }, [tabs, defaultTab]);

  // Broadcast the change event
  useEffect(() => {
    onChange?.(activeId);
  }, [activeId, onChange]);

  // When each item renders, calculate it's coords and save them
  const [layoutMap, updateLayoutMap] = useState<LayoutMap>({});
  const handleLayout = useCallback(
    (key: string, { nativeEvent }: LayoutChangeEvent) => {
      updateLayoutMap({
        ...layoutMap,
        [key]: {
          width: nativeEvent.layout.width,
          xPosition: nativeEvent.layout.x,
        },
      });
    },
    [layoutMap],
  );

  // State for the TabIndicator props
  const [tabIndicatorProps, setTabIndicatorProps] = useState<TabIndicatorProps>({
    width: layoutMap[activeId]?.width ?? 0,
    xPosition: layoutMap[activeId]?.xPosition ?? 0,
  });
  useEffect(() => {
    setTabIndicatorProps({
      width: layoutMap[activeId]?.width,
      xPosition: layoutMap[activeId]?.xPosition,
    });
  }, [activeId, layoutMap]);

  // Iterate over the tabs and create Pressable TabLabels
  const tabLabels = useMemo(
    () =>
      tabs.filter(Boolean).map(({ id, onPress, label, accessibilityLabel = label }, idx) => {
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        const handleTabPress = () => {
          setActiveId(id); // Track state
          onPress?.(id); // handle callback
        };

        const onLayout = (props: LayoutChangeEvent) => handleLayout(id, props);
        const children = (
          <PressableOpacity
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityLabel}
            onPress={handleTabPress}
          >
            <TabLabel active={activeId ? activeId === id : idx === 0} variant={variant}>
              {label}
            </TabLabel>
          </PressableOpacity>
        );

        return createElement(View, { key: id, onLayout }, children);
      }),
    [tabs, variant, activeId, handleLayout, setActiveId],
  );

  return useMemo(() => ({ tabLabels, tabIndicatorProps }), [tabLabels, tabIndicatorProps]);
};

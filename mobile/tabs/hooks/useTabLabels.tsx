import React, { useEffect, useCallback, useState, useMemo, createElement } from 'react';
import { TabIndicatorProps, TabNavigationProps } from '@cbhq/cds-common';
import { View, LayoutChangeEvent } from 'react-native';
import { TabLabel } from '../TabLabel';
import { PressableOpacity } from '../../system/PressableOpacity';

type LayoutMap = Record<string, { width: number; x: number }>;
type UseTabLabelsProps = Required<Pick<TabNavigationProps, 'tabs' | 'variant' | 'onChange'>> &
  Pick<TabNavigationProps, 'value'>;

/** This hook provides decorated TabLabels and animated props for a TabIndicator - and handles onChange events */
export const useTabLabels = ({
  tabs,
  value = tabs[0].id,
  variant,
  onChange,
}: UseTabLabelsProps) => {
  // When each item renders, calculate it's coords and save them
  const [layoutMap, updateLayoutMap] = useState<LayoutMap>({});
  const handleLayout = useCallback(
    (key: string, { nativeEvent }: LayoutChangeEvent) => {
      updateLayoutMap({
        ...layoutMap,
        [key]: {
          width: nativeEvent.layout.width,
          x: nativeEvent.layout.x,
        },
      });
    },
    [layoutMap],
  );

  // State for the TabIndicator props
  const [tabIndicatorProps, setTabIndicatorProps] = useState<TabIndicatorProps>({
    width: layoutMap[value]?.width ?? 0,
    x: layoutMap[value]?.x ?? 0,
  });
  useEffect(() => {
    setTabIndicatorProps({
      width: layoutMap[value]?.width,
      x: layoutMap[value]?.x,
    });
  }, [value, layoutMap]);

  // Iterate over the tabs and create Pressable TabLabels
  const tabLabels = useMemo(
    () =>
      tabs.filter(Boolean).map(({ id, onPress, label, accessibilityLabel = label }) => {
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        const handleTabPress = () => {
          onChange?.(id);
          onPress?.(id); // handle callback
        };

        const onLayout = (props: LayoutChangeEvent) => handleLayout(id, props);
        const children = (
          <PressableOpacity
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityLabel}
            onPress={handleTabPress}
          >
            <TabLabel active={value === id} variant={variant}>
              {label}
            </TabLabel>
          </PressableOpacity>
        );

        return createElement(View, { key: id, onLayout }, children);
      }),
    [tabs, value, variant, onChange, handleLayout],
  );

  return useMemo(() => ({ tabLabels, tabIndicatorProps }), [tabLabels, tabIndicatorProps]);
};

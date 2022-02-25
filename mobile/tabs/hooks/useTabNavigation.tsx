import React, { useRef, useEffect, useCallback, useState, useMemo, createElement } from 'react';
import { TabIndicatorProps, TabNavigationProps } from '@cbhq/cds-common';
import { View, LayoutChangeEvent, ScrollView } from 'react-native';
import { TabLabel } from '../TabLabel';
import { PressableOpacity } from '../../system/PressableOpacity';

type LayoutMap = Record<string, { width: number; x: number }>;
type UseTabNavigationProps = Required<Pick<TabNavigationProps, 'tabs' | 'variant' | 'onChange'>> &
  Pick<TabNavigationProps, 'value'>;

/** This hook provides decorated TabLabels and animated props for a TabIndicator - and handles onChange events */
export const useTabNavigation = ({
  tabs,
  value = tabs[0].id,
  variant,
  onChange,
}: UseTabNavigationProps) => {
  // When each item renders, calculate it's coords and save them
  const [layoutMap, updateLayoutMap] = useState<LayoutMap>({});
  const scrollRef = useRef<ScrollView>(null);

  const handleLayout = useCallback(
    (key: string, { nativeEvent: { layout } }: LayoutChangeEvent) => {
      const widthDidUpdate = layoutMap?.[key]?.width !== layout?.width;
      const xDidUpdate = layoutMap?.[key]?.x !== layout?.x;

      if (widthDidUpdate || xDidUpdate) {
        updateLayoutMap({
          ...layoutMap,
          [key]: {
            width: layout.width,
            x: layout.x,
          },
        });
      }
    },
    [layoutMap],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: layoutMap[value]?.x, animated: true });
  }, [value, layoutMap]);

  const tabIndicatorProps: TabIndicatorProps = useMemo(() => {
    // Bail early
    if (!layoutMap?.[value]) return { width: 0, x: 0 };

    return { width: layoutMap[value]?.width, x: layoutMap[value]?.x };
  }, [value, layoutMap]);

  // Iterate over the tabs and create Pressable TabLabels
  const tabLabels = useMemo(
    () =>
      tabs.filter(Boolean).map(({ id, onPress, label, accessibilityLabel = label, count }) => {
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
            <TabLabel active={value === id} variant={variant} count={count}>
              {label}
            </TabLabel>
          </PressableOpacity>
        );

        return createElement(View, { key: id, onLayout }, children);
      }),
    [tabs, value, variant, onChange, handleLayout],
  );

  return useMemo(
    () => ({ tabLabels, tabIndicatorProps, scrollRef }),
    [tabLabels, tabIndicatorProps, scrollRef],
  );
};

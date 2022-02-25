import React, {
  useCallback,
  useState,
  useMemo,
  createElement,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { TabIndicatorProps, TabNavigationProps } from '@cbhq/cds-common';
import { css } from 'linaria';
import { LayoutChangeEvent, TabLabel } from '../TabLabel';
import { PressableOpacity, PressableOpacityProps } from '../../system/PressableOpacity';

const PressableOpacityWithoutChildren = PressableOpacity as ForwardRefExoticComponent<
  Omit<PressableOpacityProps, 'children'> & RefAttributes<HTMLElement>
>;

const initialCoords = { width: 0, x: 0 } as const;
const pressableClass = css`
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

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
  const [layoutMap, updateLayoutMap] = useState<LayoutMap>({});
  const [offset, setOffset] = useState<number>(0);

  const handleLayout = useCallback(
    (key: string, layout: LayoutChangeEvent) => {
      // Track offset
      if (key === tabs[0].id) setOffset(layout?.left ?? 0);
      const widthDidUpdate = layoutMap?.[key]?.width !== layout?.width;
      const xDidUpdate = layoutMap?.[key]?.x !== layout?.x;

      if (widthDidUpdate || xDidUpdate) {
        updateLayoutMap({
          ...layoutMap,
          [key]: {
            width: layout?.width ?? 0,
            x: layout?.x ?? 0,
          },
        });
      }
    },
    [layoutMap, tabs],
  );

  const tabIndicatorProps: TabIndicatorProps = useMemo(() => {
    // Bail early
    if (!layoutMap?.[value] ?? !tabs) return { width: 100, x: 0 };

    // Calculate offset using the first item in the list
    const { width, x } = layoutMap?.[value] ?? initialCoords;
    return { width, x: x - offset };
  }, [layoutMap, value, tabs, offset]);

  // Iterate over the tabs and create Pressable TabLabels
  const tabLabels = useMemo(
    () =>
      tabs?.filter(Boolean)?.map(({ id, onPress, label, accessibilityLabel = label, count }) => {
        const handleTabPress = () => {
          onChange(id);
          onPress?.(id); // handle callback
        };

        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        const onLayout = (props: LayoutChangeEvent) => handleLayout(id, props);
        const children = (
          <TabLabel onLayout={onLayout} active={value === id} variant={variant} count={count}>
            {label}
          </TabLabel>
        );

        return createElement(
          PressableOpacityWithoutChildren,
          {
            key: `${id}--button`,
            role: 'tab',
            accessibilityLabel,
            accessibilityHint: accessibilityLabel,
            onPress: handleTabPress,
            className: pressableClass,
          },
          children,
        );
      }),
    [handleLayout, onChange, tabs, value, variant],
  );

  return useMemo(() => ({ tabLabels, tabIndicatorProps }), [tabLabels, tabIndicatorProps]);
};

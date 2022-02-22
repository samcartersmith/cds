import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  createElement,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { TabIndicatorProps, TabNavigationProps } from '@cbhq/cds-common';
import { css } from 'linaria';
import { TabLabel } from '../TabLabel';
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

type UseTabLabelsProps = Required<Pick<TabNavigationProps, 'tabs' | 'variant' | 'onChange'>> &
  Pick<TabNavigationProps, 'value'>;

/** This hook provides decorated TabLabels and animated props for a TabIndicator - and handles onChange events */
export const useTabLabels = ({
  tabs,
  value = tabs[0].id,
  variant,
  onChange,
}: UseTabLabelsProps) => {
  const layoutRefs = useRef<Record<string, DOMRect | undefined>>({});
  const offsetRef = useRef<number>(0);

  // State for the TabIndicator props
  const [tabIndicatorProps, setTabIndicatorProps] = useState<TabIndicatorProps>(initialCoords);
  useEffect(() => {
    // Calculate offset using the first item in the list
    const { width, x } = layoutRefs?.current?.[value] ?? initialCoords;
    setTabIndicatorProps({ width, x: x - offsetRef?.current });
  }, [value]);

  // Iterate over the tabs and create Pressable TabLabels
  const tabLabels = useMemo(
    () =>
      tabs?.filter(Boolean)?.map(({ id, onPress, label, accessibilityLabel = label }, idx) => {
        const handleTabPress = () => {
          onChange(id);
          onPress?.(id); // handle callback
        };

        const children = (
          <TabLabel active={value === id} variant={variant}>
            {label}
          </TabLabel>
        );

        return createElement(
          PressableOpacityWithoutChildren,
          {
            key: `${id}--button`,
            ref: (el) => {
              // Track offset
              if (idx === 0) offsetRef.current = el?.getBoundingClientRect().left ?? 0;

              // Update refs
              layoutRefs.current[id] = el?.getBoundingClientRect();
              return el;
            },
            role: 'tab',
            accessibilityLabel,
            accessibilityHint: accessibilityLabel,
            onPress: handleTabPress,
            className: pressableClass,
          },
          children,
        );
      }),
    [onChange, tabs, value, variant],
  );

  return useMemo(() => ({ tabLabels, tabIndicatorProps }), [tabLabels, tabIndicatorProps]);
};

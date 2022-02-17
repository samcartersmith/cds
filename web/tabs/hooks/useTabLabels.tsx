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

type UseTabLabelsProps = Required<
  Pick<TabNavigationProps, 'tabs' | 'defaultTab' | 'variant' | 'onChange'>
>;

/** This hook provides decorated TabLabels and animated props for a TabIndicator - and handles onChange events */
export const useTabLabels = ({ tabs, defaultTab = '', variant, onChange }: UseTabLabelsProps) => {
  const layoutRefs = useRef<Record<string, DOMRect | undefined>>({});
  const offsetRef = useRef<number>(0);

  // Keep track of the active item
  const [activeId, setActiveId] = useState<string>(defaultTab);
  useEffect(() => {
    if (!defaultTab) setActiveId(tabs[0].id);
  }, [tabs, defaultTab]);

  // Broadcast the change event
  useEffect(() => {
    onChange?.(activeId);
  }, [activeId, onChange]);

  // State for the TabIndicator props
  const [tabIndicatorProps, setTabIndicatorProps] = useState<TabIndicatorProps>(initialCoords);
  useEffect(() => {
    // Calculate offset using the first item in the list
    const { width, x } = layoutRefs?.current?.[activeId] ?? initialCoords;
    setTabIndicatorProps({ width, x: x - offsetRef?.current });
  }, [activeId]);

  // Iterate over the tabs and create Pressable TabLabels
  const tabLabels = useMemo(
    () =>
      tabs?.filter(Boolean)?.map(({ id, onPress, label, accessibilityLabel = label }, idx) => {
        const handleTabPress = () => {
          setActiveId(id); // Track state
          onPress?.(id); // handle callback
        };

        const children = (
          <TabLabel active={activeId ? activeId === id : idx === 0} variant={variant}>
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
    [tabs, activeId, variant],
  );

  return useMemo(() => ({ tabLabels, tabIndicatorProps }), [tabLabels, tabIndicatorProps]);
};

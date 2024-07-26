import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import useMeasure from 'react-use-measure';
import { type Transition, m as motion } from 'framer-motion';
import { useMergeRefs } from '@cbhq/cds-common/hooks/useMergeRefs';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import { TabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { type TabsOptions, type TabValue, useTabs } from '@cbhq/cds-common/tabs/useTabs';
import { accessibleOpacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import type { PaletteBackground } from '@cbhq/cds-common/types';
import { type Rect, defaultRect } from '@cbhq/cds-common/types/Rect';

import { type HStackProps, Box, BoxElement, HStack } from '../layout';

const MotionBox = motion(Box);

type TabContainerProps = {
  id: string;
  registerRef: (tabId: string, ref: HTMLElement) => void;
  children?: React.ReactNode;
};

const TabContainer = ({ id, registerRef, ...props }: TabContainerProps) => {
  const refCallback = useCallback(
    (ref: HTMLElement | null) => ref && registerRef(id, ref),
    [id, registerRef],
  );
  return <div ref={refCallback} {...props} />;
};

export const tabsTransitionConfig = {
  type: 'spring',
  mass: 0.15,
  stiffness: 170,
  damping: 10,
  velocity: 5,
} as const satisfies Transition;

export type TabsActiveIndicatorProps = {
  activeTabRect: Rect;
} & React.ComponentProps<typeof MotionBox>;

export const TabsActiveIndicator = ({
  activeTabRect,
  position = 'absolute',
  ...props
}: TabsActiveIndicatorProps) => {
  const { width, height, x } = activeTabRect;
  const activeAnimation = useMemo(() => ({ width, x }), [width, x]);
  if (!width) return null;
  return (
    <MotionBox
      animate={activeAnimation}
      height={height}
      initial={false}
      position={position}
      role="none"
      testID="tabs-active-indicator"
      transition={tabsTransitionConfig}
      {...props}
    />
  );
};

export type TabComponent = (props: TabValue) => React.ReactElement | null;

export type TabsActiveIndicatorComponent = (
  props: TabsActiveIndicatorProps,
) => React.ReactElement | null;

export type TabsProps = {
  /** The array of tabs data. Each tab may optionally define a custom Component to render. */
  tabs: (TabValue & { Component?: TabComponent })[];
  /** The default Component to render each tab. */
  TabComponent: TabComponent;
  /** The default Component to render the tabs active indicator. */
  TabsActiveIndicatorComponent: TabsActiveIndicatorComponent;
  /** Background color passed to the TabsActiveIndicatorComponent. */
  activeBackground?: PaletteBackground;
} & Omit<TabsOptions, 'tabs'> &
  Omit<HStackProps<BoxElement>, 'onChange'>;

export const Tabs = memo(
  forwardRef(
    (
      {
        tabs,
        TabComponent,
        TabsActiveIndicatorComponent,
        activeBackground,
        activeTab,
        disabled,
        onChange,
        role = 'group',
        position = 'relative',
        width = 'fit-content',
        opacity,
        ...props
      }: TabsProps,
      ref: React.ForwardedRef<HTMLElement>,
    ) => {
      const refMap = useRefMap<HTMLElement>();
      const api = useTabs({ tabs, activeTab, disabled, onChange });
      const activeTabRef = activeTab ? refMap.getRef(activeTab.id) : null;

      const [tabsContainerRef, tabsContainerRect] = useMeasure({ debounce: 20 });
      const mergedContainerRefs = useMergeRefs(ref, tabsContainerRef);

      const activeTabRect: Rect = useMemo(() => {
        if (!activeTabRef || !tabsContainerRect.width) return defaultRect;
        const { x, y, width, height } = activeTabRef.getBoundingClientRect();
        return {
          x: x - (tabsContainerRect?.x || 0),
          y: y - (tabsContainerRect?.y || 0),
          width,
          height,
        };
      }, [activeTabRef, tabsContainerRect]);

      const tabComponents = useMemo(
        () =>
          tabs.map(({ id, Component: CustomTabComponent, disabled: tabDisabled, ...props }) => {
            const RenderedTab = CustomTabComponent ?? TabComponent;
            return (
              <TabContainer key={id} id={id} registerRef={refMap.registerRef}>
                <RenderedTab disabled={tabDisabled} id={id} {...props} />
              </TabContainer>
            );
          }),
        [tabs, TabComponent, refMap.registerRef],
      );

      return (
        <HStack
          ref={mergedContainerRefs}
          opacity={opacity ?? disabled ? accessibleOpacityDisabled : 1}
          position={position}
          role={role}
          width={width}
          {...props}
        >
          <TabsContext.Provider value={api}>
            <TabsActiveIndicatorComponent
              activeTabRect={activeTabRect}
              background={activeBackground}
            />
            {tabComponents}
          </TabsContext.Provider>
        </HStack>
      );
    },
  ),
);

import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
} from 'react-native-reanimated';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import { TabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { type TabsOptions, type TabValue, useTabs } from '@cbhq/cds-common/tabs/useTabs';
import { accessibleOpacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import type { PaletteBackground } from '@cbhq/cds-common/types';
import { defaultRect, type Rect } from '@cbhq/cds-common/types/Rect';

import type { BoxProps, HStackProps } from '../layout';
import { Box, HStack } from '../layout';

const AnimatedBox = Animated.createAnimatedComponent(Box);

type TabContainerProps = {
  id: string;
  registerRef: (tabId: string, ref: View) => void;
  children?: React.ReactNode;
};

const TabContainer = ({ id, registerRef, ...props }: TabContainerProps) => {
  const refCallback = useCallback(
    (ref: View | null) => ref && registerRef(id, ref),
    [id, registerRef],
  );
  return <View ref={refCallback} {...props} />;
};

export const tabsSpringConfig = {
  mass: 0.15,
  stiffness: 160,
  damping: 10,
  overshootClamping: true,
} as const satisfies WithSpringConfig;

export type TabsActiveIndicatorProps = {
  activeTabRect: Rect;
} & BoxProps;

export const TabsActiveIndicator = ({
  activeTabRect,
  position = 'absolute',
  ...props
}: TabsActiveIndicatorProps) => {
  const previousActiveTabRect = useRef(activeTabRect);
  const newActiveTabRect = { x: activeTabRect.x, width: activeTabRect.width };
  const animatedTabRect = useSharedValue(newActiveTabRect);
  const isFirstRenderWithWidth =
    previousActiveTabRect.current.width === 0 && activeTabRect.width > 0;

  if (previousActiveTabRect.current !== activeTabRect) {
    previousActiveTabRect.current = activeTabRect;
    animatedTabRect.value = isFirstRenderWithWidth
      ? newActiveTabRect
      : withSpring(newActiveTabRect, tabsSpringConfig);
  }

  const animatedBoxStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: animatedTabRect.value.x }],
      width: animatedTabRect.value.width,
    }),
    [animatedTabRect],
  );

  return (
    <AnimatedBox
      animated
      height={activeTabRect.height}
      position={position}
      role="none"
      style={animatedBoxStyle}
      testID="tabs-active-indicator"
      {...props}
    />
  );
};

export type TabComponent = React.FC<TabValue>;

export type TabsActiveIndicatorComponent = React.FC<TabsActiveIndicatorProps>;

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
  Omit<HStackProps, 'onChange'>;

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
        alignSelf = 'flex-start',
        opacity,
        ...props
      }: TabsProps,
      ref: React.ForwardedRef<View>,
    ) => {
      const tabsContainerRef = useRef<View>(null);
      useImperativeHandle(ref, () => tabsContainerRef.current as View, []); // merge internal ref to forwarded ref

      const refMap = useRefMap<View>();
      const api = useTabs({ tabs, activeTab, disabled, onChange });

      const [activeTabRect, setActiveTabRect] = useState<Rect>(defaultRect);
      const previousActiveRef = useRef(activeTab);

      const updateActiveTabRect = useCallback(() => {
        const activeTabRef = activeTab ? refMap.getRef(activeTab.id) : null;
        if (!activeTabRef || !tabsContainerRef.current) return;
        activeTabRef.measureLayout(tabsContainerRef.current, (x, y, width, height) =>
          setActiveTabRect({ x, y, width, height }),
        );
      }, [activeTab, refMap]);

      if (previousActiveRef.current !== activeTab) {
        previousActiveRef.current = activeTab;
        updateActiveTabRect();
      }

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
        [tabs, TabComponent, refMap],
      );

      return (
        <HStack
          ref={tabsContainerRef}
          alignSelf={alignSelf}
          onLayout={updateActiveTabRect}
          opacity={opacity ?? disabled ? accessibleOpacityDisabled : 1}
          position={position}
          role={role}
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

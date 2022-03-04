import { TabIndicatorProps, TabNavigationProps, TabProps, useToggler } from '@cbhq/cds-common';
import { noop } from '@cbhq/cds-utils';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  useCallback,
  createElement,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from 'react';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { css } from 'linaria';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { HStack, VStack } from '../layout';
import { TabIndicator } from './TabIndicator';
import { TabLabel } from './TabLabel';
import { Paddle } from './Paddle';
import { useDimensions } from '../hooks/useDimensions';
import { PressableOpacity, PressableOpacityProps } from '../system/PressableOpacity';

const SCROLL_PADDING = 5; // How much breathing room do we want before showing the paddles
const scrollContainerClassName = css`
  overflow-y: hidden;
  overflow-x: scroll;
`;
const pressableClass = css`
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

const PressableOpacityWithoutChildren = PressableOpacity as ForwardRefExoticComponent<
  Omit<PressableOpacityProps, 'children'> & RefAttributes<HTMLElement>
>;
type LayoutProps = { width: number; x: number };
type TabsLayoutsMap = Map<string, LayoutProps>;
const fallbackLayout: LayoutProps = { width: 0, x: 0 };

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabNavigation = memo(
  forwardRef(
    (
      {
        tabs,
        value = tabs[0].id,
        variant = 'primary',
        testID,
        onChange = noop,
        ...rest
      }: TabNavigationProps,
      forwardedRef: ForwardedRef<HTMLElement | null>,
    ) => {
      const [activeTabLayout, setActiveTabLayout] = useState(fallbackLayout);
      const { observe, width } = useDimensions();
      const isDense = useScaleDensity() === 'dense';
      const isPrimary = useMemo(() => variant === 'primary', [variant]);
      const shouldOverrideScale = useMemo(() => isDense && isPrimary, [isDense, isPrimary]);
      const offsetRef = useRef(0);
      const tabsLayoutsMap = useRef<TabsLayoutsMap>(new Map());
      const scrollRef = useRef<HTMLElement>(null);
      useImperativeHandle(forwardedRef, () => scrollRef.current as HTMLDivElement);
      const end = Number(scrollRef.current?.scrollWidth) - Number(scrollRef.current?.offsetWidth);
      const canScrollRight = Number(scrollRef.current?.scrollLeft) < end;
      const [leftPaddle, toggleLeftPaddle] = useToggler(false);
      const [rightPaddle, toggleRightPaddle] = useToggler(canScrollRight);

      const handleOnScroll = useCallback(() => {
        const scrollDistance = Number(scrollRef.current?.scrollLeft);
        const endTrigger = end - SCROLL_PADDING;
        const startTrigger = SCROLL_PADDING;

        // Hide/show the left paddle
        if (scrollDistance > startTrigger && !leftPaddle) {
          toggleLeftPaddle.toggleOn();
        }
        if (scrollDistance <= startTrigger && leftPaddle) {
          toggleLeftPaddle.toggleOff();
        }

        // Hide/show the right paddle
        if (scrollDistance < endTrigger && !rightPaddle) {
          toggleRightPaddle.toggleOn();
        }
        if (scrollDistance >= endTrigger && rightPaddle) {
          toggleRightPaddle.toggleOff();
        }
      }, [end, leftPaddle, rightPaddle, toggleLeftPaddle, toggleRightPaddle]);

      /** ⚡️ Side effects */
      useEffect(() => {
        handleOnScroll();
      }, [handleOnScroll, width]);

      /** 🛼
       *  We need to keep an eye on the value because
       *  we'll have to calculate everything and handle
       *  scroll and layout events whenever it updates
       */
      useEffect(() => {
        const layout = tabsLayoutsMap.current.get(value) ?? fallbackLayout;
        /** Set the active tab and _maybe_ scroll to it */
        setActiveTabLayout({ width: layout.width, x: layout.x - offsetRef.current });
      }, [value]);

      const handleScrollLeft = useCallback(() => {
        scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
      }, [scrollRef]);
      const handleScrollRight = useCallback(() => {
        scrollRef?.current?.scrollTo({ left: end, behavior: 'smooth' });
      }, [end]);
      const handleLayout = useCallback(
        (id: string, layout: TabIndicatorProps) => {
          // Track offset
          tabsLayoutsMap.current.set(id, layout);
          if (id === tabs[0].id) offsetRef.current = layout.x;
          if (id === value) {
            setActiveTabLayout({
              width: layout.width,
              x: layout.x - offsetRef.current,
            });
          }
        },
        [tabs, value],
      );

      const getTabPressHandler = useCallback(
        (id, onPress) => {
          return function handleTabPres() {
            onChange(id);
            onPress?.(id); // handle callback
          };
        },
        [onChange],
      );

      const getChildren = useCallback(
        ({ id, count, label }: TabProps) => (
          <TabLabel
            id={id}
            onLayout={handleLayout}
            active={id === value}
            variant={variant}
            count={count}
          >
            {label}
          </TabLabel>
        ),
        [handleLayout, value, variant],
      );

      // Iterate over the tabs and create Pressable TabLabels
      const tabLabels = useMemo(
        () =>
          tabs
            ?.filter(Boolean)
            ?.map(({ id, onPress, label, accessibilityLabel = label, count }) => {
              return createElement(
                PressableOpacityWithoutChildren,
                {
                  key: `${id}--button`,
                  role: 'tab',
                  accessibilityLabel,
                  accessibilityHint: accessibilityLabel,
                  onPress: getTabPressHandler(id, onPress),
                  className: pressableClass,
                },
                getChildren({ id, count, label }),
              );
            }),
        [tabs, getTabPressHandler, getChildren],
      );

      return (
        <div ref={observe}>
          <HStack
            ref={scrollRef}
            onScroll={handleOnScroll}
            alignItems="center"
            position="relative"
            dangerouslySetClassName={scrollContainerClassName}
          >
            <Paddle show={leftPaddle} onPress={handleScrollLeft} variant={variant} />
            <VStack testID={testID} {...rest} spacing={0}>
              {shouldOverrideScale ? (
                <span style={{ zIndex: zIndex.navigation }}>
                  <ScaleProvider value="large">
                    <HStack role="tablist" gap={4} flexShrink={0}>
                      {tabLabels}
                    </HStack>
                  </ScaleProvider>
                </span>
              ) : (
                <HStack role="tablist" gap={4} flexShrink={0} zIndex={zIndex.navigation}>
                  {tabLabels}
                </HStack>
              )}
              {isPrimary && <TabIndicator {...activeTabLayout} />}
            </VStack>
            <Paddle
              direction="right"
              show={rightPaddle}
              onPress={handleScrollRight}
              variant={variant}
            />
          </HStack>
        </div>
      );
    },
  ),
);

TabNavigation.displayName = 'TabNavigation';

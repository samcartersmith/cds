import React, {
  createElement,
  createRef,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  memo,
  RefAttributes,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css } from 'linaria';
import { TabIndicatorProps, TabNavigationProps, TabProps, useToggler } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { tabsPaddleWidth } from '@cbhq/cds-common/tokens/tabs';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { noop } from '@cbhq/cds-utils';

import { useDimensions } from '../hooks/useDimensions';
import { HStack, VStack } from '../layout';
import { insetFocusRing } from '../styles/focus';
import { PressableOpacity, PressableOpacityProps } from '../system/PressableOpacity';
import { ThemeProvider } from '../system/ThemeProvider';
import { cx } from '../utils/linaria';

import { Paddle } from './Paddle';
import { TabIndicator } from './TabIndicator';
import { TabLabel } from './TabLabel';

const SCROLL_PADDING = 5; // How much breathing room do we want before showing the paddles
const PRESS_TIMEOUT = 50;

let scrollTimeout: number;
const containerClassName = css`
  position: relative;
  display: flex;
  align-items: center;
`;
const scrollContainerClassName = css`
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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

export const TabNavigation = memo(
  forwardRef(
    (
      {
        tabs,
        value = tabs[0].id,
        variant = 'primary',
        testID = 'tabNavigation',
        onChange = noop,
        background,
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

      const getScrollIntoViewHandler = useCallback((ref: RefObject<HTMLElement>) => {
        return function handleFocus() {
          // Container
          const container = scrollRef.current;
          const containerScrollLeft = Number(container?.scrollLeft);
          const containerWidth = Number(container?.getBoundingClientRect().width);
          const containerRightEdge = containerWidth + Number(container?.scrollLeft);
          // Element
          const element = ref.current;
          const elementWidth = Number(element?.clientWidth);
          const elementOffsetLeft = Number(element?.offsetLeft);
          // State
          const isOffscreenLeft = elementOffsetLeft < containerScrollLeft + tabsPaddleWidth;
          const isOffscreenRight =
            elementOffsetLeft + elementWidth > containerRightEdge - tabsPaddleWidth;
          // Set the new scroll location
          let newPosition: number | undefined;
          if (isOffscreenLeft) newPosition = elementOffsetLeft - tabsPaddleWidth;
          if (isOffscreenRight)
            newPosition = elementWidth + elementOffsetLeft + tabsPaddleWidth - containerWidth;

          // SCROLL TO THE NEW POSITION
          // Wrapped in a timeout so the scroll event doesn't fire before the press handler
          scrollTimeout = setTimeout(() => {
            if (newPosition && (isOffscreenLeft || isOffscreenRight)) {
              container?.scrollTo({ left: newPosition, behavior: 'smooth' });
            }
          }, PRESS_TIMEOUT);
        };
      }, []);

      const getTabPressHandler = useCallback(
        (id: string, onPress: (id: string) => void) => {
          return function handleTabPress() {
            clearTimeout(scrollTimeout);
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
            ?.map(
              ({
                id,
                onPress,
                label,
                accessibilityLabel = label,
                count,
                testID: tabLabelTestID = `${testID}-tabLabel--${id}`,
              }) => {
                const ref: RefObject<HTMLElement> = createRef();
                return createElement(
                  PressableOpacityWithoutChildren,
                  {
                    key: `${id}--button`,
                    role: 'tab',
                    accessibilityLabel,
                    accessibilityHint: accessibilityLabel,
                    onPress: getTabPressHandler(id, onPress as (id: string) => void),
                    onFocus: getScrollIntoViewHandler(ref),
                    className: cx(pressableClass, insetFocusRing),
                    testID: tabLabelTestID,
                    ref,
                  },
                  getChildren({ id, count, label }),
                );
              },
            ),
        [tabs, testID, getTabPressHandler, getScrollIntoViewHandler, getChildren],
      );

      return (
        <div ref={observe} className={containerClassName}>
          <Paddle
            background={background}
            show={leftPaddle}
            onPress={handleScrollLeft}
            variant={variant}
          />
          <HStack
            ref={scrollRef}
            onScroll={handleOnScroll}
            alignItems="center"
            position="relative"
            background={background}
            dangerouslySetClassName={scrollContainerClassName}
          >
            <VStack testID={testID} {...rest} spacing={0}>
              {shouldOverrideScale ? (
                <span style={{ zIndex: zIndex.navigation }}>
                  <ThemeProvider scale="large">
                    <HStack role="tablist" gap={4} flexShrink={0}>
                      {tabLabels}
                    </HStack>
                  </ThemeProvider>
                </span>
              ) : (
                <HStack role="tablist" gap={4} flexShrink={0} zIndex={zIndex.navigation}>
                  {tabLabels}
                </HStack>
              )}
              {isPrimary && activeTabLayout?.width > 0 && (
                <TabIndicator background={background} {...activeTabLayout} />
              )}
            </VStack>
          </HStack>
          <Paddle
            background={background}
            direction="right"
            show={rightPaddle}
            onPress={handleScrollRight}
            variant={variant}
          />
        </div>
      );
    },
  ),
);

TabNavigation.displayName = 'TabNavigation';

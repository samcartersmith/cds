import React, {
  createRef,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  memo,
  Ref,
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

import { HStack } from '../alpha/HStack';
import { VStack } from '../alpha/VStack';
import { useDimensions } from '../hooks/useDimensions';
import { insetFocusRing } from '../styles/focus';
import { PressableOpacity } from '../system/PressableOpacity';
import { ThemeProvider } from '../system/ThemeProvider';
import { cx } from '../utils/linaria';

import { Paddle } from './Paddle';
import { TabIndicator } from './TabIndicator';
import { TabLabel } from './TabLabel';

export const tabNavigationStaticClassName = 'cds-tab-navigation';

const SCROLL_PADDING = 5; // How much breathing room do we want before showing the paddles
const PRESS_TIMEOUT = 50;

let scrollTimeout: NodeJS.Timeout;
const containerClassName = css`
  &.${tabNavigationStaticClassName} {
    position: relative;
    display: flex;
    align-items: center;
  }
`;
const scrollContainerClassName = css`
  &.${tabNavigationStaticClassName} {
    overflow-y: hidden;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const pressableClass = css`
  &.${tabNavigationStaticClassName} {
    margin: 0;
    padding: 0;
    white-space: nowrap;
  }
`;
const pressableClassWithCustomTab = css`
  &.${tabNavigationStaticClassName} {
    margin: 0;
    padding: 0;
    flex-shrink: 0;
  }
`;

type LayoutProps = { width: number; x: number };
type TabRefs = Ref<{ id: string; ref: React.RefObject<HTMLElement> }[]>;
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
        accessibilityLabelledBy,
        accessibilityLabel,
        Component,
        gap = 4,
        role = 'tablist',
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
      const tabsRefs: TabRefs = useRef(tabs.map(({ id }) => ({ id, ref: createRef() })));
      const scrollRef = useRef<HTMLElement>(null);
      useImperativeHandle(forwardedRef, () => scrollRef.current as HTMLDivElement);
      const end = Number(scrollRef.current?.scrollWidth) - Number(scrollRef.current?.offsetWidth);
      const canScrollRight = Number(scrollRef.current?.scrollLeft) < end;
      const [leftPaddle, toggleLeftPaddle] = useToggler(false);
      const [rightPaddle, toggleRightPaddle] = useToggler(canScrollRight);
      const descendantAriaRole = role === 'tablist' ? 'tab' : 'radio';
      const roleBasedA11yProps =
        role === 'radiogroup'
          ? {
              'aria-activedescendant': `tab--${value}`,
            }
          : undefined;

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

      const handleScrollLeft = useCallback(() => {
        scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
      }, [scrollRef]);
      const handleScrollRight = useCallback(() => {
        scrollRef?.current?.scrollTo({ left: end, behavior: 'smooth' });
      }, [end]);

      /** 🛼
       *  Recreating handleLayout every time value changes will
       *  cause the active TabLabel to call setActiveTabLayout
       *  with its layout values, updating the TabIndicator.
       */
      const handleLayout = useCallback(
        (id: string, layout: TabIndicatorProps) => {
          // Track offset
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

      const getTabKeydownHandler = useCallback((currentId: string) => {
        return function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
          const refs = tabsRefs?.current;
          const currentActiveIndex = refs?.findIndex(({ id }) => id === currentId) ?? 0;
          const lastIndex = Number(refs?.length) - 1;
          const nextIndex = currentActiveIndex < lastIndex ? currentActiveIndex + 1 : 0;
          const prevIndex = currentActiveIndex !== 0 ? currentActiveIndex - 1 : lastIndex;

          switch (e.key) {
            case 'ArrowRight':
              e.preventDefault();
              refs?.[nextIndex].ref?.current?.focus();
              break;
            case 'ArrowLeft':
              e.preventDefault();
              refs?.[prevIndex].ref?.current?.focus();
              break;
            default:
              break;
          }
        };
      }, []);

      const getScrollIntoViewHandler = useCallback((ref: React.RefObject<HTMLElement>) => {
        return function handleFocus() {
          // Container
          const container = scrollRef.current;
          const containerScrollLeft = Number(container?.scrollLeft);
          const containerWidth = Number(container?.getBoundingClientRect().width);
          const containerRightEdge = containerWidth + Number(container?.scrollLeft);
          // Element
          const elementWidth = Number(ref?.current?.clientWidth);
          const elementOffsetLeft = Number(ref?.current?.offsetLeft);
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
        ({ label, ...props }: Pick<TabProps, 'id' | 'count' | 'label' | 'Component'>) => (
          <TabLabel
            active={props.id === value}
            {...props}
            onLayout={handleLayout}
            variant={variant}
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
                Component: TabComponent,
              }) => {
                const isActiveTab = id === value;
                const roleBasedTabA11yProps =
                  role === 'radiogroup'
                    ? { 'aria-checked': isActiveTab }
                    : { 'aria-selected': isActiveTab };
                const currentRef =
                  tabsRefs.current?.find((tab) => tab.id === id)?.ref ?? createRef();

                const CustomTabComponent = TabComponent ?? Component;

                return (
                  <PressableOpacity
                    key={`${id}--button`}
                    ref={currentRef}
                    accessibilityLabel={
                      typeof accessibilityLabel === 'string' ? accessibilityLabel : undefined
                    }
                    aria-controls={`tabpanel--${id}`}
                    {...roleBasedTabA11yProps}
                    className={cx(
                      tabNavigationStaticClassName,
                      CustomTabComponent ? pressableClassWithCustomTab : pressableClass,
                      insetFocusRing,
                    )}
                    id={`tab--${id}`}
                    onFocus={getScrollIntoViewHandler(currentRef)}
                    onKeyDown={getTabKeydownHandler(id)}
                    onPress={getTabPressHandler(id, onPress as (id: string) => void)}
                    role={descendantAriaRole}
                    tabIndex={isActiveTab ? undefined : -1}
                    testID={tabLabelTestID}
                  >
                    {CustomTabComponent && variant !== 'primary' ? (
                      <CustomTabComponent active={isActiveTab} id={id} label={label} />
                    ) : (
                      getChildren({ id, count, label, Component: CustomTabComponent })
                    )}
                  </PressableOpacity>
                );
              },
            ),
        [
          tabs,
          testID,
          value,
          role,
          Component,
          getScrollIntoViewHandler,
          getTabKeydownHandler,
          getTabPressHandler,
          descendantAriaRole,
          variant,
          getChildren,
        ],
      );

      return (
        <div ref={observe} className={cx(tabNavigationStaticClassName, containerClassName)}>
          <Paddle
            accessibilityLabel="Skip to beginning"
            background={background}
            onPress={handleScrollLeft}
            show={leftPaddle}
            testID={`${tabNavigationStaticClassName}--paddle-left`}
            variant={variant}
          />
          <HStack
            ref={scrollRef}
            alignItems="center"
            background={background}
            dangerouslySetClassName={cx(tabNavigationStaticClassName, scrollContainerClassName)}
            onScroll={handleOnScroll}
            position="relative"
          >
            <VStack testID={testID} {...rest} spacing={0}>
              {shouldOverrideScale ? (
                <span style={{ zIndex: zIndex.navigation }}>
                  <ThemeProvider scale="large">
                    <HStack
                      accessibilityLabel={accessibilityLabel}
                      accessibilityLabelledBy={accessibilityLabelledBy}
                      flexShrink={0}
                      gap={gap}
                      role={role}
                      {...roleBasedA11yProps}
                    >
                      {tabLabels}
                    </HStack>
                  </ThemeProvider>
                </span>
              ) : (
                <HStack
                  accessibilityLabel={accessibilityLabel}
                  accessibilityLabelledBy={accessibilityLabelledBy}
                  flexShrink={0}
                  gap={gap}
                  role={role}
                  zIndex={zIndex.navigation}
                  {...roleBasedA11yProps}
                >
                  {tabLabels}
                </HStack>
              )}
              {isPrimary && activeTabLayout?.width > 0 && (
                <TabIndicator background={background} {...activeTabLayout} />
              )}
            </VStack>
          </HStack>
          <Paddle
            accessibilityLabel="skip to end"
            background={background}
            direction="right"
            onPress={handleScrollRight}
            show={rightPaddle}
            testID={`${tabNavigationStaticClassName}--paddle-right`}
            variant={variant}
          />
        </div>
      );
    },
  ),
);

TabNavigation.displayName = 'TabNavigation';

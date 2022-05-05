import React, {
  ForwardedRef,
  forwardRef,
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { NoopFn, SpacingScale } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { dropdownMaxHeight } from '@cbhq/cds-common/tokens/menu';

import { Animated } from '../animation/Animated';
import { SelectProvider } from '../controls/selectContext';
import { useA11yControlledVisibility } from '../hooks/useA11yControlledVisibility';
import { useBoundingClientRect } from '../hooks/useBoundingClientRect';
import { useIsMobile } from '../hooks/useIsMobile';
import { useIsoEffect } from '../hooks/useIsoEffect';
import { useSpacingValue } from '../hooks/useSpacingValue';
import { FocusTrap } from '../overlays/FocusTrap';
import { ModalWrapper } from '../overlays/Modal/ModalWrapper';
import { PositionedOverlay } from '../overlays/positionedOverlay/PositionedOverlay';
import { PopoverContentPositionConfig } from '../overlays/positionedOverlay/PositionedOverlayProps';
import { getBrowserGlobals, isSSR } from '../utils/browser';

import { DropdownContent } from './DropdownContent';
import { DropdownProps, DropdownRefProps } from './DropdownProps';
import { useDropdownAnimation } from './useDropdownAnimation';

type DropdownVisibilityProps = {
  visible: boolean;
  onOpenMenu: NoopFn;
  onCloseMenu: NoopFn;
};

export const ModalDropdown = memo(
  forwardRef(
    (
      {
        children,
        onOpenMenu,
        onCloseMenu,
        content,
        disablePortal,
        accessibilityLabel,
        value,
        disableCloseOnOptionChange,
        visible,
        onChange,
        width,
        ...props
      }: Omit<DropdownProps, 'controlledElementAccessibilityProps' | 'onOpenMenu' | 'onCloseMenu'> &
        DropdownVisibilityProps,
      ref: ForwardedRef<DropdownRefProps>,
    ) => {
      const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
        useA11yControlledVisibility(visible, accessibilityLabel);

      const context = useMemo(
        () => ({
          onChange,
          value,
          handleCloseMenu: onCloseMenu,
        }),
        [onChange, value, onCloseMenu],
      );

      useImperativeHandle(
        ref,
        () => ({
          openMenu: onOpenMenu,
          closeMenu: onCloseMenu,
        }),
        [onOpenMenu, onCloseMenu],
      );

      return (
        <SelectProvider value={context}>
          <ModalWrapper
            visible={visible}
            disablePortal={disablePortal}
            onOverlayPress={onCloseMenu}
            dangerouslyDisableResponsiveness
            {...controlledElementAccessibilityProps}
          >
            <FocusTrap onEscPress={onCloseMenu}>
              <DropdownContent {...props}>{content}</DropdownContent>
            </FocusTrap>
          </ModalWrapper>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            {...triggerAccessibilityProps}
            onClick={onOpenMenu}
            onKeyDown={onOpenMenu}
            style={{ width }}
          >
            {children}
          </div>
        </SelectProvider>
      );
    },
  ),
);

const defaultPopoverContentPositionConfig: PopoverContentPositionConfig = {
  gap: 0.5,
  placement: 'bottom-start',
};

type UseResponsiveHeightParams = {
  gap?: SpacingScale;
  dropdownRef: MutableRefObject<HTMLElement | null>;
  maxHeight: number | `${number}%` | undefined;
  visible: boolean;
};
const useResponsiveHeight = ({
  gap,
  dropdownRef,
  maxHeight,
  visible,
}: UseResponsiveHeightParams) => {
  const dropdownHeight = useRef<string | undefined>(undefined);
  const dropdownRect = useBoundingClientRect(dropdownRef);
  const bottomGutter = useSpacingValue(2);
  const calculatedGap = useSpacingValue(gap ?? 0);
  const calculatedMaxHeight = typeof maxHeight === 'number' ? maxHeight : 0;
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    !isSSR() ? getBrowserGlobals()?.window.innerHeight : undefined,
  );
  const handleWindowSizeChange = useCallback(() => {
    setWindowHeight(getBrowserGlobals()?.window.innerHeight);
  }, [setWindowHeight]);
  useEffect(() => {
    // useEffect will only run client side
    getBrowserGlobals()?.window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      getBrowserGlobals()?.window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);
  const verticalBreakpoint = useMemo(
    () =>
      dropdownRect
        ? dropdownRect.top + calculatedMaxHeight + bottomGutter + calculatedGap
        : undefined,
    [bottomGutter, calculatedGap, calculatedMaxHeight, dropdownRect],
  );
  const responsivePopoverMenuHeight = useMemo(
    () => (dropdownRect ? `calc(100vh - ${dropdownRect.top}px - ${bottomGutter}px)` : undefined),
    [dropdownRect, bottomGutter],
  );

  useIsoEffect(() => {
    if (windowHeight && verticalBreakpoint && visible && windowHeight <= verticalBreakpoint) {
      // only apply a responsive menu height if the viewport height encroaches on the menu
      dropdownHeight.current = responsivePopoverMenuHeight;
    } else {
      dropdownHeight.current = undefined;
    }
  }, [windowHeight, verticalBreakpoint, responsivePopoverMenuHeight, visible]);

  return { dropdownHeight };
};

const PopoverDropdown = memo(
  forwardRef(
    (
      {
        content,
        showOverlay,
        children,
        visible,
        onCloseMenu,
        onOpenMenu,
        width,
        minWidth,
        maxWidth,
        value,
        disableCloseOnOptionChange,
        testID,
        maxHeight,
        onChange,
        disablePortal,
        onBlur,
        enableSearch,
        contentPosition = defaultPopoverContentPositionConfig,
        block,
        ...props
      }: Omit<DropdownProps, 'enableMobileModal' | 'onOpenMenu' | 'onCloseMenu'> &
        DropdownVisibilityProps,
      ref: ForwardedRef<DropdownRefProps>,
    ) => {
      const dropdownRef = useRef<HTMLElement | null>(null);
      const subjectRef = useRef<HTMLDivElement | null>(null);
      const subjectRect = useBoundingClientRect(subjectRef);

      const { dropdownHeight } = useResponsiveHeight({
        gap: contentPosition.gap,
        dropdownRef,
        maxHeight,
        visible,
      });

      const {
        animatePopoverOverlayOut,
        animatePopoverTranslateOut,
        animateOverlayOut,
        overlayRef,
        animateIn,
      } = useDropdownAnimation(dropdownRef, contentPosition.placement, showOverlay);

      const animateOutAndCloseMenu = useCallback(async () => {
        if (showOverlay) {
          await Animated.parallel([
            animatePopoverOverlayOut,
            animatePopoverTranslateOut,
            animateOverlayOut(),
          ]).start(({ finished }) => {
            if (finished) {
              onOpenMenu?.();
            }
          });
        } else {
          await Animated.parallel([animatePopoverOverlayOut, animatePopoverTranslateOut]).start(
            ({ finished }) => {
              if (finished) {
                onCloseMenu?.();
              }
            },
          );
        }
      }, [
        showOverlay,
        animatePopoverOverlayOut,
        animatePopoverTranslateOut,
        animateOverlayOut,
        onOpenMenu,
        onCloseMenu,
      ]);

      const context = useMemo(
        () => ({
          onChange,
          value,
          handleCloseMenu: animateOutAndCloseMenu,
        }),
        [onChange, value, animateOutAndCloseMenu],
      );

      const memoizedContent = useMemo(() => {
        return (
          <DropdownContent
            ref={dropdownRef}
            onOpen={animateIn}
            width={block ? subjectRect.width : width}
            minWidth={minWidth}
            maxWidth={maxWidth}
            height={dropdownHeight.current}
            maxHeight={maxHeight}
            enableSearch={enableSearch}
            value={value}
          >
            {content}
          </DropdownContent>
        );
      }, [
        animateIn,
        block,
        content,
        dropdownHeight,
        enableSearch,
        maxHeight,
        maxWidth,
        minWidth,
        subjectRect.width,
        value,
        width,
      ]);

      useImperativeHandle(
        ref,
        () => ({
          openMenu: onOpenMenu,
          closeMenu: onCloseMenu,
        }),
        [onOpenMenu, onCloseMenu],
      );

      return (
        <SelectProvider value={context}>
          <PositionedOverlay
            // DropdownContent will handle exit animation on menu blur, including pressing the subject again to close
            onPressSubject={!visible ? onOpenMenu : undefined}
            onClose={animateOutAndCloseMenu}
            visible={visible}
            content={memoizedContent}
            showOverlay={showOverlay}
            overlayRef={overlayRef}
            contentPosition={contentPosition ?? defaultPopoverContentPositionConfig}
            testID={testID}
            disablePortal={disablePortal}
            onBlur={onBlur}
            block={block}
            {...props}
          >
            <div ref={subjectRef} style={{ width: '100%' }}>
              {children}
            </div>
          </PositionedOverlay>
        </SelectProvider>
      );
    },
  ),
);

export const Dropdown = memo(
  forwardRef(
    (
      {
        children,
        maxHeight = dropdownMaxHeight,
        enableSearch = false,
        enableMobileModal,
        onOpenMenu,
        onCloseMenu,
        ...props
      }: DropdownProps,
      ref: ForwardedRef<DropdownRefProps>,
    ) => {
      const isMobileWeb = useIsMobile();
      const [visible, { toggleOn, toggleOff }] = useToggler();

      const handleOpenMenu = useCallback(() => {
        toggleOn();
        onOpenMenu?.();
      }, [onOpenMenu, toggleOn]);

      const handleCloseMenu = useCallback(() => {
        toggleOff();
        onCloseMenu?.();
      }, [onCloseMenu, toggleOff]);

      return isMobileWeb && enableMobileModal ? (
        <ModalDropdown
          maxHeight={maxHeight}
          visible={visible}
          onOpenMenu={handleOpenMenu}
          onCloseMenu={handleCloseMenu}
          ref={ref}
          {...props}
        >
          {children}
        </ModalDropdown>
      ) : (
        <PopoverDropdown
          maxHeight={maxHeight}
          enableSearch={enableSearch}
          visible={visible}
          onOpenMenu={handleOpenMenu}
          onCloseMenu={handleCloseMenu}
          ref={ref}
          {...props}
        >
          {children}
        </PopoverDropdown>
      );
    },
  ),
);

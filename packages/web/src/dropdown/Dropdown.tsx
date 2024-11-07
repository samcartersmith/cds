import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useMeasure, { RectReadOnly } from 'react-use-measure';
import { DimensionValue, SpacingScale } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { dropdownMaxHeight } from '@cbhq/cds-common/tokens/menu';

import { SelectProvider } from '../controls/selectContext';
import { useBoundingClientRect } from '../hooks/useBoundingClientRect';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { useIsoEffect } from '../hooks/useIsoEffect';
import { useSpacingValue } from '../hooks/useSpacingValue';
import { FocusTrap } from '../overlays/FocusTrap';
import { ModalWrapper } from '../overlays/Modal/ModalWrapper';
import { Popover } from '../overlays/popover/Popover';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { getBrowserGlobals, isSSR } from '../utils/browser';

import { DropdownContent } from './DropdownContent';
import { DropdownProps, DropdownRefProps } from './DropdownProps';

type DropdownVisibilityProps = {
  visible: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
};

const ModalDropdown = memo(
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
        disabled,
        controlledElementAccessibilityProps,
        respectNegativeTabIndex,
        ...props
      }: Omit<DropdownProps, 'onOpenMenu' | 'onCloseMenu'> & DropdownVisibilityProps,
      ref: ForwardedRef<DropdownRefProps>,
    ) => {
      const context = useMemo(
        () => ({
          onChange,
          value,
          handleCloseMenu: !disableCloseOnOptionChange ? onCloseMenu : undefined,
        }),
        [onChange, value, disableCloseOnOptionChange, onCloseMenu],
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
            dangerouslyDisableResponsiveness
            disablePortal={disablePortal}
            onOverlayPress={onCloseMenu}
            testID="dropdown-modal"
            visible={visible}
            {...controlledElementAccessibilityProps}
          >
            <FocusTrap
              disableAutoFocus={!!value}
              onEscPress={onCloseMenu}
              respectNegativeTabIndex={respectNegativeTabIndex}
            >
              <DropdownContent {...props}>{content}</DropdownContent>
            </FocusTrap>
          </ModalWrapper>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onClick={disabled ? undefined : onOpenMenu} onKeyDown={onOpenMenu} style={{ width }}>
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
  dropdownBounds: RectReadOnly;
  maxHeight: number | `${number}%` | undefined;
  visible: boolean;
  placement: PopoverContentPositionConfig['placement'];
};

const useResponsiveHeight = ({
  gap,
  dropdownBounds,
  maxHeight,
  visible,
  placement,
}: UseResponsiveHeightParams) => {
  const [dropdownHeight, setDropdownHeight] = useState<DimensionValue | undefined>(maxHeight);
  const bottomGutter = useSpacingValue(2);
  const calculatedGap = useSpacingValue(gap ?? 0);
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

  const calculatedMaxHeight = useMemo(() => {
    if (typeof maxHeight === 'number') return maxHeight;
    if (maxHeight === undefined) return 0;
    const percentWindowHeight = ((windowHeight ?? 0) * parseInt(maxHeight, 10)) / 100;
    return percentWindowHeight;
  }, [maxHeight, windowHeight]);

  const verticalBreakpoint = useMemo(() => {
    if (dropdownBounds) {
      if (placement?.includes('bottom')) {
        return dropdownBounds.top + calculatedMaxHeight + bottomGutter + calculatedGap;
      }
      if (placement?.includes('top')) {
        return dropdownBounds.bottom + calculatedMaxHeight + bottomGutter + calculatedGap;
      }
    }
    return undefined;
  }, [bottomGutter, calculatedGap, calculatedMaxHeight, dropdownBounds, placement]);

  const responsivePopoverMenuHeight = useMemo(() => {
    if (placement?.includes('bottom')) {
      return dropdownBounds
        ? `calc(100vh - ${dropdownBounds.top}px - ${bottomGutter}px)`
        : undefined;
    }
    if (placement?.includes('top')) {
      return dropdownBounds
        ? `calc(100vh - ${dropdownBounds.bottom}px - ${bottomGutter}px)`
        : undefined;
    }
  }, [placement, dropdownBounds, bottomGutter]);

  useIsoEffect(() => {
    if (windowHeight && verticalBreakpoint && visible && windowHeight <= verticalBreakpoint) {
      // only apply a responsive menu height if the viewport height encroaches on the menu
      setDropdownHeight(responsivePopoverMenuHeight);
    } else {
      setDropdownHeight(calculatedMaxHeight);
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
        contentPosition = defaultPopoverContentPositionConfig,
        block,
        disabled,
        ...props
      }: Omit<DropdownProps, 'enableMobileModal' | 'onOpenMenu' | 'onCloseMenu'> &
        DropdownVisibilityProps,
      ref: ForwardedRef<DropdownRefProps>,
    ) => {
      const [dropdownRef, dropdownBounds] = useMeasure();
      const subjectRef = useRef<HTMLDivElement | null>(null);
      const subjectRect = useBoundingClientRect(subjectRef);
      // if consumer only customizes some of the contentPosition values, we want to merge them with the defaults
      const combinedContentPosition = useMemo(
        () => ({ ...defaultPopoverContentPositionConfig, ...contentPosition }),
        [contentPosition],
      );

      const { dropdownHeight } = useResponsiveHeight({
        gap: combinedContentPosition.gap,
        dropdownBounds,
        maxHeight,
        visible,
        placement: combinedContentPosition.placement,
      });

      const context = useMemo(
        () => ({
          onChange,
          value,
          handleCloseMenu: !disableCloseOnOptionChange ? onCloseMenu : undefined,
        }),
        [onChange, value, disableCloseOnOptionChange, onCloseMenu],
      );

      const memoizedContent = useMemo(() => {
        return (
          <DropdownContent
            ref={dropdownRef}
            // @ts-expect-error TODO: support string values for dimensions in layout components
            maxHeight={dropdownHeight}
            maxWidth={maxWidth}
            minWidth={minWidth}
            placement={combinedContentPosition.placement}
            value={value}
            width={block ? subjectRect.width : width}
          >
            {content}
          </DropdownContent>
        );
      }, [
        dropdownRef,
        dropdownHeight,
        maxWidth,
        minWidth,
        combinedContentPosition.placement,
        value,
        block,
        subjectRect.width,
        width,
        content,
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
          <Popover
            // DropdownContent will handle exit animation on menu blur, including pressing the subject again to close
            block={block}
            content={disabled ? undefined : memoizedContent}
            contentPosition={combinedContentPosition}
            disableAutoFocus={!!value}
            disablePortal={disablePortal}
            disabled={disabled}
            onBlur={onBlur}
            onClose={onCloseMenu}
            onPressSubject={!visible ? onOpenMenu : undefined}
            showOverlay={showOverlay}
            testID={testID}
            visible={disabled ? false : visible}
            {...props}
          >
            <div ref={subjectRef} style={{ width: '100%' }}>
              {children}
            </div>
          </Popover>
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
        enableMobileModal,
        onOpenMenu,
        onCloseMenu,
        ...props
      }: DropdownProps,
      ref: ForwardedRef<DropdownRefProps>,
    ) => {
      const { isPhone } = useBreakpoints();
      const [visible, { toggleOn, toggleOff }] = useToggler();

      const handleOpenMenu = useCallback(() => {
        toggleOn();
        onOpenMenu?.();
      }, [onOpenMenu, toggleOn]);

      const handleCloseMenu = useCallback(() => {
        toggleOff();
        onCloseMenu?.();
      }, [onCloseMenu, toggleOff]);

      return isPhone && enableMobileModal ? (
        <ModalDropdown
          ref={ref}
          maxHeight={maxHeight}
          onCloseMenu={handleCloseMenu}
          onOpenMenu={handleOpenMenu}
          visible={visible}
          {...props}
        >
          {children}
        </ModalDropdown>
      ) : (
        <PopoverDropdown
          ref={ref}
          maxHeight={maxHeight}
          onCloseMenu={handleCloseMenu}
          onOpenMenu={handleOpenMenu}
          visible={visible}
          {...props}
        >
          {children}
        </PopoverDropdown>
      );
    },
  ),
);

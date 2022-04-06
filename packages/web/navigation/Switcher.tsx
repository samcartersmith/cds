/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { css } from 'linaria';
import { animateMenuOpacityInConfig } from '@cbhq/cds-common/animation/menu';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { DimensionValue, ForwardedRef } from '@cbhq/cds-common/types';
import { SpacingScale } from '@cbhq/cds-common/types/SpacingScale';

import { Animated } from '../animation/Animated';
import { useA11yControlledVisibility } from '../hooks/useA11yControlledVisibility';
import { VStack } from '../layout/VStack';
import { FocusTrap } from '../overlays/FocusTrap';
import { ModalWrapper } from '../overlays/Modal/ModalWrapper';
import { useOverlayAnimation } from '../overlays/Overlay/useOverlayAnimation';
import { usePopoverMenuAnimation } from '../overlays/PopoverMenu/usePopoverMenuAnimation';
import { PositionedOverlay } from '../overlays/positionedOverlay/PositionedOverlay';
import { PositionedOverlayProps } from '../overlays/positionedOverlay/PositionedOverlayProps';
import { transparentScrollbar } from '../styles/scrollbar';
import { isSSR } from '../utils/browser';
import { cx } from '../utils/linaria';

const switcherGutter: SpacingScale = 1;

const switcherDefaultWidth = 359;
const switcherMaxHeight = 600;

export type SwitcherBaseProps = {
  /** @default 359 */
  maxWidth?: DimensionValue;
  /** @default 600 */
  maxHeight?: DimensionValue;
} & Pick<
  PositionedOverlayProps,
  'children' | 'visible' | 'onPressSubject' | 'onClose' | 'content' | 'disablePortal'
>;

const contentStyles = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

type UseSwitcherAnimationParams = {
  visible: boolean;
} & Pick<SwitcherBaseProps, 'onClose'>;

/**
 * @deprecated DANGER this component is for internal use only
 */
function useSwitcherAnimation({ onClose, visible }: UseSwitcherAnimationParams) {
  const overlayRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLElement | null>(null);

  const { animatePopoverOverlayOut, animatePopoverTranslateOut } = usePopoverMenuAnimation(
    visible,
    popoverRef,
  );
  const { animateIn: animateOverlayIn, animateOut: animateOverlayOut } = useOverlayAnimation(
    overlayRef,
    animateMenuOpacityInConfig.duration,
  );

  useEffect(() => {
    if (visible) {
      void animateOverlayIn()?.start();
    }
  }, [visible, animateOverlayIn]);

  const handleClose = useCallback(async () => {
    await Animated.parallel([
      animatePopoverOverlayOut,
      animatePopoverTranslateOut,
      animateOverlayOut(),
    ]).start(({ finished }) => {
      if (finished) {
        onClose?.();
      }
    });
  }, [animateOverlayOut, animatePopoverOverlayOut, animatePopoverTranslateOut, onClose]);

  return {
    overlayRef,
    popoverRef,
    handleClose,
  };
}

const SwitcherContent = memo(
  forwardRef(
    (
      {
        maxWidth,
        maxHeight,
        children,
      }: Pick<SwitcherBaseProps, 'maxWidth' | 'maxHeight' | 'children'>,
      forwardedRef: ForwardedRef<HTMLElement>,
    ) => {
      return (
        <VStack
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          elevation={2}
          background="background"
          borderRadius="popover"
          spacingVertical={2}
          zIndex={zIndex.overlays.popoverMenu}
          ref={forwardedRef}
        >
          <VStack dangerouslySetClassName={cx(contentStyles, transparentScrollbar)}>
            {children}
          </VStack>
        </VStack>
      );
    },
  ),
);

const ModalSwitcher = memo(
  ({
    children,
    visible,
    onPressSubject,
    onClose,
    content,
    disablePortal,
    maxHeight,
    maxWidth,
  }: SwitcherBaseProps) => {
    const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
      useA11yControlledVisibility(visible);

    return (
      <>
        <ModalWrapper
          visible={visible}
          disablePortal={disablePortal}
          onOverlayPress={onClose}
          dangerouslyDisableResponsiveness
          {...controlledElementAccessibilityProps}
        >
          <FocusTrap onEscPress={onClose}>
            <SwitcherContent maxHeight={maxHeight} maxWidth={maxWidth}>
              {content}
            </SwitcherContent>
          </FocusTrap>
        </ModalWrapper>
        <div onClick={onPressSubject} {...triggerAccessibilityProps}>
          {children}
        </div>
      </>
    );
  },
);

const PositionedOverlaySwitcher = memo(
  ({
    children,
    visible,
    onPressSubject,
    onClose,
    content,
    maxWidth,
    maxHeight,
    disablePortal,
  }: SwitcherBaseProps) => {
    const { overlayRef, popoverRef, handleClose } = useSwitcherAnimation({ onClose, visible });

    return (
      <PositionedOverlay
        onClose={handleClose}
        overlayRef={overlayRef}
        visible={visible}
        showOverlay
        gap={switcherGutter}
        disablePortal={disablePortal}
        content={
          <SwitcherContent ref={popoverRef} maxWidth={maxWidth} maxHeight={maxHeight}>
            {content}
          </SwitcherContent>
        }
        onPressSubject={onPressSubject}
      >
        {children}
      </PositionedOverlay>
    );
  },
);

const mobileBreakPoint = 414;

const useIsMobile = () => {
  const [width, setWidth] = useState<number | undefined>(!isSSR() ? window.innerWidth : undefined);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    // useEffect will only run client side
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return width && width <= mobileBreakPoint;
};

/**
 * @deprecated DANGER this component is for internal use only
 */
export const Switcher = ({
  maxWidth = switcherDefaultWidth,
  maxHeight = switcherMaxHeight,
  ...props
}: SwitcherBaseProps) => {
  const isMobileWeb = useIsMobile();
  return (
    <>
      {isMobileWeb ? (
        <ModalSwitcher maxWidth={maxWidth} maxHeight={maxHeight} {...props} />
      ) : (
        <PositionedOverlaySwitcher maxWidth={maxWidth} maxHeight={maxHeight} {...props} />
      )}
    </>
  );
};

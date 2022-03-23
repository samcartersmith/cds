import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { css } from 'linaria';
import { animateMenuOpacityInConfig } from '@cbhq/cds-common/animation/menu';
import { DimensionValue } from '@cbhq/cds-common/types';
import { SpacingScale } from '@cbhq/cds-common/types/SpacingScale';

import { Animated } from '../animation/Animated';
import { VStack } from '../layout/VStack';
import { useOverlayAnimation } from '../overlays/Overlay/useOverlayAnimation';
import { usePopoverMenuAnimation } from '../overlays/PopoverMenu/usePopoverMenuAnimation';
import { PositionedOverlay } from '../overlays/positionedOverlay/PositionedOverlay';
import { PositionedOverlayProps } from '../overlays/positionedOverlay/PositionedOverlayProps';
import { transparentScrollbar } from '../styles/scrollbar';
import { cx } from '../utils/linaria';

const switcherGutter: SpacingScale = 1;

const switcherDefaultWidth = 359;
const switcherMinHeight = 400;
const switcherMaxHeight = 600;

export type SwitcherBaseProps = {
  /** @default 359 */
  minWidth?: DimensionValue;
  /** @default 359 */
  maxWidth?: DimensionValue;
  /** @default 400 */
  minHeight?: DimensionValue;
  /** @default 600 */
  maxHeight?: DimensionValue;
} & Pick<PositionedOverlayProps, 'children' | 'visible' | 'onPressSubject' | 'onClose' | 'content'>;

const contentStyles = css`
  overflow-y: scroll;
  overflow-x: hidden;
`;

type UseSwitcherAnimationParams = {
  visible: boolean;
} & Pick<SwitcherBaseProps, 'onClose'>;

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

export const Switcher = ({
  children,
  visible,
  onPressSubject,
  onClose,
  content,
  minWidth = switcherDefaultWidth,
  maxWidth = switcherDefaultWidth,
  minHeight = switcherMinHeight,
  maxHeight = switcherMaxHeight,
}: SwitcherBaseProps) => {
  const { overlayRef, popoverRef, handleClose } = useSwitcherAnimation({ onClose, visible });

  const switcherContent = useMemo(
    () => (
      <VStack
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        dangerouslySetClassName={cx(contentStyles, transparentScrollbar)}
        borderRadius="popover"
        elevation={2}
        background="background"
        spacingVertical={2}
        ref={popoverRef}
      >
        {content}
      </VStack>
    ),
    [content, maxHeight, maxWidth, minHeight, minWidth, popoverRef],
  );
  return (
    <PositionedOverlay
      onClose={handleClose}
      overlayRef={overlayRef}
      visible={visible}
      showOverlay
      gap={switcherGutter}
      content={switcherContent}
      onPressSubject={onPressSubject}
    >
      {children}
    </PositionedOverlay>
  );
};

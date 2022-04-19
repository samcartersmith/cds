import React, { memo, ReactElement } from 'react';
import { m as motion, Target } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateInOverlayOpacityConfig,
  animateInTranslateYConfig,
  animateOutOpacityConfig,
  animateOutOverlayOpacityConfig,
  animateOutTranslateYConfig,
} from '@cbhq/cds-common/animation/fullscreenModal';

import { Animated } from '../../animation/Animated';
import { IconButton } from '../../buttons';
import { usePinStyles } from '../../hooks/usePinStyles';
import { LogoMark } from '../../icons';
import { Box, HStack, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../Overlay/Overlay';

import { containerClassName, contentClassName, headerClassName } from './fullscreenModalStyles';
import { ModalProps } from './Modal';
import { ModalWrapper } from './ModalWrapper';

export type FullscreenModalProps = {
  /**
   * Title displayed in the Fullscreen Modal header.
   */
  title?: string;
  /**
   * Primary content element.
   */
  primaryContent: ReactElement;
  /**
   * Secondary content element.
   */
  secondaryContent?: ReactElement;
} & Pick<
  ModalProps,
  | 'visible'
  | 'onRequestClose'
  | 'disablePortal'
  | 'accessibilityLabel'
  | 'accessibilityLabelledBy'
  | 'testID'
  | 'zIndex'
>;

export const FullscreenModal = memo(function FullscreenModal({
  visible,
  onRequestClose,
  primaryContent,
  secondaryContent,
  title,
  testID,
  zIndex,
  disablePortal,
}: FullscreenModalProps) {
  const pinStyles = usePinStyles('all');

  const overlay = (
    <motion.div
      initial={
        Animated.toFramerTransition([animateOutOverlayOpacityConfig], {
          propertiesOnly: true,
        }) as Target
      }
      animate={Animated.toFramerTransition([animateInOverlayOpacityConfig])}
      exit={Animated.toFramerTransition([animateOutOverlayOpacityConfig])}
    >
      <Overlay />
    </motion.div>
  );

  const header = (
    <HStack
      borderedBottom
      spacingHorizontal={4}
      spacingVertical={3}
      dangerouslySetClassName={headerClassName}
    >
      <Box spacingEnd={3} dangerouslySetClassName="fsm-header-logo">
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        {title ? (
          <TextTitle1 as="h1">{title}</TextTitle1>
        ) : (
          <div className="fsm-header-logo-inner">
            <LogoMark size={32} />
          </div>
        )}
        <Box flexGrow={1} justifyContent="flex-end">
          <IconButton transparent name="close" onPress={onRequestClose} />
        </Box>
      </Box>
    </HStack>
  );

  const content = (
    <div className={contentClassName}>
      <div className="fsm-primary-content-container">{primaryContent}</div>
      {!!secondaryContent && (
        <div className="fsm-secondary-content-container">{secondaryContent}</div>
      )}
    </div>
  );

  return (
    <ModalWrapper
      visible={visible}
      hideOverlay
      testID={testID}
      zIndex={zIndex}
      disablePortal={disablePortal}
    >
      {overlay}
      <motion.div
        initial={
          Animated.toFramerTransition([animateOutOpacityConfig, animateOutTranslateYConfig], {
            propertiesOnly: true,
          }) as Target
        }
        animate={Animated.toFramerTransition([animateInOpacityConfig, animateInTranslateYConfig])}
        exit={Animated.toFramerTransition([animateOutOpacityConfig, animateOutTranslateYConfig])}
        className={pinStyles}
      >
        <FocusTrap onEscPress={onRequestClose}>
          <VStack background="background" dangerouslySetClassName={containerClassName}>
            {header}
            {content}
          </VStack>
        </FocusTrap>
      </motion.div>
    </ModalWrapper>
  );
});

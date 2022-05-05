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
import { cx } from '../../utils/linaria';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../Overlay/Overlay';

import {
  containerClassName,
  contentClassName,
  headerClassName,
  headerLogoClassName,
  headerLogoInnerClassName,
  primaryContentContainerClassName,
  secondaryContentContainerClassName,
} from './fullscreenModalStyles';
import { ModalProps } from './Modal';
import { ModalWrapper } from './ModalWrapper';

export type FullscreenModalProps = {
  /**
   * Title displayed in the Fullscreen Modal header.
   */
  title?: string;
  /**
   * Primary content element. Primary content is where the core of the task or information should live.
   */
  primaryContent: ReactElement;
  /**
   * Secondary content element. Secondary content is supplemental information.
   */
  secondaryContent?: ReactElement;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetContentClassName?: string;
  /**
   * Hide header bottom divider
   * @default false
   */
  hideDivider?: boolean;
} & Pick<
  ModalProps,
  | 'visible'
  | 'onRequestClose'
  | 'disablePortal'
  | 'accessibilityLabel'
  | 'accessibilityLabelledBy'
  | 'testID'
  | 'zIndex'
  | 'role'
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
  dangerouslySetContentClassName,
  hideDivider = false,
  role,
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
      borderedBottom={!hideDivider}
      spacingHorizontal={4}
      spacingVertical={2}
      dangerouslySetClassName={headerClassName}
      alignItems="center"
    >
      <Box spacingEnd={3} dangerouslySetClassName={headerLogoClassName}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        {title ? (
          <TextTitle1 as="h1">{title}</TextTitle1>
        ) : (
          <div className={headerLogoInnerClassName}>
            <LogoMark size={32} />
          </div>
        )}
        <Box flexGrow={1} justifyContent="flex-end">
          <IconButton transparent name="close" onPress={onRequestClose} aria-label="Close button" />
        </Box>
      </Box>
    </HStack>
  );

  const content = (
    <div className={cx(contentClassName, dangerouslySetContentClassName)}>
      <div className={primaryContentContainerClassName}>{primaryContent}</div>
      {!!secondaryContent && (
        <div className={secondaryContentContainerClassName}>{secondaryContent}</div>
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
      role={role}
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

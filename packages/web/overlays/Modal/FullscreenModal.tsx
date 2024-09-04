import React, { memo, ReactElement } from 'react';
import { m as motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateInOverlayOpacityConfig,
  animateInTranslateYConfig,
  animateOutOpacityConfig,
  animateOutOverlayOpacityConfig,
  animateOutTranslateYConfig,
} from '@cbhq/cds-common/animation/fullscreenModal';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common/overlays/OverlayContentContext';

import { IconButton } from '../../buttons';
import { useA11yLabels } from '../../hooks/useA11yLabels';
import { usePinStyles } from '../../hooks/usePinStyles';
import { LogoMark } from '../../icons';
import { Box, HStack, VStack } from '../../layout';
import { useMotionProps } from '../../motion/useMotionProps';
import { TextTitle1 } from '../../typography';
import { cx } from '../../utils/linaria';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../Overlay/Overlay';

import {
  containerClassName,
  contentClassName,
  contentScrollContainer,
  headerClassName,
  headerLogoClassName,
  headerLogoInnerClassName,
  primaryContentContainerClassName,
  secondaryContentContainerClassName,
  secondaryContentDividerClassName,
} from './fullscreenModalStyles';
import { ModalProps } from './Modal';
import { ModalHeaderProps } from './ModalHeader';
import { ModalWrapper } from './ModalWrapper';

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export type FullscreenModalProps = {
  /**
   * The logo to display
   */
  logo?: ReactElement;
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
  /**
   * Show divider between primary and secondary content
   * @default false
   */
  showSecondaryContentDivider?: boolean;
  /** Apply styles to content. */
  contentStyle?: React.CSSProperties;
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
  | 'onDidClose'
  | 'shouldCloseOnEscPress'
  | 'disableFocusTrap'
  | 'focusTabIndexElements'
> &
  Pick<ModalHeaderProps, 'closeAccessibilityLabel'>;

export const FullscreenModal = memo(function FullscreenModal({
  focusTabIndexElements = false,
  logo,
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
  showSecondaryContentDivider = false,
  role,
  onDidClose,
  shouldCloseOnEscPress = true,
  disableFocusTrap,
  accessibilityLabelledBy,
  accessibilityLabel,
  closeAccessibilityLabel,
  contentStyle,
}: FullscreenModalProps) {
  const { labelledBySource, labelledBy, label } = useA11yLabels({
    accessibilityLabelledBy,
    accessibilityLabel,
  });

  const pinStyles = usePinStyles('all');
  const overlayMotionProps = useMotionProps({
    enterConfigs: [animateInOverlayOpacityConfig],
    exitConfigs: [animateOutOverlayOpacityConfig],
    exit: 'exit',
  });

  const dialogMotionProps = useMotionProps({
    enterConfigs: [animateInOpacityConfig, animateInTranslateYConfig],
    exitConfigs: [animateOutOpacityConfig, animateOutTranslateYConfig],
    exit: 'exit',
  });

  const overlay = (
    <motion.div {...overlayMotionProps}>
      <Overlay />
    </motion.div>
  );

  const header = (
    <HStack
      alignItems="center"
      borderedBottom={!hideDivider}
      className={headerClassName}
      spacingHorizontal={4}
      spacingVertical={2}
    >
      <Box className={headerLogoClassName} spacingEnd={3}>
        {logo ?? <LogoMark size={32} />}
      </Box>
      <Box flexGrow={1}>
        {title ? (
          <TextTitle1 as="h1" id={labelledBySource}>
            {title}
          </TextTitle1>
        ) : (
          <div className={headerLogoInnerClassName}>
            <LogoMark size={32} />
          </div>
        )}
        <Box flexGrow={1} justifyContent="flex-end">
          <IconButton
            transparent
            aria-label={closeAccessibilityLabel}
            name="close"
            onPress={onRequestClose}
          />
        </Box>
      </Box>
    </HStack>
  );

  const content = (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={contentScrollContainer} tabIndex={0}>
      <div
        className={cx(contentClassName, dangerouslySetContentClassName)}
        style={contentStyle}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <div className={primaryContentContainerClassName}>{primaryContent}</div>
        {!!secondaryContent && (
          <div
            className={cx(
              secondaryContentContainerClassName,
              showSecondaryContentDivider && secondaryContentDividerClassName,
            )}
          >
            {secondaryContent}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <ModalWrapper
        hideOverlay
        accessibilityLabel={label}
        accessibilityLabelledBy={labelledBy}
        disablePortal={disablePortal}
        onDidClose={onDidClose}
        role={role}
        testID={testID}
        visible={visible}
        zIndex={zIndex}
      >
        {overlay}
        <motion.div {...dialogMotionProps} className={pinStyles}>
          <FocusTrap
            disableFocusTrap={disableFocusTrap}
            focusTabIndexElements={focusTabIndexElements}
            onEscPress={shouldCloseOnEscPress ? onRequestClose : undefined}
          >
            <VStack background="background" className={containerClassName}>
              {header}
              {content}
            </VStack>
          </FocusTrap>
        </motion.div>
      </ModalWrapper>
    </OverlayContentContext.Provider>
  );
});

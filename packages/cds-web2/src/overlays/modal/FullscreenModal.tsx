import React, { memo, useMemo } from 'react';
import { cx } from '@linaria/core';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateInOverlayOpacityConfig,
  animateInTranslateYConfig,
  animateOutOpacityConfig,
  animateOutOverlayOpacityConfig,
  animateOutTranslateYConfig,
} from '@cbhq/cds-common2/animation/fullscreenModal';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common2/overlays/OverlayContentContext';

import { IconButton } from '../../buttons';
import { useA11yLabels } from '../../hooks/useA11yLabels';
import { LogoMark } from '../../icons/LogoMark';
import { Box, HStack, VStack } from '../../layout';
import { useMotionProps } from '../../motion/useMotionProps';
import { breakpoints } from '../../styles/media';
import { Text } from '../../typography/Text';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../overlay/Overlay';

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
  logo?: React.ReactElement;
  /**
   * Title displayed in the Fullscreen Modal header.
   */
  title?: string;
  /**
   * Primary content element. Primary content is where the core of the task or information should live.
   */
  primaryContent: React.ReactElement;
  /**
   * Class applied to the primary content element
   */
  primaryContentClassName?: string;
  /**
   * Secondary content element. Secondary content is supplemental information.
   */
  secondaryContent?: React.ReactElement;
  /**
   * Class applied to the secondary content element
   */
  secondaryContentClassName?: string;
  /**
   * Class applied to the content container element
   */
  contentContainerClassName?: string;
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

const contentMaxWidth = 800;
const secondaryContentWidth = 400;
const paddingStartSmall = 80;
const paddingStartLarge = 240;

const containerStyles = css`
  width: 100%;
  height: 100%;
`;

const primaryContentContainerStyles = css`
  margin-bottom: var(--space-4);

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    max-width: ${contentMaxWidth}px;
    width: 100%;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    padding: var(--space-4) 0;
    margin-inline-end: var(--space-4);
    margin-bottom: 0;
  }
`;

const secondaryContentContainerStyles = css`
  width: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    max-width: ${contentMaxWidth}px;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    width: ${secondaryContentWidth}px;
    padding: var(--space-4) 0 0 0;
  }
`;

const secondaryContentDividerStyles = css`
  padding: var(--space-4) 0 0 0;
  border-top: 1px solid var(--color-bgLine);

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    width: calc(${secondaryContentWidth}px + var(--space-4));
    padding: var(--space-4) 0 0 var(--space-4);
    border-top: 0;
    border-left: 1px solid var(--color-bgLine);
  }
`;

const contentScrollContainer = css`
  overflow: auto;
  height: 100%;
`;

const contentClassName = css`
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  min-height: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    margin-inline-start: ${paddingStartSmall}px;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    padding: 0 var(--space-4);
    flex-direction: row;
  }

  @media only screen and (min-width: ${breakpoints.desktop}px) {
    margin-inline-start: ${paddingStartLarge}px;
  }
`;

const headerLogoStyles = css`
  display: none;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    display: flex;
    width: ${paddingStartSmall}px;
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    display: flex;
    width: ${paddingStartSmall}px;
  }

  @media only screen and (min-width: ${breakpoints.desktop}px) {
    width: ${paddingStartLarge}px;
  }
`;

const headerLogoInnerStyles = css`
  display: flex;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    display: none;
  }
`;

const pinStyles = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const FullscreenModal = memo(function FullscreenModal({
  focusTabIndexElements,
  logo,
  visible,
  onRequestClose,
  primaryContent,
  primaryContentClassName,
  secondaryContent,
  secondaryContentClassName,
  title,
  testID,
  zIndex,
  disablePortal,
  contentContainerClassName,
  hideDivider,
  showSecondaryContentDivider,
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

  const header = useMemo(
    () => (
      <HStack alignItems="center" borderedBottom={!hideDivider} paddingX={4} paddingY={2}>
        <Box className={headerLogoStyles} paddingEnd={3}>
          {logo ?? <LogoMark size={32} />}
        </Box>
        <Box flexGrow={1}>
          {title ? (
            <Text as="h1" font="title1" id={labelledBySource}>
              {title}
            </Text>
          ) : (
            <div className={headerLogoInnerStyles}>
              <LogoMark size={32} />
            </div>
          )}
          <Box flexGrow={1} justifyContent="flex-end">
            <IconButton
              transparent
              aria-label={closeAccessibilityLabel}
              name="close"
              onClick={onRequestClose}
            />
          </Box>
        </Box>
      </HStack>
    ),
    [closeAccessibilityLabel, hideDivider, labelledBySource, logo, onRequestClose, title],
  );

  const content = useMemo(
    () => (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      <div className={contentScrollContainer} tabIndex={0}>
        <div
          className={cx(contentClassName, contentContainerClassName)}
          style={contentStyle}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <div className={cx(primaryContentContainerStyles, primaryContentClassName)}>
            {primaryContent}
          </div>
          {!!secondaryContent && (
            <div
              className={cx(
                secondaryContentContainerStyles,
                showSecondaryContentDivider && secondaryContentDividerStyles,
                secondaryContentClassName,
              )}
            >
              {secondaryContent}
            </div>
          )}
        </div>
      </div>
    ),
    [
      contentStyle,
      contentContainerClassName,
      primaryContent,
      primaryContentClassName,
      secondaryContent,
      secondaryContentClassName,
      showSecondaryContentDivider,
    ],
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
            <VStack background="bg" className={containerStyles}>
              {header}
              {content}
            </VStack>
          </FocusTrap>
        </motion.div>
      </ModalWrapper>
    </OverlayContentContext.Provider>
  );
});

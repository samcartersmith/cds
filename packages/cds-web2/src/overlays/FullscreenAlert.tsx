import React, { memo, useMemo } from 'react';
import { css } from '@linaria/core';
import type { AlertActionsBaseProps, IllustrationHeroSquareNames } from '@cbhq/cds-common2';

import { Button } from '../buttons';
import { useA11yLabels } from '../hooks/useA11yLabels';
import { HeroSquare } from '../illustrations';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { breakpoints } from '../styles/media';
import { Text } from '../typography/Text';

import { FullscreenModal } from './modal/FullscreenModal';
import { ModalProps } from './modal/Modal';
import { ModalHeaderProps } from './modal/ModalHeader';
import { AlertProps } from './Alert';

export type FullscreenAlertProps = { heroSquare?: IllustrationHeroSquareNames } & Pick<
  AlertProps,
  'title' | 'body'
> &
  AlertActionsBaseProps &
  Pick<
    ModalProps,
    | 'visible'
    | 'onRequestClose'
    | 'disablePortal'
    | 'accessibilityLabel'
    | 'accessibilityLabelledBy'
    | 'testID'
  > &
  Pick<ModalHeaderProps, 'closeAccessibilityLabel'>;

const centerContentStyles = css`
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-inline-start: 0px;
`;

const actionsContainerStyles = css`
  gap: var(--space-3);
  flex-direction: column-reverse;
  width: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    flex-direction: row;
    width: auto;
  }
`;

const primaryContentStyles = css`
  height: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    height: auto;
  }
`;

export const FullscreenAlert = memo(function FullscreenAlert({
  visible,
  onRequestClose,
  title,
  body,
  heroSquare,
  preferredActionLabel,
  onPreferredActionPress,
  preferredActionVariant,
  dismissActionLabel,
  onDismissActionPress,
  disablePortal,
  accessibilityLabel,
  accessibilityLabelledBy,
  testID,
  closeAccessibilityLabel,
}: FullscreenAlertProps) {
  const { labelledBySource, labelledBy, label } = useA11yLabels({
    accessibilityLabelledBy,
    accessibilityLabel,
  });

  const primaryContent = useMemo(
    () => (
      <VStack alignItems="center" height="100%" justifyContent="space-between">
        <VStack alignItems="center" paddingBottom={4}>
          {!!heroSquare && <HeroSquare name={heroSquare} />}
          <Box paddingBottom={1} paddingTop={3}>
            <Text as="h3" font="title3" id={labelledBySource} textAlign="center">
              {title}
            </Text>
          </Box>
          <Text as="p" color="fgMuted" textAlign="center">
            {body}
          </Text>
        </VStack>
        <Box className={actionsContainerStyles}>
          {!!dismissActionLabel && (
            <Button onClick={onDismissActionPress} variant="secondary">
              {dismissActionLabel}
            </Button>
          )}
          <Button onClick={onPreferredActionPress} variant={preferredActionVariant}>
            {preferredActionLabel}
          </Button>
        </Box>
      </VStack>
    ),
    [
      body,
      dismissActionLabel,
      heroSquare,
      labelledBySource,
      onDismissActionPress,
      onPreferredActionPress,
      preferredActionLabel,
      preferredActionVariant,
      title,
    ],
  );

  return (
    <FullscreenModal
      hideDivider
      accessibilityLabel={label}
      accessibilityLabelledBy={labelledBy}
      closeAccessibilityLabel={closeAccessibilityLabel}
      contentContainerClassName={centerContentStyles}
      disablePortal={disablePortal}
      onRequestClose={onRequestClose}
      primaryContent={primaryContent}
      primaryContentClassName={primaryContentStyles}
      role="alertdialog"
      testID={testID}
      visible={visible}
    />
  );
});

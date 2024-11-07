import React, { memo } from 'react';
import { css } from 'linaria';
import type { AlertActionsBaseProps, IllustrationHeroSquareNames } from '@cbhq/cds-common';

import { Button } from '../buttons';
import { useA11yLabels } from '../hooks/useA11yLabels';
import { HeroSquare } from '../illustrations';
import { Box, VStack } from '../layout';
import { deviceBreakpoints } from '../layout/breakpoints';
import { spacing } from '../tokens';
import { TextBody, TextTitle3 } from '../typography';

import { FullscreenModal } from './Modal/FullscreenModal';
import { primaryContentContainerClassName } from './Modal/fullscreenModalStyles';
import { ModalProps } from './Modal/Modal';
import { ModalHeaderProps } from './Modal/ModalHeader';
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

export const actionsContainerClassName = 'fsa-actions-container';

export const centerContentClassName = css`
  && {
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-left: 0px;

    .${primaryContentContainerClassName} {
      height: 100%;
    }

    .${actionsContainerClassName} {
      gap: ${spacing[3]};
      flex-direction: column-reverse;
      width: 100%;
    }

    @media only screen and (min-width: ${deviceBreakpoints.phoneLandscape}px) {
      .${primaryContentContainerClassName} {
        height: auto;
      }

      .${actionsContainerClassName} {
        flex-direction: row;
        width: auto;
      }
    }
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

  const primaryContent = (
    <VStack alignItems="center" height="100%" justifyContent="space-between">
      <VStack alignItems="center" spacingBottom={4}>
        {!!heroSquare && <HeroSquare name={heroSquare} />}
        <Box spacingBottom={1} spacingTop={3}>
          <TextTitle3 align="center" as="h3" id={labelledBySource}>
            {title}
          </TextTitle3>
        </Box>
        <TextBody align="center" as="p" color="foregroundMuted">
          {body}
        </TextBody>
      </VStack>
      <Box className={actionsContainerClassName}>
        {!!dismissActionLabel && (
          <Button onPress={onDismissActionPress} variant="secondary">
            {dismissActionLabel}
          </Button>
        )}
        <Button onPress={onPreferredActionPress} variant={preferredActionVariant}>
          {preferredActionLabel}
        </Button>
      </Box>
    </VStack>
  );

  return (
    <FullscreenModal
      hideDivider
      accessibilityLabel={label}
      accessibilityLabelledBy={labelledBy}
      closeAccessibilityLabel={closeAccessibilityLabel}
      dangerouslySetContentClassName={centerContentClassName}
      disablePortal={disablePortal}
      onRequestClose={onRequestClose}
      primaryContent={primaryContent}
      role="alertdialog"
      testID={testID}
      visible={visible}
    />
  );
});

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
  >;

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
}: FullscreenAlertProps) {
  const { labelledBySource, labelledBy, label } = useA11yLabels({
    accessibilityLabelledBy,
    accessibilityLabel,
  });

  const primaryContent = (
    <VStack alignItems="center" height="100%" justifyContent="space-between">
      <VStack spacingBottom={4} alignItems="center">
        {!!heroSquare && <HeroSquare name={heroSquare} />}
        <Box spacingTop={3} spacingBottom={1}>
          <TextTitle3 id={labelledBySource} as="h3" align="center">
            {title}
          </TextTitle3>
        </Box>
        <TextBody as="p" color="foregroundMuted" align="center">
          {body}
        </TextBody>
      </VStack>
      <Box dangerouslySetClassName={actionsContainerClassName}>
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
      visible={visible}
      onRequestClose={onRequestClose}
      primaryContent={primaryContent}
      dangerouslySetContentClassName={centerContentClassName}
      hideDivider
      disablePortal={disablePortal}
      accessibilityLabel={label}
      accessibilityLabelledBy={labelledBy}
      testID={testID}
      role="alertdialog"
    />
  );
});

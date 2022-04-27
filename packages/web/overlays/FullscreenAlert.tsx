import React, { memo } from 'react';
import { css } from 'linaria';
import type { AlertActionsBaseProps, IllustrationHeroSquareNames } from '@cbhq/cds-common';

import { Button } from '../buttons';
import { HeroSquare } from '../illustrations';
import { Box, VStack } from '../layout';
import { spacing } from '../tokens';
import { TextBody, TextTitle3 } from '../typography';

import { FullscreenModal } from './Modal/FullscreenModal';
import { breakpoints, primaryContentContainerClassName } from './Modal/fullscreenModalStyles';
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

    @media only screen and (min-width: ${breakpoints.mobile}px) {
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
  const primaryContent = (
    <VStack alignItems="center" height="100%" justifyContent="space-between">
      <VStack spacingBottom={4} alignItems="center">
        {!!heroSquare && <HeroSquare name={heroSquare} />}
        <Box spacingTop={3} spacingBottom={1}>
          <TextTitle3 as="h3" align="center">
            {title}
          </TextTitle3>
        </Box>
        <TextBody as="p" color="foregroundMuted" align="center">
          {body}
        </TextBody>
      </VStack>
      <Box dangerouslySetClassName={actionsContainerClassName}>
        {!!dismissActionLabel && (
          // need to set minWidth to 0 to make actions equal width
          <Box flexGrow={1} flexBasis={0} minWidth={0}>
            <Button onPress={onDismissActionPress} block variant="secondary">
              {dismissActionLabel}
            </Button>
          </Box>
        )}
        <Box flexGrow={1} flexBasis={0} minWidth={0}>
          <Button onPress={onPreferredActionPress} block variant={preferredActionVariant}>
            {preferredActionLabel}
          </Button>
        </Box>
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
      accessibilityLabel={accessibilityLabel}
      accessibilityLabelledBy={accessibilityLabelledBy}
      testID={testID}
      role="alertdialog"
    />
  );
});

import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import type { AlertBaseProps, AlertRefBaseProps } from '@cbhq/cds-common';

import { Button } from '../buttons';
import { Pictogram } from '../illustrations';
import { Box, HStack, VStack } from '../layout';
import { TextBody, TextTitle3 } from '../typography';

import { Modal, ModalProps } from './Modal/Modal';
import { alertOverModalClassName } from './alertStyles';
import { Portal } from './Portal';
import { alertContainerId } from './PortalProvider';

export type AlertProps = {
  /**
   * Indicating if Alert is stacked on top of Modal
   */
  stacked?: boolean;
} & AlertBaseProps &
  Pick<ModalProps, 'disablePortal' | 'accessibilityLabel' | 'accessibilityLabelledBy'>;

export const Alert = memo(
  forwardRef<AlertRefBaseProps, AlertProps>(
    (
      {
        title,
        body,
        pictogram,
        visible = false,
        onRequestClose,
        preferredActionLabel,
        onPreferredActionPress,
        preferredActionVariant,
        dismissActionLabel,
        onDismissActionPress,
        disablePortal,
        testID,
        stacked,
        actionLayout = 'horizontal',
        ...props
      },
      ref,
    ) => {
      const isVerticalActions = actionLayout === 'vertical';

      const handlePreferredActionPress = useCallback(() => {
        onPreferredActionPress?.();
        onRequestClose?.();
      }, [onPreferredActionPress, onRequestClose]);

      const handleDismissActionPress = useCallback(() => {
        onDismissActionPress?.();
        onRequestClose?.();
      }, [onDismissActionPress, onRequestClose]);

      const ActionsContainer = isVerticalActions ? VStack : HStack;
      const actions = useMemo(
        () => [
          !!dismissActionLabel && (
            // need to set minWidth to 0 to make actions equal width
            <Box flexGrow={1} flexBasis={0} minWidth={0} key="dismiss">
              <Button onPress={handleDismissActionPress} block variant="secondary">
                {dismissActionLabel}
              </Button>
            </Box>
          ),
          <Box flexGrow={1} flexBasis={0} minWidth={0} key="preferred">
            <Button onPress={handlePreferredActionPress} block variant={preferredActionVariant}>
              {preferredActionLabel}
            </Button>
          </Box>,
        ],
        [
          dismissActionLabel,
          preferredActionLabel,
          handlePreferredActionPress,
          handleDismissActionPress,
          preferredActionVariant,
        ],
      );

      // display preferred action on top
      if (isVerticalActions) {
        actions.reverse();
      }

      return (
        <Portal containerId={alertContainerId} disablePortal={disablePortal}>
          <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            disablePortal
            hideDividers
            disableOverlayPress
            dangerouslySetWidth={318} // from design
            dangerouslyDisableResponsiveness
            dangerouslySetPosition={!stacked ? 'static' : undefined} // center alert vertically
            shouldCloseOnEscPress={!!dismissActionLabel} // disable esc close when no dismiss action
            dangerouslySetClassName={stacked ? alertOverModalClassName : undefined}
            testID={testID}
            ref={ref}
            role="alertdialog"
            {...props}
          >
            <Box
              spacingHorizontal={3}
              spacingTop={3}
              spacingBottom={1}
              flexDirection="column"
              alignItems="center"
            >
              {!!pictogram && (
                <Box spacingBottom={2}>
                  {/* fixed size: 120x120 */}
                  <Pictogram
                    name={pictogram}
                    dimension="48x48"
                    scaleMultiplier={2.5}
                    testID={testID && `${testID}-pictogram`}
                  />
                </Box>
              )}
              <TextTitle3 as="h3" spacingBottom={0.5} align="center">
                {title}
              </TextTitle3>
              <TextBody as="p" color="foregroundMuted" align="center">
                {body}
              </TextBody>
            </Box>
            <ActionsContainer spacingHorizontal={3} spacingVertical={2} gap={2}>
              {actions}
            </ActionsContainer>
          </Modal>
        </Portal>
      );
    },
  ),
);

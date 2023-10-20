import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import type { AlertBaseProps, AlertRefBaseProps } from '@cbhq/cds-common';

import { Button } from '../buttons';
import { useA11yLabels } from '../hooks/useA11yLabels';
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
        accessibilityLabelledBy,
        accessibilityLabel,
        ...props
      },
      ref,
    ) => {
      const { labelledBySource, labelledBy, label } = useA11yLabels({
        accessibilityLabelledBy,
        accessibilityLabel,
      });

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
            <Box key="dismiss" flexBasis={0} flexGrow={1} minWidth={0}>
              <Button block onPress={handleDismissActionPress} variant="secondary">
                {dismissActionLabel}
              </Button>
            </Box>
          ),
          <Box key="preferred" flexBasis={0} flexGrow={1} minWidth={0}>
            <Button block onPress={handlePreferredActionPress} variant={preferredActionVariant}>
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
            ref={ref}
            dangerouslyDisableResponsiveness
            disableOverlayPress
            disablePortal
            hideDividers
            accessibilityLabel={label}
            accessibilityLabelledBy={labelledBy}
            dangerouslySetClassName={stacked ? alertOverModalClassName : undefined}
            dangerouslySetPosition={!stacked ? 'static' : undefined} // center alert vertically
            dangerouslySetWidth={318} // from design
            onRequestClose={onRequestClose}
            role="alertdialog"
            shouldCloseOnEscPress={!!dismissActionLabel} // disable esc close when no dismiss action
            testID={testID}
            visible={visible}
            {...props}
          >
            <Box
              alignItems="center"
              flexDirection="column"
              spacingBottom={1}
              spacingHorizontal={3}
              spacingTop={3}
            >
              {!!pictogram && (
                <Box spacingBottom={2}>
                  {/* fixed size: 120x120 */}
                  <Pictogram
                    dimension="48x48"
                    name={pictogram}
                    scaleMultiplier={2.5}
                    testID={testID && `${testID}-pictogram`}
                  />
                </Box>
              )}
              <TextTitle3 align="center" as="h3" id={labelledBySource} spacingBottom={0.5}>
                {title}
              </TextTitle3>
              <TextBody align="center" as="p" color="foregroundMuted">
                {body}
              </TextBody>
            </Box>
            <ActionsContainer gap={2} spacingHorizontal={3} spacingVertical={2}>
              {actions}
            </ActionsContainer>
          </Modal>
        </Portal>
      );
    },
  ),
);

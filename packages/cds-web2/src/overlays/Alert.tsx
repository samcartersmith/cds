import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import type { AlertBaseProps, AlertRefBaseProps } from '@cbhq/cds-common2';

import { Button } from '../buttons';
import { useA11yLabels } from '../hooks/useA11yLabels';
import { Pictogram } from '../illustrations';
import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import { Modal, ModalProps } from './modal/Modal';
import { Portal } from './Portal';
import { alertContainerId } from './PortalProvider';

export type AlertProps = {
  /**
   * Indicating if Alert is stacked on top of Modal
   */
  stacked?: boolean;
} & AlertBaseProps &
  Pick<ModalProps, 'disablePortal' | 'accessibilityLabel' | 'accessibilityLabelledBy'>;

export const alertModalWidth = 318;

export const Alert = memo(
  forwardRef<AlertRefBaseProps, AlertProps>(
    (
      {
        title,
        body,
        pictogram,
        visible,
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

      const actions = useMemo(
        () => [
          !!dismissActionLabel && (
            // need to set minWidth to 0 to make actions equal width
            <Box key="dismiss" flexBasis={0} flexGrow={1} minWidth={0}>
              <Button block onClick={handleDismissActionPress} variant="secondary">
                {dismissActionLabel}
              </Button>
            </Box>
          ),
          <Box key="preferred" flexBasis={0} flexGrow={1} minWidth={0}>
            <Button block onClick={handlePreferredActionPress} variant={preferredActionVariant}>
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
            dangerouslySetPosition={!stacked ? 'static' : undefined} // center alert vertically
            onRequestClose={onRequestClose}
            role="alertdialog"
            shouldCloseOnEscPress={!!dismissActionLabel} // disable esc close when no dismiss action
            testID={testID}
            visible={visible}
            width={alertModalWidth}
            {...props}
          >
            <Box
              alignItems="center"
              flexDirection="column"
              paddingBottom={1}
              paddingTop={3}
              paddingX={3}
            >
              {!!pictogram && (
                <Box paddingBottom={2}>
                  {/* fixed size: 120x120 */}
                  <Pictogram
                    dimension="48x48"
                    name={pictogram}
                    scaleMultiplier={2.5}
                    testID={testID && `${testID}-pictogram`}
                  />
                </Box>
              )}
              <Text
                as="h3"
                font="title3"
                id={labelledBySource}
                paddingBottom={0.5}
                textAlign="center"
              >
                {title}
              </Text>
              <Text as="p" color="fgMuted" display="block" textAlign="center">
                {body}
              </Text>
            </Box>
            <Box
              flexDirection={isVerticalActions ? 'column' : 'row'}
              gap={2}
              paddingX={2}
              paddingY={3}
            >
              {actions}
            </Box>
          </Modal>
        </Portal>
      );
    },
  ),
);

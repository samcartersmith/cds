import React, {
  useCallback,
  useRef,
  MouseEvent,
  memo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { AlertBaseProps, AlertRefBaseProps, ModalRefBaseProps } from '@cbhq/cds-common';
import { createPortal } from 'react-dom';

import { Modal, ModalProps } from './Modal/Modal';
import { TextTitle3, TextBody } from '../typography';
import { alertContainerId } from './PortalProvider';
import { HStack, VStack, Box } from '../layout';
import { Pictogram } from '../illustrations';
import { Button } from '../buttons';
import { isSSR } from '../utils/browser';
import { alertOverModalClassName } from './alertStyles';

export type AlertProps = {
  /**
   * Indicating if Alert is stacked on top of Modal
   */
  stacked?: boolean;
} & AlertBaseProps &
  Pick<ModalProps, 'disablePortal' | 'accessibilityLabel' | 'accessibilityLabelledBy'>;

export const Alert = memo(
  forwardRef<AlertRefBaseProps, React.PropsWithChildren<AlertProps>>(
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
      const modalRef = useRef<ModalRefBaseProps>(null);
      const isVerticalActions = actionLayout === 'vertical';

      const handlePreferredActionPress = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          onPreferredActionPress();
          modalRef.current?.onRequestClose(event);
        },
        [onPreferredActionPress],
      );

      const handleDimissActionPress = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          onDismissActionPress?.();
          modalRef.current?.onRequestClose(event);
        },
        [onDismissActionPress],
      );

      useImperativeHandle(
        ref,
        () => ({
          onRequestClose: () => modalRef.current?.onRequestClose(),
        }),
        [],
      );

      const ActionsContainer = isVerticalActions ? VStack : HStack;
      const actions = [
        !!dismissActionLabel && (
          // need to set minWidth to 0 to make actions equal width
          <Box flexGrow={1} flexBasis={0} minWidth={0} key="dismiss">
            <Button onPress={handleDimissActionPress} block variant="secondary">
              {dismissActionLabel}
            </Button>
          </Box>
        ),
        <Box flexGrow={1} flexBasis={0} minWidth={0} key="preferred">
          <Button onPress={handlePreferredActionPress} block variant={preferredActionVariant}>
            {preferredActionLabel}
          </Button>
        </Box>,
      ];

      // display preferred action on top
      if (isVerticalActions) {
        actions.reverse();
      }

      const alertNode = (
        <Modal
          ref={modalRef}
          visible={visible}
          onRequestClose={onRequestClose}
          disablePortal
          hideDividers
          disableOverlayPress
          dangerouslySetWidth={318} // from design
          dangerouslyDisableResponsiveness
          dangerouslySetPosition={!stacked ? 'static' : undefined} // center alert vertically
          shouldCloseOnEscPress={!!dismissActionLabel} // disable esc close when no Dimiss action
          dangerouslySetClassName={stacked ? alertOverModalClassName : undefined}
          testID={testID}
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
                  dimension="96x96"
                  scaleMultiplier={1.25}
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
      );

      if (disablePortal || isSSR() || !document?.getElementById(alertContainerId)) {
        return alertNode;
      }

      return createPortal(alertNode, document.getElementById(alertContainerId) as HTMLElement);
    },
  ),
);

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
import { HStack, Box } from '../layout';
import { Pictogram } from '../illustrations';
import { Button } from '../buttons';
import { isSSR } from '../utils/browser';

export type AlertProps = AlertBaseProps &
  Pick<ModalProps, 'disablePortal' | 'accessibilityLabel' | 'accessibilityLabelledBy'>;

export const Alert: React.FC<AlertProps> = memo(
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
        disablePortal,
        testID,
        ...props
      },
      ref,
    ) => {
      const modalRef = useRef<ModalRefBaseProps>(null);

      const handlePreferredActionPress = useCallback(
        (event: MouseEvent<HTMLElement>) => {
          onPreferredActionPress();
          modalRef.current?.onRequestClose(event);
        },
        [onPreferredActionPress],
      );

      const handleDimissActionPress = useCallback((event: MouseEvent<HTMLElement>) => {
        modalRef.current?.onRequestClose(event);
      }, []);

      useImperativeHandle(
        ref,
        () => ({
          onRequestClose: () => modalRef.current?.onRequestClose(),
        }),
        [],
      );

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
          dangerouslySetPosition="static" // center alert vertically
          shouldCloseOnEscPress={!!dismissActionLabel} // disable esc close when no Dimiss action
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
          <HStack spacingHorizontal={3} spacingVertical={2} justifyContent="space-between" gap={2}>
            {!!dismissActionLabel && (
              // need to set minWidth to 0 to make actions equal width
              <Box flexGrow={1} flexBasis={0} minWidth={0}>
                <Button onPress={handleDimissActionPress} block variant="secondary">
                  {dismissActionLabel}
                </Button>
              </Box>
            )}
            <Box flexGrow={1} flexBasis={0} minWidth={0}>
              <Button onPress={handlePreferredActionPress} block variant={preferredActionVariant}>
                {preferredActionLabel}
              </Button>
            </Box>
          </HStack>
        </Modal>
      );

      if (disablePortal || isSSR() || !document?.getElementById(alertContainerId)) {
        return alertNode;
      }

      return createPortal(alertNode, document.getElementById(alertContainerId) as HTMLElement);
    },
  ),
);

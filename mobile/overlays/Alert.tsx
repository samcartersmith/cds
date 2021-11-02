import React, { memo, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal as RNModal } from 'react-native';
import type { AlertBaseProps, AlertRefBaseProps } from '@cbhq/cds-common';

import { TextTitle3, TextBody } from '../typography';
import { HStack, Box } from '../layout';
import { Pictogram } from '../illustrations';
import { Button } from '../buttons';
import { Overlay } from './Overlay/Overlay';
import { useAlertAnimation } from './useAlertAnimation';

export type AlertProps = AlertBaseProps;

export const Alert = memo(
  forwardRef<AlertRefBaseProps, React.PropsWithChildren<AlertProps>>(
    (
      {
        title,
        body,
        pictogramName,
        visible = false,
        onRequestClose,
        primaryActionTitle,
        primaryActionOnPress,
        secondaryActionTitle,
        secondaryActionOnPress,
        testID,
      },
      ref,
    ) => {
      const [{ modalOpacity, modalScale, overlayOpacity }, animateIn, animateOut] =
        useAlertAnimation();

      useEffect(() => {
        if (visible) {
          animateIn.start();
        }
      }, [visible, animateIn]);

      const handleClose = useCallback(() => {
        animateOut.start(({ finished }) => {
          if (finished) {
            onRequestClose?.();
          }
        });
      }, [onRequestClose, animateOut]);

      useImperativeHandle(
        ref,
        () => ({
          onRequestClose: handleClose,
        }),
        [handleClose],
      );

      const handlePrimaryActionPress = useCallback(() => {
        primaryActionOnPress();
        handleClose();
      }, [primaryActionOnPress, handleClose]);

      const handleSecondaryActionPress = useCallback(() => {
        secondaryActionOnPress?.();
        handleClose();
      }, [secondaryActionOnPress, handleClose]);

      return (
        <RNModal
          visible={visible}
          onRequestClose={handleClose}
          statusBarTranslucent
          hardwareAccelerated
          transparent
          animationType="none"
          testID={testID}
        >
          <Box pin="all" alignItems="center" justifyContent="center">
            <Overlay opacity={overlayOpacity} />
            <Box
              animated
              borderRadius="standard"
              width={318}
              dangerouslySetStyle={{
                transform: [{ scale: modalScale }],
                opacity: modalOpacity,
                borderWidth: 0,
              }}
              elevation={2}
            >
              <Box
                spacingHorizontal={3}
                spacingTop={3}
                spacingBottom={1}
                flexDirection="column"
                alignItems="center"
              >
                {!!pictogramName && (
                  <Box spacingBottom={2}>
                    {/* fixed size: 120x120 */}
                    <Pictogram
                      name={pictogramName}
                      dimension="96x96"
                      scaleMultiplier={1.25}
                      testID={testID && `${testID}-pictogram`}
                    />
                  </Box>
                )}
                <TextTitle3 spacingBottom={0.5}>{title}</TextTitle3>
                <TextBody color="foregroundMuted" align="center">
                  {body}
                </TextBody>
              </Box>
              <HStack
                spacingHorizontal={3}
                spacingVertical={2}
                justifyContent="space-between"
                gap={2}
              >
                {!!secondaryActionTitle && !!secondaryActionOnPress && (
                  <Box flexGrow={1} flexBasis={0}>
                    <Button onPress={handleSecondaryActionPress} block variant="secondary">
                      {secondaryActionTitle}
                    </Button>
                  </Box>
                )}
                <Box flexGrow={1} flexBasis={0}>
                  <Button onPress={handlePrimaryActionPress} block>
                    {primaryActionTitle}
                  </Button>
                </Box>
              </HStack>
            </Box>
          </Box>
        </RNModal>
      );
    },
  ),
);

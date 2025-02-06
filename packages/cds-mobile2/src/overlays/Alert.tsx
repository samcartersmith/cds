import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle } from 'react';
import { Modal as RNModal } from 'react-native';
import type { AlertBaseProps, AlertRefBaseProps } from '@cbhq/cds-common2';

import { Button } from '../buttons';
import { Pictogram } from '../illustrations';
import { Box, HStack, VStack } from '../layout';
import { TextBody, TextTitle3 } from '../typography';

import { Overlay } from './overlay/Overlay';
import { useAlertAnimation } from './useAlertAnimation';

export type AlertProps = AlertBaseProps;

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
        testID,
        actionLayout = 'horizontal',
      },
      ref,
    ) => {
      const [{ modalOpacity, modalScale, overlayOpacity }, animateIn, animateOut] =
        useAlertAnimation();
      const isVerticalActions = actionLayout === 'vertical';

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
        onPreferredActionPress?.();
        handleClose();
      }, [onPreferredActionPress, handleClose]);

      const handleSecondaryActionPress = useCallback(() => {
        onDismissActionPress?.();
        handleClose();
      }, [onDismissActionPress, handleClose]);

      const ActionsContainer = isVerticalActions ? VStack : HStack;
      const actionFlexBasis = isVerticalActions ? undefined : 0;
      const actions = [
        !!dismissActionLabel && (
          <Box key="dismiss" flexBasis={actionFlexBasis} flexGrow={1}>
            <Button block onPress={handleSecondaryActionPress} variant="secondary">
              {dismissActionLabel}
            </Button>
          </Box>
        ),
        <Box key="preferred" flexBasis={actionFlexBasis} flexGrow={1}>
          <Button block onPress={handlePrimaryActionPress} variant={preferredActionVariant}>
            {preferredActionLabel}
          </Button>
        </Box>,
      ];

      // display preferred action on top
      if (isVerticalActions) {
        actions.reverse();
      }

      return (
        <RNModal
          hardwareAccelerated
          statusBarTranslucent
          transparent
          animationType="none"
          onRequestClose={handleClose}
          testID={testID}
          visible={visible}
        >
          <Box alignItems="center" justifyContent="center" pin="all">
            <Overlay opacity={overlayOpacity} />
            <Box
              animated
              borderRadius={200}
              elevation={2}
              style={{
                transform: [{ scale: modalScale }],
                opacity: modalOpacity,
                borderWidth: 0,
              }}
              width={318}
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
                <TextTitle3 align="center" paddingBottom={0.5}>
                  {title}
                </TextTitle3>
                <TextBody align="center" color="fgMuted">
                  {body}
                </TextBody>
              </Box>
              <ActionsContainer gap={2} paddingX={3} paddingY={2}>
                {actions}
              </ActionsContainer>
            </Box>
          </Box>
        </RNModal>
      );
    },
  ),
);

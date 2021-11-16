import React, { memo, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal as RNModal } from 'react-native';
import type { AlertBaseProps, AlertRefBaseProps } from '@cbhq/cds-common';

import { TextTitle3, TextBody } from '../typography';
import { HStack, VStack, Box } from '../layout';
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
        onPreferredActionPress();
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
          <Box flexGrow={1} flexBasis={actionFlexBasis} key="dismiss">
            <Button onPress={handleSecondaryActionPress} block variant="secondary">
              {dismissActionLabel}
            </Button>
          </Box>
        ),
        <Box flexGrow={1} flexBasis={actionFlexBasis} key="preferred">
          <Button onPress={handlePrimaryActionPress} block variant={preferredActionVariant}>
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
                <TextTitle3 spacingBottom={0.5}>{title}</TextTitle3>
                <TextBody color="foregroundMuted" align="center">
                  {body}
                </TextBody>
              </Box>
              <ActionsContainer spacingHorizontal={3} spacingVertical={2} gap={2}>
                {actions}
              </ActionsContainer>
            </Box>
          </Box>
        </RNModal>
      );
    },
  ),
);

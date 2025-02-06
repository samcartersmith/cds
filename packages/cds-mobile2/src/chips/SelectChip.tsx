import React, { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { animateCaretInConfig, animateCaretOutConfig } from '@cbhq/cds-common2/animation/select';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import { DrawerRefBaseProps, SelectBaseProps, TrayBaseProps } from '@cbhq/cds-common2/types';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { SelectProvider } from '../controls/SelectContext';
import { useSelect } from '../controls/useSelect';
import { useA11y } from '../hooks/useA11y';
import { Icon } from '../icons';
import { Tray } from '../overlays';

import { Chip } from './Chip';
import { ChipProps } from './ChipProps';

export type SelectChipProps = {
  children: NonNullable<React.ReactNode>;
  /** Indicates that the control is being used to manipulate data elsewhere */
  active?: boolean;
} & Omit<ChipProps, 'children' | 'onBlur'> &
  Pick<SelectBaseProps, 'onChange' | 'valueLabel' | 'placeholder' | 'value'> &
  Omit<TrayBaseProps, 'onCloseComplete' | 'children'>;

export const SelectChip = memo(
  forwardRef(
    (
      {
        children,
        value: defaultValue,
        valueLabel,
        placeholder,
        disabled,
        accessibilityLabel,
        onPress,
        end,
        onChange,
        onBlur,
        testID = 'select-chip',
        // tray props
        preventDismissGestures,
        hideHandleBar,
        disableCapturePanGestureToDismiss,
        verticalDrawerPercentageOfView,
        handleBarAccessibilityLabel,
        active,
        ...props
      }: SelectChipProps,
      ref: React.ForwardedRef<View>,
    ) => {
      const [isSelectTrayOpen, { toggleOn: handleOpen, toggleOff: handleClose }] =
        useToggler(false);
      const { animateRotateIn, animateRotateOut, rotateAnimationStyles } = useRotateAnimation(
        animateCaretInConfig,
        animateCaretOutConfig,
        180,
      );
      const { setA11yFocus, announceForA11y } = useA11y();

      const trayRef = useRef<DrawerRefBaseProps>(null);
      const internalRef = useRef(null);
      const refs = useMergeRefs(ref, internalRef);

      const handleCloseTray = useCallback(() => {
        trayRef.current?.handleClose();
        animateRotateOut.start();
      }, [animateRotateOut]);

      const handleBlurTray = useCallback(() => {
        handleCloseTray();
        onBlur?.();
      }, [handleCloseTray, onBlur]);

      const context = useSelect({
        value: defaultValue,
        onChange,
        handleClose: handleCloseTray,
      });
      const { value } = context;

      const handleA11y = useCallback(() => {
        // bring a11y focus back to the trigger
        setA11yFocus(internalRef);
        // announce select value to screen reader
        announceForA11y(`${value} selected`);
      }, [value, announceForA11y, setA11yFocus]);

      useEffect(() => {
        handleA11y();
      }, [handleA11y, value]);

      const handleChipPress = useCallback(
        (event: GestureResponderEvent) => {
          onPress?.(event);
          handleOpen();
          animateRotateIn.start();
        },
        [animateRotateIn, handleOpen, onPress],
      );

      const onCloseComplete = useCallback(() => {
        handleClose();
        // bring a11y focus back to the trigger
        setA11yFocus(internalRef);
        // announce select value to screen reader
        announceForA11y(`${value} selected`);
      }, [announceForA11y, handleClose, setA11yFocus, value]);

      return (
        <SelectProvider value={context}>
          <Chip
            ref={refs}
            accessibilityLabel={accessibilityLabel ?? value}
            accessibilityRole="menu"
            accessibilityState={{ disabled }}
            disabled={disabled}
            end={
              end ?? (
                <Icon animated color="fg" name="caretDown" size="s" style={rotateAnimationStyles} />
              )
            }
            inverted={active}
            onPress={handleChipPress}
            testID={testID}
            {...props}
          >
            {valueLabel ?? value ?? placeholder}
          </Chip>
          {isSelectTrayOpen && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss={disableCapturePanGestureToDismiss}
              handleBarAccessibilityLabel={handleBarAccessibilityLabel}
              hideHandleBar={hideHandleBar}
              onBlur={handleBlurTray}
              onCloseComplete={onCloseComplete}
              preventDismissGestures={preventDismissGestures}
              testID={`${testID}-tray`}
              verticalDrawerPercentageOfView={verticalDrawerPercentageOfView}
            >
              {children}
            </Tray>
          )}
        </SelectProvider>
      );
    },
  ),
);

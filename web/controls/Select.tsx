import React, {
  useEffect,
  useRef,
  memo,
  useMemo,
  forwardRef,
  ForwardedRef,
  useCallback,
  ReactElement,
  MouseEvent,
} from 'react';
import { SelectBaseProps, PopoverMenuRefProps, InputVariant } from '@cbhq/cds-common/types';
import { useToggler } from '@cbhq/cds-common';
import { LinkableProps } from '../system';
import { useRotate180Animation } from '../animation/useRotate180Animation';
import { SelectTrigger } from './SelectTrigger';
import { PopoverMenu } from '../overlays/PopoverMenu';
import { MenuItemProps } from '../overlays/MenuItem';

export type SelectProps = {
  children: ReactElement<MenuItemProps & LinkableProps>[];
  /** Callback that is fired whenever a select option is selected */
  onChange?: (newValue: string) => void;
} & SelectBaseProps;

export const Select = memo(
  forwardRef(function Select(
    {
      children,
      helperText,
      value,
      variant = 'foregroundMuted',
      disabled = false,
      width = '100%',
      compact,
      onPress,
      onChange,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const [visible, togglePopoverMenuVisibility] = useToggler(false);
    const { rotateAnimationRef, animateCaretIn, animateCaretOut } = useRotate180Animation();
    const popoverMenuRef = useRef<PopoverMenuRefProps>(null);
    const defaultTriggerRef = useRef<HTMLButtonElement | null>(null);
    const triggerRef =
      (ref as React.MutableRefObject<HTMLButtonElement | null>) ?? defaultTriggerRef;

    // this corrects for when value is initialized with an empty string, coerce it to undefined
    const sanitizedValue = value === '' ? undefined : value;
    const labelTextColor: InputVariant = 'foregroundMuted';
    const menuOffsetConfig = useMemo(() => {
      return {
        helperText: !!helperText,
        compact: !!compact,
      };
    }, [helperText, compact]);

    // toggle focus animations for InputStack and caret whether menu is open or not
    useEffect(() => {
      if (visible) {
        void animateCaretIn();
      } else {
        void animateCaretOut();
      }
    }, [animateCaretIn, animateCaretOut, visible]);

    const handleOnSelectPress = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        onPress?.();
        popoverMenuRef.current?.handleOnPopoverMenuTriggerPress(event);
      },
      [onPress],
    );

    const renderTriggerNode = useCallback(() => {
      return (
        <SelectTrigger
          compact={compact}
          disabled={disabled}
          helperText={helperText}
          rotateAnimationRef={rotateAnimationRef}
          value={sanitizedValue}
          variant={variant}
          width={width}
          ref={ref}
          onSelectPress={handleOnSelectPress}
          triggerRef={triggerRef}
          labelTextColor={labelTextColor}
          {...props}
        />
      );
    }, [
      compact,
      disabled,
      rotateAnimationRef,
      sanitizedValue,
      variant,
      width,
      ref,
      helperText,
      handleOnSelectPress,
      triggerRef,
      props,
    ]);

    return (
      <PopoverMenu
        value={value}
        offsetConfig={menuOffsetConfig}
        onChange={onChange}
        width={width}
        visible={visible}
        openMenu={togglePopoverMenuVisibility.toggleOn}
        closeMenu={togglePopoverMenuVisibility.toggleOff}
        triggerNode={renderTriggerNode}
        ref={popoverMenuRef}
        customTriggerRef={triggerRef}
      >
        {children}
      </PopoverMenu>
    );
  }),
);

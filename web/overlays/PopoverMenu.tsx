import React, {
  cloneElement,
  forwardRef,
  useState,
  memo,
  useRef,
  useCallback,
  useEffect,
  ReactElement,
  KeyboardEvent,
  FocusEvent,
  useImperativeHandle,
} from 'react';
import { menuGutter, selectKeys, popoverMenuMaxHeight } from '@cbhq/cds-common/tokens/menu';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { ElementChildren, PopoverMenuBaseProps, PopoverMenuRefProps } from '@cbhq/cds-common/types';
import { inputStackHelperTextHeight } from '@cbhq/cds-common/tokens/select';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { useAccessibleControlledVisibility } from '@cbhq/cds-common/hooks/useAccessibleControlledVisibility';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { usePopover } from './usePopover';
import { VStack, HStack } from '../layout';
import { SelectOption, SelectOptionProps } from '../controls/SelectOption';

export type PopoverMenuProps = {
  children: ElementChildren<SelectOptionProps> | HTMLElement;
} & PopoverMenuBaseProps;

export const PopoverMenu = memo(
  forwardRef<PopoverMenuRefProps, PopoverMenuProps>(
    (
      {
        children,
        triggerNode,
        onPress,
        disabled = false,
        offsetConfig,
        onChange,
        value,
        width,
        maxHeight = popoverMenuMaxHeight,
        openMenu,
        closeMenu,
        visible,
        accessibilityLabel,
        customTriggerRef,
        onBlur,
        ...props
      },
      ref,
    ) => {
      const [focused, toggleFocused] = useToggler(false);

      // TODO: These are necessary callback refs to make PopperJS work. They are causing double renders, will be looking at another third party solution in separate PR
      const [triggerDOMNode, setTriggerDOMNode] = useState<HTMLElement | null>(null);
      const [popoverMenuDOMNode, setPopoverMenuDOMNode] = useState<HTMLDivElement | null>(null);

      // there are some custom styles and behaviors that need to happen when the trigger is a Select
      // this is a way of inferring it through the use of an internal only prop customTriggerRef
      const hasSelectTrigger = !!customTriggerRef?.current;

      const selectOptionRef = useRef<HTMLElement | null>(null);
      const popoverMenuRef = useRef<HTMLElement | null>(null);
      const defaultTriggerRef = useRef<HTMLButtonElement | null>(null);
      const triggerRef = customTriggerRef?.current ?? defaultTriggerRef.current;

      // this corrects for when value is initialized with an empty string, coerce it to undefined
      const sanitizedValue = value === '' ? undefined : value;

      // used to generate unique aria labels and attributes
      const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
        useAccessibleControlledVisibility(visible, accessibilityLabel);

      // When PopoverMenu is used with a Select as a trigger, we need to calculate PopoverMenu offset based on presence of nodes in the Select
      const labelHeight = useScaleConditional(inputStackHelperTextHeight);

      // if used in a select menu and there is helper text, you need to shave off the height of the helper text before you add the gutter
      const popperYOffset = offsetConfig?.helperText ? menuGutter - labelHeight : menuGutter;

      const { popperStyles, popperAttributes } = usePopover(
        triggerDOMNode,
        popoverMenuDOMNode,
        popperYOffset,
      );

      // when Popover is used with a Select, the width should be that of the parent,
      // else it should be the width of the content or what's passed in explicitly
      const calculatePopoverWidth = hasSelectTrigger ? width ?? '100%' : 'auto';
      const calculateTriggerWidth = hasSelectTrigger ? '100%' : 'auto';

      // when menu is opened, focuses already selected option or first option
      useEffect(() => {
        if (visible) {
          if (selectOptionRef.current) {
            selectOptionRef.current.focus();
          } else if (popoverMenuRef.current) {
            const selectOptions = popoverMenuRef.current?.querySelectorAll('[role="menuitem"]');
            (selectOptions[0] as HTMLButtonElement).focus();
          }
        }
      }, [popoverMenuRef, visible]);

      const togglePopoverMenuVisibility = useCallback(() => {
        if (visible) {
          closeMenu();
        } else {
          openMenu();
        }
      }, [visible, closeMenu, openMenu]);

      const handleExitMenu = useCallback(() => {
        closeMenu?.();
        triggerRef?.focus();
      }, [closeMenu, triggerRef]);

      const handleOptionChange = useCallback(
        (newValue: string) => {
          onChange?.(newValue);
          // this is a hack for Safari to prevent blur from being called on option click
          selectOptionRef.current?.focus();
          handleExitMenu();
        },
        [onChange, handleExitMenu],
      );

      const handlePopoverMenuBlur = useCallback(
        (event: FocusEvent<HTMLButtonElement>) => {
          const eventIsBlur = event?.type === 'blur';
          const isOptionFocused = popoverMenuRef.current?.contains(
            event.relatedTarget as Node | null,
          );
          const isTriggerFocused = triggerRef === event.relatedTarget;
          if (isTriggerFocused) {
            return;
          }
          if (eventIsBlur && !isOptionFocused) {
            closeMenu();
            toggleFocused.toggleOff();
            onBlur?.();
          }
        },
        [closeMenu, toggleFocused, popoverMenuRef, onBlur, triggerRef],
      );

      const handleOnPopoverMenuTriggerPress = useCallback(() => {
        onPress?.();
        togglePopoverMenuVisibility();
      }, [onPress, togglePopoverMenuVisibility]);

      const handleOnPopoverMenuTriggerKeyDown = useCallback(
        (event: KeyboardEvent<HTMLElement>) => {
          if (['ArrowUp', 'ArrowDown', ...selectKeys].includes(event.key)) {
            event.preventDefault();
            togglePopoverMenuVisibility();
          } else if (event.key === 'Tab') {
            toggleFocused.toggleOff();
          }
        },
        [toggleFocused, togglePopoverMenuVisibility],
      );

      const renderMenuItem = useCallback(
        (child: ReactElement<SelectOptionProps>) => {
          return cloneElement(child, {
            selected: child.props.value === value,
            ref: child.props.value === value ? selectOptionRef : undefined,
            onChange: handleOptionChange,
            popoverMenuRef,
            hideMenu: handleExitMenu,
            onBlur: handlePopoverMenuBlur,
          });
        },
        [value, handleOptionChange, handleExitMenu, handlePopoverMenuBlur],
      );

      const renderPopoverMenuTrigger = useCallback(
        (child: ReactElement) => {
          return cloneElement(child, {
            onPress: handleOnPopoverMenuTriggerPress,
            onKeyDown: handleOnPopoverMenuTriggerKeyDown,
            disabled,
            ref: defaultTriggerRef,
            value: sanitizedValue,
            focused: focused.toString(),
            ...triggerAccessibilityProps,
          });
        },
        [
          handleOnPopoverMenuTriggerKeyDown,
          handleOnPopoverMenuTriggerPress,
          disabled,
          sanitizedValue,
          focused,
          triggerAccessibilityProps,
          defaultTriggerRef,
        ],
      );

      useImperativeHandle(
        ref,
        () => ({
          handleOnPopoverMenuTriggerPress,
        }),
        [handleOnPopoverMenuTriggerPress],
      );

      return (
        <HStack position="relative" width={width === '100%' ? width : 'auto'} {...props}>
          <HStack width={calculateTriggerWidth} ref={setTriggerDOMNode}>
            {renderPopoverMenuTrigger(triggerNode())}
          </HStack>
          {visible && (
            <div
              ref={setPopoverMenuDOMNode}
              {...popperAttributes.popper}
              style={{
                ...popperStyles.popper,
                width: calculatePopoverWidth,
                zIndex: zIndex.overlays.popoverMenu,
              }}
            >
              <VStack
                ref={popoverMenuRef}
                {...controlledElementAccessibilityProps}
                overflow="scroll"
                background
                elevation={2}
                width={width ?? '100%'}
                borderRadius="popover"
                role="menu"
                maxHeight={maxHeight}
              >
                {flattenNodes(children).map((child) => {
                  if (child && typeof child === 'object' && child.type === SelectOption) {
                    return renderMenuItem(child as ReactElement<SelectOptionProps>);
                  }

                  return child;
                })}
              </VStack>
            </div>
          )}
        </HStack>
      );
    },
  ),
);

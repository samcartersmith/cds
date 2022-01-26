import React, {
  cloneElement,
  useCallback,
  ReactElement,
  KeyboardEvent,
  MutableRefObject,
  RefAttributes,
} from 'react';
import { NoopFn } from '@cbhq/cds-common/types';
import { selectKeys } from '@cbhq/cds-common/tokens/menu';
import { usePopoverContext } from './PopoverContext';
import { HStack } from '../../layout/HStack';
import { AccessibleControlledReturnType } from '../../hooks/useA11yControlledVisibility';

export type PopoverTriggerHOCProps = {
  children: ReactElement;
  /**
   * Optional callback that will be fired when the trigger is pressed
   */
  onPress?: NoopFn;
};

export type PopoverTriggerProps = {
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  onPress?: NoopFn;
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  disabled?: boolean;
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  ref?: MutableRefObject<HTMLButtonElement | null>;
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  value?: string;
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  focused?: string;
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  triggerAccessibilityProps?: Pick<AccessibleControlledReturnType, 'triggerAccessibilityProps'>;
  /**
   * Direct child must be an interatable component that accepts a ForwardedRef
   * @link https://reactjs.org/docs/forwarding-refs.html
   */
  children: RefAttributes<HTMLButtonElement>;
};

export const PopoverTrigger = ({ children, onPress }: PopoverTriggerHOCProps) => {
  const {
    togglePopoverMenuVisibility,
    disabled,
    triggerRef,
    sanitizedValue,
    triggerAccessibilityProps,
    setTrigger,
    flush,
    onBlur,
  } = usePopoverContext();

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
        onBlur?.();
      }
    },
    [togglePopoverMenuVisibility, onBlur],
  );

  const renderPopoverMenuTrigger = useCallback(
    (child: ReactElement<PopoverTriggerProps>) => {
      return cloneElement(child, {
        onPress: handleOnPopoverMenuTriggerPress,
        onKeyDown: handleOnPopoverMenuTriggerKeyDown,
        disabled,
        ref: triggerRef,
        value: sanitizedValue,
        ...triggerAccessibilityProps,
      });
    },
    [
      handleOnPopoverMenuTriggerKeyDown,
      handleOnPopoverMenuTriggerPress,
      disabled,
      sanitizedValue,
      triggerAccessibilityProps,
      triggerRef,
    ],
  );

  return (
    <HStack width={flush ? '100%' : 'auto'} ref={setTrigger}>
      {renderPopoverMenuTrigger(children as ReactElement<PopoverTriggerProps>)}
    </HStack>
  );
};

import React, {
  cloneElement,
  KeyboardEvent,
  memo,
  MutableRefObject,
  ReactElement,
  RefAttributes,
  useCallback,
} from 'react';
import { selectKeys } from '@cbhq/cds-common/tokens/menu';
import { NoopFn } from '@cbhq/cds-common/types';

import { SearchInputProps } from '../../controls/SearchInput';
import { AccessibleControlledReturnType } from '../../hooks/useA11yControlledVisibility';
import { HStack } from '../../layout/HStack';

import { usePopoverContext } from './PopoverContext';

/** @deprecated */
export type PopoverTriggerHOCProps = {
  children: ReactElement;
  /**
   * Optional callback that will be fired when the trigger is pressed
   */
  onPress?: NoopFn;
};

/** @deprecated */
export type ClonedPopoverTriggerRef = {
  /**
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() when rendering the PopoverTrigger
   */
  ref: MutableRefObject<HTMLButtonElement | null>;
};

/** @deprecated */
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
} & ClonedPopoverTriggerRef;

/**
 * @deprecated PopoverMenu has been deprecated. Please use Dropdown instead.
 */
/** @deprecated */
export const PopoverTrigger = memo(function PopoverTrigger({
  children,
  onPress,
}: PopoverTriggerHOCProps) {
  const {
    togglePopoverMenuVisibility,
    disabled,
    triggerRef,
    sanitizedValue,
    triggerAccessibilityProps,
    setTrigger,
    flush,
    onBlur,
    searchEnabled,
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
        ...child.props,
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

  const renderSearchInputTrigger = useCallback(
    (child: ReactElement<SearchInputProps & ClonedPopoverTriggerRef>) => {
      return cloneElement(child, {
        ...child.props,
        ref: triggerRef,
        disabled,
      });
    },
    [triggerRef, disabled],
  );

  return (
    <HStack width={flush ? '100%' : 'auto'} ref={setTrigger}>
      {searchEnabled
        ? renderSearchInputTrigger(
            children as ReactElement<SearchInputProps & ClonedPopoverTriggerRef>,
          )
        : renderPopoverMenuTrigger(children as ReactElement<PopoverTriggerProps>)}
    </HStack>
  );
});

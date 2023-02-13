import { FocusEvent, useCallback, useMemo, useRef, useState } from 'react';
import { NoopFn, PopoverMenuBaseProps } from '@cbhq/cds-common';

import { Animated } from '../../animation/Animated';
import { useA11yControlledVisibility } from '../../hooks/useA11yControlledVisibility';

import { usePopoverMenuAnimation } from './usePopoverMenuAnimation';

/**
 * @deprecated
 * This hook stores all the shared logic between all the PopoverMenu sub components: PopoverTrigger, SelectOption, and PopoverMenu
 * */
export const usePopoverMenu = ({
  onChange,
  value,
  width: customWidth,
  visible,
  disabled = false,
  openMenu,
  closeMenu,
  accessibilityLabel,
  onBlur,
  minWidth,
  maxWidth,
  popoverPositionConfig,
  searchEnabled,
  ...props
}: Omit<PopoverMenuBaseProps, 'children'>) => {
  // TODO: These are necessary callback refs to make PopperJS work. They are causing double renders, will be looking at another third party solution in separate PR
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  const selectOptionRef = useRef<HTMLElement | null>(null);
  const popoverMenuRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // this corrects for when value is initialized with an empty string, coerce it to undefined
  const sanitizedValue = value === '' ? undefined : value;

  // used to generate unique aria labels and attributes
  const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
    useA11yControlledVisibility(visible, { accessibilityLabel });

  // if a min or max width is declared, we don't want to instantiate width with the default of 100%
  const width = minWidth || maxWidth ? undefined : customWidth ?? '100%';

  const { animatePopoverOverlayOut, animatePopoverTranslateOut } = usePopoverMenuAnimation(
    visible,
    popoverMenuRef,
    popoverPositionConfig,
  );

  const animateOutAndCloseMenu = useCallback(
    async (cb?: NoopFn) => {
      await Animated.parallel([animatePopoverOverlayOut, animatePopoverTranslateOut]).start(
        ({ finished }) => {
          if (finished) {
            closeMenu();
            cb?.();
          }
        },
      );
    },
    [closeMenu, animatePopoverOverlayOut, animatePopoverTranslateOut],
  );

  const togglePopoverMenuVisibility = useCallback(() => {
    if (visible) {
      void animateOutAndCloseMenu();
    } else {
      openMenu();
    }
  }, [visible, openMenu, animateOutAndCloseMenu]);

  const handleExitMenu = useCallback(() => {
    void animateOutAndCloseMenu();
    triggerRef.current?.focus();
  }, [triggerRef, animateOutAndCloseMenu]);

  const handlePopoverMenuBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      const eventIsBlur = event?.type === 'blur';
      const isOptionFocused = popoverMenuRef.current?.contains(event.relatedTarget as Node | null);
      const isTriggerFocused = triggerRef.current === event.relatedTarget;
      // if user clicked the trigger, do nothing
      if (isTriggerFocused) {
        return;
      }
      if (eventIsBlur && !isOptionFocused) {
        void animateOutAndCloseMenu(onBlur);
      }
    },
    [popoverMenuRef, onBlur, triggerRef, animateOutAndCloseMenu],
  );

  return useMemo(
    () => ({
      // refs
      triggerRef,
      selectOptionRef,
      popoverMenuRef,
      // props
      disabled,
      sanitizedValue,
      width,
      minWidth,
      maxWidth,
      visible,
      popoverPositionConfig,
      searchEnabled,
      // state
      setTrigger,
      setPopper,
      togglePopoverMenuVisibility,
      trigger,
      popper,
      // shared a11y
      controlledElementAccessibilityProps,
      triggerAccessibilityProps,
      // shared event handlers
      handleExitMenu,
      handlePopoverMenuBlur,
      onChange,
      onBlur,
      openMenu,
      ...props,
    }),
    [
      triggerRef,
      selectOptionRef,
      popoverMenuRef,
      disabled,
      sanitizedValue,
      width,
      minWidth,
      maxWidth,
      visible,
      popoverPositionConfig,
      searchEnabled,
      setTrigger,
      setPopper,
      togglePopoverMenuVisibility,
      trigger,
      popper,
      controlledElementAccessibilityProps,
      triggerAccessibilityProps,
      handleExitMenu,
      handlePopoverMenuBlur,
      onChange,
      onBlur,
      openMenu,
      props,
    ],
  );
};

/** @deprecated */
export type PopoverContextType = ReturnType<typeof usePopoverMenu>;

import { PopoverMenuBaseProps } from '@cbhq/cds-common';
import { useRef, useState, useEffect, useCallback, useMemo, FocusEvent } from 'react';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { menuGutter } from '@cbhq/cds-common/tokens/menu';
import { useA11yControlledVisibility } from '../../hooks/useA11yControlledVisibility';
import { usePopoverPosition } from './usePopoverPosition';

/** this hook stores all the shared logic between all the PopoverMenu sub components: PopoverTrigger, MenuItem, SelectOption, and PopoverMenu */
export const usePopoverMenu = ({
  onChange,
  value,
  width = '100%',
  visible,
  disabled = false,
  openMenu,
  closeMenu,
  accessibilityLabel,
  onBlur,
  flush,
}: PopoverMenuBaseProps) => {
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
    useA11yControlledVisibility(visible, accessibilityLabel);

  const { popperStyles, popperAttributes } = usePopoverPosition(trigger, popper, menuGutter);

  const convertedWidth = typeof width === 'number' ? `${width}px` : width;

  const popoverStyles: React.CSSProperties = useMemo(
    () => ({
      ...popperStyles.popper,
      width: convertedWidth,
      zIndex: zIndex.overlays.popoverMenu,
    }),
    [popperStyles, convertedWidth],
  );

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
    triggerRef.current?.focus();
  }, [closeMenu, triggerRef]);

  const handlePopoverMenuBlur = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      const eventIsBlur = event?.type === 'blur';
      const isOptionFocused = popoverMenuRef.current?.contains(event.relatedTarget as Node | null);
      const isTriggerFocused = triggerRef.current === event.relatedTarget;
      // if user clicked the trigger, do nothing
      if (isTriggerFocused) {
        return;
      }
      if (eventIsBlur && !isOptionFocused) {
        closeMenu();
        onBlur?.();
      }
    },
    [closeMenu, popoverMenuRef, onBlur, triggerRef],
  );

  return useMemo(
    () => ({
      disabled,
      triggerRef,
      sanitizedValue,
      controlledElementAccessibilityProps,
      triggerAccessibilityProps,
      width,
      setTrigger,
      selectOptionRef,
      onChange,
      popoverMenuRef,
      handleExitMenu,
      handlePopoverMenuBlur,
      setPopper,
      popperAttributes,
      popoverStyles,
      flush,
      togglePopoverMenuVisibility,
      onBlur,
    }),
    [
      disabled,
      triggerRef,
      sanitizedValue,
      triggerAccessibilityProps,
      width,
      setTrigger,
      selectOptionRef,
      onChange,
      popoverMenuRef,
      handleExitMenu,
      handlePopoverMenuBlur,
      setPopper,
      popperAttributes,
      popoverStyles,
      controlledElementAccessibilityProps,
      flush,
      togglePopoverMenuVisibility,
      onBlur,
    ],
  );
};

export type PopoverContextType = ReturnType<typeof usePopoverMenu>;

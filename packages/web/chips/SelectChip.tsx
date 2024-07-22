import React, { forwardRef, memo, ReactNode, useCallback, useMemo } from 'react';
import { css } from 'linaria';
import { SelectBaseProps, useToggler } from '@cbhq/cds-common';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { durations } from '@cbhq/cds-common/motion/tokens';

import { useRefocusTrigger } from '../controls/useRefocusTrigger';
import { Dropdown, DropdownProps } from '../dropdown';
import { usePalette } from '../hooks/usePalette';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { borderWidth } from '../tokens';
import { cx } from '../utils/linaria';

import { Chip } from './Chip';
import { ChipProps } from './ChipProps';

export type SelectChipProps = {
  /** Indicates that the control is being used to manipulate data elsewhere */
  active?: boolean;
  /**
   * @deprecated The `children` prop is now deprecated and will be removed in the next major version (v7).
   */
  children?: ReactNode;
} & Omit<ChipProps, 'inverted' | 'children' | 'onBlur' | 'noScaleOnPress' | 'content'> &
  Pick<SelectBaseProps, 'onChange' | 'valueLabel' | 'placeholder' | 'value'> &
  Omit<DropdownProps, 'onChange' | 'children'>;

const defaultStyles = css`
  border-color: var(--border-color-unfocused);
  /* stylelint-disable plugin/no-low-performance-animation-properties */
  transition: box-shadow ${durations.moderate1}ms ease-in-out;
  /* stylelint-enable plugin/no-low-performance-animation-properties */
  overflow: hidden;
  padding: 0;
  margin: 0;

  &:focus-within {
    border-color: var(--border-color-focused);
    box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
  }
`;

const persistedFocusStyles = css`
  &&&& {
    padding: 0;
    margin: 0;
    border-color: var(--border-color-focused);
    box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
  }
`;

export const SelectChip = memo(
  forwardRef(function SelectChip(
    {
      active,
      value,
      valueLabel,
      placeholder,
      content,
      onChange,
      onCloseMenu,
      onOpenMenu,
      end,
      testID = 'select-chip',
      // dropdown props
      block,
      contentPosition,
      disableCloseOnOptionChange,
      disablePortal,
      disabled,
      enableMobileModal,
      maxHeight,
      maxWidth,
      minWidth,
      onBlur,
      showOverlay,
      width,
      className,
      ...props
    }: SelectChipProps,
    ref,
  ) {
    const [isOpen, { toggleOn: openMenu, toggleOff: closeMenu }] = useToggler(false);
    const [menuHasClosed, toggleMenuHasClosed] = useToggler(false);
    const triggerRef = useRefocusTrigger(menuHasClosed);
    const mergedRefs = useMergedRef(ref, triggerRef);
    const palette = usePalette();

    const borderStyles = useMemo(() => {
      return {
        '--border-color-unfocused': 'transparent',
        '--border-color-focused': palette.primary,
        '--border-width-focused': borderWidth.input,
      };
    }, [palette]);

    const handleOpenMenu = useCallback(() => {
      openMenu();
      if (menuHasClosed) {
        // this makes sure if you open/close more than once it'll continue to work correctly
        toggleMenuHasClosed.toggleOff();
      }
    }, [menuHasClosed, openMenu, toggleMenuHasClosed]);

    const handleCloseMenu = useCallback(() => {
      closeMenu();
      onCloseMenu?.();
      toggleMenuHasClosed.toggleOn();
    }, [closeMenu, onCloseMenu, toggleMenuHasClosed]);

    return (
      <Dropdown
        block={block}
        content={content}
        contentPosition={contentPosition}
        disableCloseOnOptionChange={disableCloseOnOptionChange}
        disablePortal={disablePortal}
        disabled={disabled}
        enableMobileModal={enableMobileModal}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minWidth={minWidth}
        onBlur={onBlur}
        onChange={onChange}
        onCloseMenu={handleCloseMenu}
        onOpenMenu={onOpenMenu}
        showOverlay={showOverlay}
        testID={`${testID}-dropdown`}
        value={value}
        width={width}
      >
        <Chip
          ref={mergedRefs}
          noScaleOnPress
          className={cx(isOpen ? persistedFocusStyles : defaultStyles, className)}
          disabled={disabled}
          end={end ?? <AnimatedCaret color="foreground" rotate={isOpen ? 0 : 180} />}
          inverted={active}
          onPress={handleOpenMenu}
          style={borderStyles as React.CSSProperties}
          testID={testID}
          {...props}
        >
          {valueLabel ?? value ?? placeholder}
        </Chip>
      </Dropdown>
    );
  }),
);

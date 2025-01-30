import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { css, cx } from '@linaria/core';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';
import { durations } from '@cbhq/cds-common2/motion/tokens';
import type { SelectBaseProps } from '@cbhq/cds-common2/types';

import { useRefocusTrigger } from '../controls/useRefocusTrigger';
import { Dropdown, DropdownProps } from '../dropdown';
import { useTheme } from '../hooks/useTheme';
import { AnimatedCaret } from '../motion/AnimatedCaret';

import { Chip } from './Chip';
import { ChipProps } from './ChipProps';

export type SelectChipProps = {
  /** Indicates that the control is being used to manipulate data elsewhere */
  active?: boolean;
  /**
   * @deprecated The `children` prop is now deprecated and will be removed in the next major version (v7).
   */
  children?: React.ReactNode;
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
  padding: 0;
  margin: 0;
  border-color: var(--border-color-focused);
  box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
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
      respectNegativeTabIndex,
      ...props
    }: SelectChipProps,
    ref,
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuHasClosed, setMenuHasClosed] = useState(false);
    const triggerRef = useRefocusTrigger(menuHasClosed);
    const mergedRefs = useMergeRefs(ref, triggerRef);
    const { color: palette, borderWidth } = useTheme();

    const borderStyles = useMemo(() => {
      return {
        '--border-color-unfocused': palette.transparent,
        '--border-color-focused': palette.backgroundPrimary,
        // TODO will need to guess and check with the value of this
        '--border-width-focused': borderWidth['200'],
      };
    }, [borderWidth, palette.backgroundPrimary, palette.transparent]);

    const handleOpenMenu = useCallback(() => {
      setIsOpen(true);
      if (menuHasClosed) {
        // this makes sure if you open/close more than once it'll continue to work correctly
        setMenuHasClosed(false);
      }
    }, [menuHasClosed]);

    const handleCloseMenu = useCallback(() => {
      setIsOpen(false);
      onCloseMenu?.();
      setMenuHasClosed(true);
    }, [onCloseMenu]);

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
        respectNegativeTabIndex={respectNegativeTabIndex}
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
          end={end ?? <AnimatedCaret color="iconForeground" rotate={isOpen ? 0 : 180} />}
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

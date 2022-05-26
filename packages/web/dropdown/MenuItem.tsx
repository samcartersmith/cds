import React, { forwardRef, memo, ReactNode, useCallback } from 'react';
import { ForwardedRef } from '@cbhq/cds-common';

import { SelectOptionProps } from '../controls';
import { useSelectContext } from '../controls/selectContext';
import { insetFocusRing } from '../styles/focus';
import { Pressable } from '../system';

export type MenuItemProps = {
  children: NonNullable<ReactNode>;
} & Pick<
  SelectOptionProps,
  'disableCloseOnOptionChange' | 'onPress' | 'onKeyPress' | 'to' | 'value' | 'tabIndex'
>;

export const MenuItem = memo(
  forwardRef(
    (
      { children, value, onPress, disableCloseOnOptionChange, tabIndex, ...props }: MenuItemProps,
      ref: ForwardedRef<HTMLButtonElement>,
    ) => {
      const { onChange, handleCloseMenu } = useSelectContext();

      const handlePress = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          onPress?.(event);
          onChange?.(value);
          if (!disableCloseOnOptionChange) {
            handleCloseMenu?.();
          }
        },
        [disableCloseOnOptionChange, handleCloseMenu, onChange, onPress, value],
      );
      return (
        <Pressable
          backgroundColor="transparent"
          noScaleOnPress
          role="menuitem"
          ref={ref}
          className={insetFocusRing}
          onPress={handlePress}
          tabIndex={tabIndex ?? -1}
          {...props}
        >
          {children}
        </Pressable>
      );
    },
  ),
);

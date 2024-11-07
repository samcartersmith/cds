import React, { forwardRef, memo, useCallback } from 'react';
import { ForwardedRef, SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common';

import { useSelectContext } from '../controls/selectContext';
import { SelectOptionProps } from '../controls/SelectOption';
import { insetFocusRing } from '../styles/focus';
import { Pressable } from '../system';

export type MenuItemProps = {
  children: NonNullable<React.ReactNode>;
} & Pick<
  SelectOptionProps,
  'disableCloseOnOptionChange' | 'onPress' | 'onKeyPress' | 'to' | 'value' | 'tabIndex'
> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

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
          ref={ref}
          noScaleOnPress
          background="transparent"
          className={insetFocusRing}
          onPress={handlePress}
          role="menuitem"
          tabIndex={tabIndex ?? -1}
          {...props}
        >
          {children}
        </Pressable>
      );
    },
  ),
);

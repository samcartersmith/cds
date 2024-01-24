import React, { forwardRef, memo, ReactNode, useCallback } from 'react';
import { ForwardedRef, SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common';
import { insetFocusRing } from '@cbhq/cds-web/styles/focus';
import { Pressable } from '@cbhq/cds-web/system';

import { useSelectContext } from '../select/context';
import { SelectOptionProps } from '../select/SelectOption';

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export type MenuItemProps = {
  children: NonNullable<ReactNode>;
} & Pick<
  SelectOptionProps,
  'disableCloseOnOptionChange' | 'onPress' | 'onKeyPress' | 'to' | 'value' | 'tabIndex'
> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
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
          backgroundColor="transparent"
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

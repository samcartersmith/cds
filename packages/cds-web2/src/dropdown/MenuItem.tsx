import React, { forwardRef, memo, useCallback } from 'react';
import type { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common2/types';

import { useSelectContext } from '../controls/selectContext';
import { SelectOptionProps } from '../controls/SelectOption';
import { insetFocusRing } from '../styles/focus';
import { type PressableBaseProps, Pressable } from '../system/Pressable';

export type MenuItemProps = {
  children: NonNullable<React.ReactNode>;
} & Pick<
  SelectOptionProps,
  'disableCloseOnOptionChange' | 'onPress' | 'to' | 'value' | 'tabIndex'
> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export const MenuItem = memo(
  forwardRef<HTMLElement, MenuItemProps>(
    ({ children, value, onPress, disableCloseOnOptionChange, tabIndex, ...props }, ref) => {
      const { onChange, handleCloseMenu } = useSelectContext();

      const handlePress: NonNullable<PressableBaseProps['onPress']> = useCallback(
        (event) => {
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

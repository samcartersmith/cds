import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { SharedAccessibilityProps } from '@cbhq/cds-common2/types';
import type { NavigationBaseIconProps } from '@cbhq/cds-common2/types/NavigationBaseIconProps';

import { Icon } from './Icon';

export type { NavigationIconName, NavigationIconSize } from '@cbhq/cds-common2/types';

export type NavigationIconProps = NavigationBaseIconProps & {
  /**
   * Color of the icon when used as a foreground.
   * @default foreground
   */
  color?: ThemeVars.Color;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

/** @deprecated Will be removed in Q1 2025. Use Icon instead. */
export const NavigationIcon = memo(
  forwardRef<HTMLDivElement, NavigationIconProps>(
    (
      {
        accessibilityLabel,
        active = false,
        fallback = null,
        color = active ? 'fgPrimary' : 'fg',
        name,
        size = 'm',
        testID,
        ...props
      },
      ref,
    ) => {
      return (
        <Icon
          ref={ref}
          accessibilityLabel={accessibilityLabel}
          active={active}
          color={color}
          fallback={fallback}
          iconType="nav"
          name={name}
          size={size}
          testID={testID}
          {...props}
        />
      );
    },
  ),
);

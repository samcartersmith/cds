import React, { forwardRef, memo } from 'react';
import type { PaletteForeground, SharedAccessibilityProps } from '@cbhq/cds-common/types';
import { NavigationBaseIconProps } from '@cbhq/cds-common/types/NavigationBaseIconProps';

import { Icon } from './Icon';

export type { NavigationIconName, NavigationIconSize } from '@cbhq/cds-common/types';

export type NavigationIconProps = NavigationBaseIconProps & {
  /**
   * Color of the icon when used as a foreground.
   * @default foreground
   */
  color?: PaletteForeground;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

/** @deprecated Will be removed in Q1 2025. Use Icon instead. */
export const NavigationIcon = memo(
  forwardRef<HTMLDivElement, NavigationIconProps>(
    (
      {
        accessibilityLabel,
        active = false,
        fallback = null,
        color = active ? 'primary' : 'foreground',
        name,
        size = 'm',
        testID,
        spacing,
        spacingTop,
        spacingBottom,
        spacingStart,
        spacingEnd,
        spacingVertical,
        spacingHorizontal,
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
          spacing={spacing}
          spacingBottom={spacingBottom}
          spacingEnd={spacingEnd}
          spacingHorizontal={spacingHorizontal}
          spacingStart={spacingStart}
          spacingTop={spacingTop}
          spacingVertical={spacingVertical}
          testID={testID}
          {...props}
        />
      );
    },
  ),
);

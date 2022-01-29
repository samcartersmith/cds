import React, { forwardRef } from 'react';

import { BoxElement, VStack, VStackProps } from '../../layout';
import { useThemeProviderStyles } from '../../system/useThemeProviderStyles';

export type OverlayProps = {
  onPress?: React.MouseEventHandler;
} & VStackProps<BoxElement>;

export const OverlayContent = forwardRef<HTMLElement, OverlayProps>(
  ({ onPress, ...props }, forwardedRef) => {
    const { style } = useThemeProviderStyles();

    // override background overlay color for dark mode
    return (
      <div style={style}>
        <VStack
          pin="all"
          background="backgroundOverlay"
          onClick={onPress}
          {...props}
          ref={forwardedRef}
        />
      </div>
    );
  },
);

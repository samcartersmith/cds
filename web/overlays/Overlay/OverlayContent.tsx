import React from 'react';

import { VStack, VStackProps, BoxElement } from '../../layout';
import { useThemeProviderStyles } from '../../system/useThemeProviderStyles';

export type OverlayProps = {
  onPress?: React.MouseEventHandler;
} & VStackProps<BoxElement>;

export const OverlayContent: React.FC<OverlayProps> = ({ onPress, ...props }) => {
  const { style } = useThemeProviderStyles();

  // override background overlay color for dark mode
  return (
    <div style={style}>
      <VStack pin="all" background="backgroundOverlay" onClick={onPress} {...props} />
    </div>
  );
};

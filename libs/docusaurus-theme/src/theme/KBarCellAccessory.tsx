import React, { memo } from 'react';
import type { KBarCellAccessoryProps } from '@theme/KBarCellAccessory';
import { Box } from '@cbhq/cds-web/layout/Box';

const kbdStyles = {
  fontFamily: `-apple-system, "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif`,
};
const KBarCellAccessory = memo(function KBarCellAccessory({ children }: KBarCellAccessoryProps) {
  return (
    <Box testID="accessory">
      <kbd style={kbdStyles}>{children}</kbd>
    </Box>
  );
});

export default KBarCellAccessory;

import React, { useCallback, useMemo, useState } from 'react';

import { IconSize, paletteForegrounds, PaletteForeground } from '@cbhq/cds-common';
import { Box, Button, ThemeProvider, Icon } from '@cbhq/cds-web';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import { iconNames, iconSizes } from './data';

type IconSheetForSizeProps = {
  size: IconSize;
};

const IconSheetForSize = ({ size = 'l' }: IconSheetForSizeProps) => {
  const [color, setColor] = useState<PaletteForeground>('primary');
  const onPress = useCallback((item: PaletteForeground) => {
    return () => setColor(item);
  }, []);

  const background = useMemo(() => {
    switch (color) {
      case 'primaryForeground':
        return 'primary';
      case 'positiveForeground':
        return 'positive';
      case 'negativeForeground':
        return 'negative';
      case 'secondary':
        return 'primary';
      default:
        return undefined;
    }
  }, [color]);

  return (
    <ThemeProvider>
      <Box flexWrap="wrap" offsetStart={3}>
        {paletteForegrounds.map(item => (
          <Box key={item} spacingStart={3} spacingBottom={2}>
            <Button onPress={onPress(item)} variant={color === item ? 'primary' : 'secondary'}>
              {item}
            </Button>
          </Box>
        ))}
      </Box>

      <Box flexWrap="wrap" background={background} spacingBottom={3} offsetStart={3}>
        {iconNames.map(item => (
          <Icon title={item} spacing={3} color={color} key={item} name={item} size={size} />
        ))}
      </Box>
    </ThemeProvider>
  );
};

export const IconSheet = () => {
  return (
    <Tabs defaultValue="l" values={iconSizes.map(item => ({ label: item, value: item }))}>
      {iconSizes.map(item => (
        <TabItem key={item} value={item}>
          <IconSheetForSize size={item} />
        </TabItem>
      ))}
    </Tabs>
  );
};

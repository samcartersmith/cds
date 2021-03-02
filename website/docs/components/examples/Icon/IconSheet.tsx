import React, { useCallback, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';
import { css, cx } from 'linaria';

import { IconSize, paletteForegrounds, PaletteForeground } from '@cbhq/cds-common';
import { Box, Button, ThemeProvider, Icon } from '@cbhq/cds-web';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import { iconNames, iconSizes } from './data';

type IconSheetForSizeProps = {
  size: IconSize;
};

const elevation = css`
  line-height: 4em;
  text-align: center;
  margin: 2em 4em;
  border: 1px solid grey;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
`;

const searchBox = css`
  width: 100%;
  height: 30px;
`;

const IconSheetForSize = ({ size = 'l' }: IconSheetForSizeProps) => {
  const [color, setColor] = useState<PaletteForeground>('primary');
  const [query, setQuery] = useState('');
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

  const searchOnChange = throttle((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, 1000);

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

      <Box flexWrap="wrap" offsetStart={3}>
        <input
          className={cx(elevation, searchBox)}
          onChange={searchOnChange}
          type="text"
          id="search-icon"
          placeholder="Search Icon Here"
          name="search-icon"
        />
      </Box>

      <Box flexWrap="wrap" background={background} spacingBottom={3} offsetStart={3}>
        {iconNames
          .filter(name => name.includes(query))
          .map(filteredName => (
            <Icon
              title={filteredName}
              spacing={3}
              color={color}
              key={filteredName}
              name={filteredName}
              size={size}
            />
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

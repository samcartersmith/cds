import { useCallback, useMemo, useState } from 'react';

import { IconSize, paletteForegrounds, PaletteForeground } from '@cbhq/cds-common';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';
import { Box } from '@cbhq/cds-web/layout/Box';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { css, cx } from 'linaria';
import throttle from 'lodash/throttle';

import { iconNames, iconSizes } from './data';

type IconSheetForSizeProps = {
  size: IconSize;
};

const elevation = css`
  line-height: 4em;
  text-align: center;
  border: 1px solid grey;
  border-radius: 4px;
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

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  return (
    <ThemeProvider>
      <Box flexWrap="wrap">
        {paletteForegrounds.map(item => (
          <Box key={item} spacingEnd={1} spacingBottom={1}>
            <Button
              compact
              onPress={onPress(item)}
              variant={color === item ? 'primary' : 'secondary'}
            >
              {item}
            </Button>
          </Box>
        ))}
      </Box>

      <Box flexWrap="wrap" spacingVertical={2}>
        <input
          className={cx(elevation, searchBox)}
          onChange={searchOnChange}
          type="text"
          id="search-icon"
          placeholder="Search Icon Here"
          name="search-icon"
        />
      </Box>

      <Box flexWrap="wrap" background={background} spacingTop={1} spacingBottom={3}>
        {iconNames
          .filter(name => name.includes(query))
          .map(filteredName => (
            <div>
              <Icon
                title={filteredName}
                spacing={7}
                color={color}
                key={filteredName}
                name={filteredName}
                size={size}
              />
              <TextLabel1 align="center" as="p">
                {filteredName}
              </TextLabel1>
            </div>
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

import { useCallback, useState, useMemo } from 'react';

import { IconSize, PaletteForeground, paletteForegrounds } from '@cbhq/cds-common';
import {
  IconName,
  NavigationIconName,
  NavigationIconInternalName,
} from '@cbhq/cds-common/types/IconName';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { IconBase } from '@cbhq/cds-web/icons/IconBase';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { cx } from 'linaria';
import throttle from 'lodash/throttle';
import { navigationIconNames, iconNames, iconSizes } from ':cds-website/data/iconData';

import { elevation, searchBox } from './styles';

type Categories = 'product' | 'navigation';

const categoryToData: Record<
  string,
  {
    names: readonly (IconName | NavigationIconName)[];
    sizes: readonly (IconSize | Exclude<IconSize, 'xs'>)[];
  }
> = {
  product: {
    names: iconNames,
    sizes: iconSizes,
  },
  navigation: {
    names: navigationIconNames,
    sizes: iconSizes.filter((size) => !['xs'].includes(size)),
  },
};

type IconBaseContentProp<StateType> = {
  size: IconSize;
  defaultState: StateType;
  states: StateType[];
  category: Categories;
};

const IconBaseContentSheet = <StateType extends string>({
  size,
  defaultState,
  states,
  category,
}: IconBaseContentProp<StateType>) => {
  const [state, setState] = useState<StateType>(defaultState);
  const [query, setQuery] = useState('');
  const onPress = useCallback((pressState: StateType) => {
    return () => setState(pressState);
  }, []);

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  const { names } = useMemo(() => categoryToData[category], [category]);

  const background = useMemo(() => {
    switch (state) {
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
  }, [state]);

  const color = useMemo(() => {
    switch (category) {
      case 'navigation':
        return state === 'Active' ? 'primary' : 'foreground';
      case 'product':
        return state;
      default:
        return 'primary';
    }
  }, [category, state]);

  return (
    <ThemeProvider>
      <Box flexWrap="wrap">
        {states.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={idx} spacingEnd={1} spacingBottom={1}>
            <Button
              compact
              onPress={onPress(item)}
              variant={state === item ? 'primary' : 'secondary'}
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
          placeholder="Search icons here"
        />
      </Box>

      <Box flexWrap="wrap" background={background} spacingTop={1} spacingBottom={3}>
        {names
          .filter((name) => {
            const re = new RegExp(query, 'gi');
            return (name.match(re)?.length ?? 0) > 0;
          })
          .map((filteredName) => {
            const finalName =
              category === 'navigation'
                ? (`${filteredName}${state}` as NavigationIconInternalName)
                : (filteredName as IconName);

            return (
              <VStack spacing={3} alignItems="center" key={filteredName}>
                <IconBase name={finalName} size={size} color={color as PaletteForeground} />
                <TextLabel1 align="center" as="p" spacing={2}>
                  {filteredName}
                </TextLabel1>
              </VStack>
            );
          })}
      </Box>
    </ThemeProvider>
  );
};

const iconStates = ['Active', 'Inactive'];
export const IconBaseSheet = ({ category }: { category: Categories }) => {
  const { sizes } = categoryToData[category];

  return (
    <Tabs defaultValue="m" values={sizes.map((item) => ({ label: item, value: item }))}>
      {sizes.map((item) => (
        <TabItem key={item} value={item}>
          <IconBaseContentSheet
            size={item}
            states={
              category === 'product'
                ? (paletteForegrounds as unknown as PaletteForeground[])
                : iconStates
            }
            defaultState={category === 'product' ? 'primary' : 'Active'}
            category={category}
          />
        </TabItem>
      ))}
    </Tabs>
  );
};

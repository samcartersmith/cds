import React, { useCallback, useState, useMemo } from 'react';

import { PaletteForeground, paletteForegrounds } from '@cbhq/cds-common';
import {
  IconName as ProductIconName,
  NavigationIconInternalName,
  NavigationIconName,
} from '@cbhq/cds-common/types/IconName';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { IconBase } from '@cbhq/cds-web/icons/IconBase';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';
import throttle from 'lodash/throttle';
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { IconSize } from '@cbhq/cds-common/types/IconSize';
import { Tabs } from ':cds-website/components/Tabs';
import { navigationIconNames, iconNames, iconSizes } from ':cds-website/data/iconData';
import { iconDescriptionGraph } from ':cds-website/data/icon/iconDescriptionGraph';

type IconData = typeof iconData;
type IconType = keyof IconData;
type IconMap<T extends IconType> = IconData[T];
type IconName<T extends IconType = IconType> = IconMap<T>['names'][number];
type IconVariant<T extends IconType = IconType> = IconMap<T>['variants'][number];

const iconData = {
  product: {
    names: iconNames,
    sizes: iconSizes,
    variants: paletteForegrounds,
    defaultVariant: 'primary',
  },
  navigation: {
    names: navigationIconNames,
    sizes: iconSizes.filter((size) => !['xs'].includes(size)),
    variants: ['Active', 'Inactive'],
    defaultVariant: 'Active',
  },
} as const;

type IconBaseContentProp<T> = {
  size: IconSize;
  category: T;
};
function isNavIconName(name: IconName): name is NavigationIconName {
  return iconData.navigation.names.findIndex((item) => item === name) !== -1;
}
function isNavVariant(variant: IconVariant): variant is IconVariant<'navigation'> {
  return iconData.navigation.variants.findIndex((item) => item === variant) !== -1;
}
function isProductIconName(name: IconName): name is ProductIconName {
  return iconData.product.names.findIndex((item) => item === name) !== -1;
}
function isProductVariant(variant: IconVariant): variant is IconVariant<'product'> {
  return iconData.product.variants.findIndex((item) => item === variant) !== -1;
}

function getIconName<T extends IconType>(
  category: T,
  name: IconName<T>,
  variant: IconVariant<T>,
): NavigationIconInternalName | ProductIconName {
  switch (category) {
    case 'navigation':
      if (isNavIconName(name) && isNavVariant(variant)) {
        return `${name}${variant}` as const;
      }
      break;
    case 'product':
      if (isProductIconName(name) && isProductVariant(variant)) {
        return name;
      }
      break;
    default:
      throw new Error("Trying to get an icon name that doesn't exist");
  }
  throw new Error("Trying to get an icon name that doesn't exist");
}

const queryMatchesName = (query: string, name: string) => {
  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');
  const nameRe = new RegExp(name.toLowerCase(), 'gi');

  const matchedIconNames: string[] = [];

  if (query in iconDescriptionGraph) {
    matchedIconNames.push(...iconDescriptionGraph[query]);
  }

  return name.match(queryRe) !== null || matchedIconNames.join(' ').match(nameRe) !== null;
};

const IconBaseContentSheet = <T extends IconType>({ size, category }: IconBaseContentProp<T>) => {
  const { defaultVariant, names, variants } = iconData[category];
  const [variant, setVariant] = useState<IconVariant<T>>(defaultVariant);
  const [query, setQuery] = useState('');
  const onPress = useCallback((_variant: IconVariant<T>) => {
    return () => setVariant(_variant);
  }, []);

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  const background = useMemo(() => {
    switch (variant) {
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
  }, [variant]);

  const color = useMemo(() => {
    switch (category) {
      case 'navigation':
        return variant === 'Active' ? 'primary' : 'foreground';
      case 'product':
        return variant;
      default:
        return 'primary';
    }
  }, [category, variant]);

  const icons = useMemo(() => {
    if (Array.isArray(names)) {
      return names
        .filter((name: IconName<T>) => {
          return queryMatchesName(query, name);
        })
        .map((name: IconName<T>) => {
          const iconName = getIconName(category, name, variant);
          return (
            <VStack spacing={3} alignItems="center" key={iconName}>
              <IconBase name={iconName} size={size} color={color as PaletteForeground} />
              <TextLabel1 align="center" as="p" spacing={2}>
                {name}
              </TextLabel1>
            </VStack>
          );
        });
    }
    return null;
  }, [category, color, names, query, size, variant]);

  return (
    <>
      <Box flexWrap="wrap">
        {variants.map((item) => (
          <Box key={`${category}-${item}`} spacingEnd={1} spacingBottom={1}>
            <Button
              compact
              onPress={onPress(item)}
              variant={variant === item ? 'primary' : 'secondary'}
            >
              {item}
            </Button>
          </Box>
        ))}
      </Box>

      <Box flexWrap="wrap" spacingVertical={2}>
        <TextInput
          onChange={searchOnChange}
          type="text"
          placeholder="Icon name"
          label="Filter Icons"
        />
      </Box>

      <Box flexWrap="wrap" background={background} spacingTop={1} spacingBottom={3}>
        {icons}
      </Box>
    </>
  );
};

export const IconBaseSheet = ({ category }: { category: IconType }) => {
  const { sizes } = iconData[category];
  const tabsData = useMemo(() => {
    return {
      id: `icon-sheet-${category}`,
      defaultTab: 'm',
      values: sizes.map((size) => ({
        id: size,
        label: size,
        content: <IconBaseContentSheet size={size} category={category} />,
      })),
    };
  }, [category, sizes]);

  return <Tabs {...tabsData} />;
};

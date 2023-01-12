import React, { memo, useCallback } from 'react';
import { Dimensions, FlatList } from 'react-native';
import {
  IllustrationDimensionsMap,
  IllustrationNames,
  IllustrationVariant,
  Spectrum,
} from '@cbhq/cds-common';
import { sortedImg } from '@cbhq/cds-common/internal/data/sortedIllustrationData';
import { convertDimensionToSize } from '@cbhq/cds-common/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@cbhq/cds-common/utils/convertSizeWithMultiplier';

import { Divider, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextLegal } from '../../typography';
import { Illustration } from '../Illustration';

export function getIllustrationSheet<Type extends IllustrationVariant>(
  type: Type,
  {
    scaleMultiplier = 1,
    dimension,
  }: { scaleMultiplier?: number; dimension: IllustrationDimensionsMap[Type] },
) {
  /** Constants */
  const FLAT_LIST_STYLE = { width: '100%' } as const;
  const FLAT_LIST_CONTAINER_STYLE = {
    marginLeft: 24,
    paddingBottom: 24,
    alignContent: 'flex-start',
  } as const;
  const SCREEN_WIDTH = Dimensions.get('window').width - FLAT_LIST_CONTAINER_STYLE.marginLeft * 2;
  const ITEM_SIZE = convertSizeWithMultiplier(convertDimensionToSize(dimension), scaleMultiplier);
  const ITEM_WIDTH = ITEM_SIZE.width;
  const ITEM_HEIGHT = ITEM_SIZE.height + 10; // account for text underneath
  const ITEM_COLUMNS = Math.floor(SCREEN_WIDTH / ITEM_WIDTH);

  const items = sortedImg[type];
  type DataItem = { name: IllustrationNames; spectrum: Spectrum };

  const light: DataItem[] = [];
  const dark: DataItem[] = [];

  // TODO: remove this set logic - this will not be necessary when we switch to new illustration pipeline
  new Set(
    items
      .map((nameAndSpectrum) => {
        const token = nameAndSpectrum.split('-');
        const [name] = token as [name: IllustrationNames, spectrum: Spectrum];
        return name;
      })
      .values(),
  ).forEach((name) => {
    light.push({
      name,
      spectrum: 'light' as const,
    });
    dark.push({
      name,
      spectrum: 'dark' as const,
    });
  });

  const data = [...light, ...dark];

  const ListFooterComponent = memo(function ListFooterComponent() {
    // TODO: pull from ui-mobile-playground/helpers/constants via scrollViewEnd constant
    return <Divider testID="mobile-playground-scrollview-end" />;
  });

  const renderItem = ({ item }: { item: DataItem }) => {
    return (
      <ThemeProvider name="default" scale="xSmall" spectrum={item.spectrum}>
        <VStack overflow="hidden" background width={ITEM_WIDTH}>
          <Illustration name={item.name} dimension={dimension} scaleMultiplier={scaleMultiplier} />
          <TextLegal ellipsize="tail">{item.name}</TextLegal>
        </VStack>
      </ThemeProvider>
    );
  };

  const IllustrationSheet = memo(function IllustrationSheet() {
    const getItemLayout = useCallback(function getItemLayout(
      _data: DataItem[] | null | undefined,
      index: number,
    ) {
      return {
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      };
    },
    []);

    const keyExtractor = useCallback(function keyExtractor(item: DataItem) {
      return `${type}-${item.name}-${item.spectrum}`;
    }, []);

    return (
      <VStack
        // TODO: pull from ui-mobile-playground/helpers/constants via screen constant
        testID="mobile-playground-screen"
        background
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
      >
        <FlatList
          style={FLAT_LIST_STYLE}
          contentContainerStyle={FLAT_LIST_CONTAINER_STYLE}
          // TODO: pull from ui-mobile-playground/helpers/constants via scrollView constant
          testID="mobile-playground-scrollview"
          data={data}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          numColumns={ITEM_COLUMNS}
          keyExtractor={keyExtractor}
          ListFooterComponent={ListFooterComponent}
        />
      </VStack>
    );
  });

  return IllustrationSheet;
}

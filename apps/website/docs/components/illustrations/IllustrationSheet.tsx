import React, { useState } from 'react';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import throttle from 'lodash/throttle';
import {
  HeroSquareDimension,
  IllustrationVariant,
  PictogramDimension,
  SpotIconDimension,
} from '@cbhq/cds-common';
import {
  illustrationDimensionDefaults,
  illustrationDimensions,
  illustrationSizes,
} from '@cbhq/cds-common/tokens/illustrations';
import heroSquareDescriptionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/descriptionMap';
import heroSquareNames from '@cbhq/cds-illustrations/__generated__/heroSquare/data/names';
import pictogramDescriptionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/descriptionMap';
import pictogramNames from '@cbhq/cds-illustrations/__generated__/pictogram/data/names';
import spotIconDescriptionMap from '@cbhq/cds-illustrations/__generated__/spotIcon/data/descriptionMap';
import spotIconNames from '@cbhq/cds-illustrations/__generated__/spotIcon/data/names';
import spotRectangleDescriptionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/descriptionMap';
import spotRectangleNames from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/names';
import spotSquareDescriptionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/descriptionMap';
import spotSquareNames from '@cbhq/cds-illustrations/__generated__/spotSquare/data/names';
import { SearchInput, Select, SelectOption } from '@cbhq/cds-web/controls';
import {
  HeroSquare,
  HeroSquareName,
  Pictogram,
  PictogramName,
  SpotIcon,
  SpotIconName,
  SpotRectangle,
  SpotRectangleName,
  SpotSquare,
  SpotSquareName,
} from '@cbhq/cds-web/illustrations';
import { HStack, VStack } from '@cbhq/cds-web/layout';

const variantToNamesMap = {
  heroSquare: heroSquareNames,
  spotRectangle: spotRectangleNames,
  spotSquare: spotSquareNames,
  pictogram: pictogramNames,
  spotIcon: spotIconNames,
};

const descriptionMap = {
  heroSquare: heroSquareDescriptionMap,
  spotRectangle: spotRectangleDescriptionMap,
  spotSquare: spotSquareDescriptionMap,
  pictogram: pictogramDescriptionMap,
  spotIcon: spotIconDescriptionMap,
};

/**
 * Determines whether the name of this illustration is
 * in the selected category
 * @param name - the user search term
 * @param selectedCategory - the category chosen by the user
 * @returns true if this illustration is a subset of the selectedCategory
 */
const nameInCategory = (type: IllustrationVariant, name: string, selectedCategory: string) => {
  const descriptionMapForType = descriptionMap[type];
  if (selectedCategory === 'all') return true;

  // i.e if category = 'contract'
  // then the categoryNames would be the values of contract in
  // illustrationDescriptionGraphy
  if (selectedCategory in descriptionMapForType) {
    return descriptionMapForType[selectedCategory].includes(name);
  }

  return false;
};

/**
 * Determines whether the query is a subset of the name.
 * i.e If the name is contract, and query is con, this would return
 * true.
 * @param query - the user search term
 * @param name - the name of the illustration that is being matched with
 * @returns true if query is a subset of name of this illustration
 */
const queryIsSubsetOfName = (query: string, name: string) => {
  if (query === '') return true;

  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');

  return queryRe.test(name);
};

/**
 * If the query is the description of an illustration, we need
 * to find the name of the illustration that has the description
 * of the query.
 * @param query - the user search term
 * @param name - the name of the illustration that is being matched with
 * @returns returns true if query is a description of this illustration
 */
const queryHasMatchingDescription = (type: IllustrationVariant, query: string, name: string) => {
  const descriptionMapForType = descriptionMap[type];
  if (query === '') return true;

  if (query in descriptionMapForType) {
    return descriptionMapForType[query].includes(name);
  }

  return false;
};

export const IllustrationSheet = function IllustrationSheet({
  variant,
}: {
  variant: IllustrationVariant;
}) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const options = [
    'all',
    'navigation illustration',
    'app switcher',
    'logged out',
    'success state',
    'warning state',
    'error state',
    'system error',
    'empty state',
  ];
  const names = variantToNamesMap[variant];
  const dimensions = illustrationDimensions[variant];
  const defaultVal = illustrationDimensionDefaults[variant];

  const searchOnChange = throttle((text: string) => {
    setQuery(text);
  }, 1000);

  return (
    <>
      <HStack gap={2} spacingVertical={2}>
        <SearchInput
          onChangeText={searchOnChange}
          placeholder="Illustration name"
          type="text"
          value={query}
          width="70%"
        />
        <Select
          onChange={setSelectedCategory}
          placeholder="Choose something..."
          value={selectedCategory}
          width="30%"
        >
          {options.map((option) => (
            <SelectOption key={option} title={option} value={option} />
          ))}
        </Select>
      </HStack>

      <Tabs
        defaultValue={defaultVal}
        values={dimensions.map((dim) => ({ label: dim, value: dim }))}
      >
        {dimensions.map((dim) => {
          const [originalWidth] = illustrationSizes[dim];
          const width = originalWidth <= 96 ? originalWidth + 60 : originalWidth;
          const illustrationLabelStyles = {
            fontSize: 12,
            width,
            textAlign: 'center',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
          } as const;

          const filteredNames = names
            .map((item) => item)
            .filter((name) => {
              return (
                (queryHasMatchingDescription(variant, query, name) &&
                  nameInCategory(variant, name, selectedCategory)) ||
                (queryIsSubsetOfName(query, name) &&
                  nameInCategory(variant, name, selectedCategory))
              );
            });

          return (
            <TabItem key={dim} value={dim}>
              <HStack flexWrap="wrap" gap={2}>
                {filteredNames.map((filteredName) => (
                  <VStack key={filteredName} alignItems="center" overflow="auto" width={width}>
                    {variant === 'heroSquare' && (
                      <HeroSquare
                        dimension={dim as HeroSquareDimension}
                        name={filteredName as HeroSquareName}
                      />
                    )}
                    {variant === 'spotSquare' && (
                      <SpotSquare name={filteredName as SpotSquareName} />
                    )}
                    {variant === 'spotRectangle' && (
                      <SpotRectangle name={filteredName as SpotRectangleName} />
                    )}
                    {variant === 'pictogram' && (
                      <Pictogram
                        dimension={dim as PictogramDimension}
                        name={filteredName as PictogramName}
                      />
                    )}
                    {variant === 'spotIcon' && (
                      <SpotIcon
                        dimension={dim as SpotIconDimension}
                        name={filteredName as SpotIconName}
                      />
                    )}

                    <p style={illustrationLabelStyles}>{filteredName}</p>
                  </VStack>
                ))}
              </HStack>
            </TabItem>
          );
        })}
      </Tabs>
    </>
  );
};

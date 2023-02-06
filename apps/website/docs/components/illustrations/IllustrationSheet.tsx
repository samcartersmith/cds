import React, { useState } from 'react';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import throttle from 'lodash/throttle';
import {
  illustrationDimensionDefaults,
  illustrationDimensions,
  illustrationSizes,
} from '@cbhq/cds-common/tokens/illustrations';
import { IllustrationVariant } from '@cbhq/cds-common/types/IllustrationNames';
import heroSquareDescriptionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/descriptionMap';
import heroSquareNames from '@cbhq/cds-illustrations/__generated__/heroSquare/data/names';
import pictogramDescriptionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/descriptionMap';
import pictogramNames from '@cbhq/cds-illustrations/__generated__/pictogram/data/names';
import spotRectangleDescriptionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/descriptionMap';
import spotRectangleNames from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/names';
import spotSquareDescriptionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/descriptionMap';
import spotSquareNames from '@cbhq/cds-illustrations/__generated__/spotSquare/data/names';
import { SearchInput, Select, SelectOption } from '@cbhq/cds-web/controls';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { HStack, VStack } from '@cbhq/cds-web/layout';

const variantToNamesMap = {
  heroSquare: heroSquareNames,
  spotRectangle: spotRectangleNames,
  spotSquare: spotSquareNames,
  pictogram: pictogramNames,
};

const descriptionMap = {
  heroSquare: heroSquareDescriptionMap,
  spotRectangle: spotRectangleDescriptionMap,
  spotSquare: spotSquareDescriptionMap,
  pictogram: pictogramDescriptionMap,
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
      <HStack spacingVertical={2} gap={2}>
        <SearchInput
          value={query}
          onChangeText={searchOnChange}
          type="text"
          width="70%"
          placeholder="Illustration name"
        />
        <Select
          value={selectedCategory}
          placeholder="Choose something..."
          width="30%"
          onChange={setSelectedCategory}
        >
          {options.map((option) => (
            <SelectOption value={option} key={option} title={option} />
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
                  <VStack alignItems="center" key={filteredName} width={width} overflow="auto">
                    <Illustration type={variant} name={filteredName} dimension={dim} />
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

import React, { useState } from 'react';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import throttle from 'lodash/throttle';
import {
  heroSquareNames,
  pictogramNames,
  spotRectangleNames,
  spotSquareNames,
} from '@cbhq/cds-common/internal/data/illustrationData';
import { illustrationDescriptionGraph } from '@cbhq/cds-common/internal/data/illustrationDescriptionGraph';
import {
  illustrationDimensionDefaults,
  illustrationDimensions,
} from '@cbhq/cds-common/tokens/illustrations';
import {
  IllustrationHeroSquareNames,
  IllustrationPictogramNames,
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
  IllustrationVariant,
} from '@cbhq/cds-common/types/IllustrationNames';
import { SearchInput, Select, SelectOption } from '@cbhq/cds-web/controls';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';

const variantToNamesMap: Record<
  string,
  readonly (
    | IllustrationHeroSquareNames
    | IllustrationSpotRectangleNames
    | IllustrationPictogramNames
    | IllustrationSpotSquareNames
  )[]
> = {
  heroSquare: heroSquareNames,
  spotRectangle: spotRectangleNames,
  spotSquare: spotSquareNames,
  pictogram: pictogramNames,
};

/**
 * Determines whether the name of this illustration is
 * in the selected category
 * @param name - the user search term
 * @param selectedCategory - the category chosen by the user
 * @returns true if this illustration is a subset of the selectedCategory
 */
const nameInCategory = (name: string, selectedCategory: string) => {
  if (selectedCategory === 'all') return true;

  // i.e if category = 'contract'
  // then the categoryNames would be the values of contract in
  // illustrationDescriptionGraphy
  if (selectedCategory in illustrationDescriptionGraph) {
    return illustrationDescriptionGraph[selectedCategory].includes(name);
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
const queryHasMatchingDescription = (query: string, name: string) => {
  if (query === '') return true;

  if (query in illustrationDescriptionGraph) {
    return illustrationDescriptionGraph[query].includes(name);
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
  const options = ['all', 'navigation illustration', 'app switcher', 'logged out'];
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
          return (
            <TabItem key={dim} value={dim}>
              <Box flexWrap="wrap" spacingTop={1} spacingBottom={3}>
                {names
                  .filter((name) => {
                    return (
                      (queryHasMatchingDescription(query, name) &&
                        nameInCategory(name, selectedCategory)) ||
                      (queryIsSubsetOfName(query, name) && nameInCategory(name, selectedCategory))
                    );
                  })
                  .map((filteredName) => (
                    <VStack spacing={3} alignItems="center" key={filteredName}>
                      <Illustration name={filteredName} dimension={dim} />
                      <TextLabel1 align="center" as="p" spacing={2}>
                        {filteredName}
                      </TextLabel1>
                    </VStack>
                  ))}
              </Box>
            </TabItem>
          );
        })}
      </Tabs>
    </>
  );
};

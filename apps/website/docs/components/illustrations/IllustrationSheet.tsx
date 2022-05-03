import { useCallback, useEffect, useMemo, useState } from 'react';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import throttle from 'lodash/throttle';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
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
import { Button, ButtonGroup } from '@cbhq/cds-web/buttons';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { SearchInput, Select, SelectOption } from '@cbhq/cds-web/controls';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Tooltip } from '@cbhq/cds-web/overlays';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';

/**
 * SECTION FOR PROPS
 * */

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

type SearchBarProps = {
  onChangeQuery: (query: string) => void;
  onSelectedCategory: (category: string) => void;
};

type VariantSectionProps = {
  variant: IllustrationVariant;
  query: string;
  selectedCategory: string;
  pagination?: {
    startIdx: number;
    endIdx: number;
  };
};

/**
 * SECTION FOR COMPONENTS
 */

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

export const SearchBar = ({ onChangeQuery, onSelectedCategory }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const options = ['all', 'navigation illustration', 'app switcher', 'logged out'];

  const handleSearchOnChange = throttle((text: string) => {
    setQuery(text);
    onChangeQuery(text);
  }, 1000);

  const handleSelectOnChange = throttle((newValue: string) => {
    setSelectedCategory(newValue);
    onSelectedCategory(newValue);
  });

  return (
    <HStack spacingVertical={2} gap={2}>
      <SearchInput
        value={query}
        onChangeText={handleSearchOnChange}
        type="text"
        width="70%"
        placeholder="Illustration name"
      />
      <Select
        value={selectedCategory}
        placeholder="Choose a category..."
        width="30%"
        onChange={handleSelectOnChange}
      >
        {options.map((option) => (
          <SelectOption value={option} key={option} title={option} />
        ))}
      </Select>
    </HStack>
  );
};

const defaultPagination = { startIdx: 0, endIdx: 10 };
const INCREMENT_SIZE = 10;

/**
 * This renders all the illustration for 1 single variant of illustrations
 */
export const VariantSection = function VariantSection({
  variant,
  query,
  selectedCategory,
  pagination = defaultPagination,
}: VariantSectionProps) {
  const names = variantToNamesMap[variant];
  const dimensions = illustrationDimensions[variant];
  const defaultVal = illustrationDimensionDefaults[variant];
  const [localPagination, setLocalPagination] = useState(pagination);
  const [collapsed, { toggle }] = useToggler(false);

  useEffect(() => {
    setLocalPagination(pagination);
  }, [pagination]);

  const handleShowMore = useCallback(() => {
    setLocalPagination({
      ...localPagination,
      endIdx: localPagination.endIdx + INCREMENT_SIZE,
    });
  }, [localPagination]);

  const handleShowLess = useCallback(() => {
    setLocalPagination({
      ...localPagination,
      endIdx: localPagination.endIdx - INCREMENT_SIZE,
    });
  }, [localPagination]);

  const buttonGroupStyles = useMemo(() => {
    return { paddingBottom: '10px' };
  }, []);

  const filteredNames = useCallback(() => {
    return names.filter((name) => {
      return (
        (queryHasMatchingDescription(query, name) && nameInCategory(name, selectedCategory)) ||
        (queryIsSubsetOfName(query, name) && nameInCategory(name, selectedCategory))
      );
    });
  }, [names, query, selectedCategory]);

  return (
    <VStack>
      <Button variant="secondary" onPress={toggle}>
        {variant}
      </Button>
      <Collapsible collapsed={collapsed}>
        <VStack>
          <Tabs
            defaultValue={defaultVal}
            values={dimensions.map((dim) => ({ label: dim, value: dim }))}
          >
            {dimensions.map((dim) => {
              return (
                <TabItem key={dim} value={dim}>
                  <Box flexWrap="wrap" spacingTop={1} spacingBottom={3}>
                    {filteredNames()
                      .slice(localPagination.startIdx, localPagination.endIdx)
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
          {/** Had to use div here because Box would cause ButtonGroup to shrink */}
          <div style={buttonGroupStyles}>
            <ButtonGroup
              block
              accessibilityLabel="A set of buttons to control showing more or less illustrations"
            >
              <Tooltip content="Clicking show more will show 10 more illustrations">
                <Button block onPress={handleShowMore}>
                  Show more
                </Button>
              </Tooltip>
              <Tooltip content="Click show less will show 10 less illustrations">
                <Button block onPress={handleShowLess}>
                  Show less
                </Button>
              </Tooltip>
            </ButtonGroup>
          </div>
        </VStack>
      </Collapsible>
    </VStack>
  );
};

/**
 * This is the main illustration function.
 * @returns
 */
export const IllustrationSheet = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <>
      <SearchBar onChangeQuery={setQuery} onSelectedCategory={setSelectedCategory} />
      <VStack gap={3}>
        <VariantSection variant="heroSquare" query={query} selectedCategory={selectedCategory} />
        <VariantSection variant="pictogram" query={query} selectedCategory={selectedCategory} />
        <VariantSection variant="spotSquare" query={query} selectedCategory={selectedCategory} />
        <VariantSection variant="spotRectangle" query={query} selectedCategory={selectedCategory} />
      </VStack>
    </>
  );
};

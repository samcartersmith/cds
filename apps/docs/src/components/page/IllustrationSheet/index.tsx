import React, { useCallback, useState } from 'react';
import throttle from 'lodash/throttle';
import {
  HeroSquareDimension,
  IllustrationVariant,
  PictogramDimension,
  SpotIconDimension,
} from '@cbhq/cds-common';
import { TabValue } from '@cbhq/cds-common/tabs/useTabs';
import {
  illustrationDimensionDefaults,
  illustrationDimensions,
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
import { SearchInput } from '@cbhq/cds-web/controls/SearchInput';
import { Select } from '@cbhq/cds-web/controls/Select';
import { SelectOption } from '@cbhq/cds-web/controls/SelectOption';
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
import { Box, Grid, VStack } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Pressable } from '@cbhq/cds-web/system';
import { TextLegal } from '@cbhq/cds-web/typography';

import { SheetTabs } from '../SheetTabs';

import styles from './styles.module.css';

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

export const getOverflowTextStyles = (expanded: boolean) =>
  expanded ? styles.overflow : styles.truncated;

const IllustrationTile = ({
  name,
  variant,
  width,
  dimension,
  idx,
}: {
  name: string;
  variant: IllustrationVariant;
  width: number;
  dimension: string;
  idx: number;
}) => {
  const [shouldOverflow, setShouldOverflow] = useState(false);
  const overflowStyles = getOverflowTextStyles(shouldOverflow);
  const widthString = `${width}px`;
  const heightString = `${width + 20}px`;
  const zIndex = variantToNamesMap[variant].length - idx + 2;
  const toast = useToast();

  const handleCopyToClipboard = useCallback(() => {
    if (navigator) {
      void navigator.clipboard.writeText(name).then(() => {
        toast.show('Copied to clipboard');
      });
    }
  }, [name, toast]);

  return (
    <Pressable
      background="transparent"
      className={styles.tile}
      height={heightString}
      onClick={handleCopyToClipboard}
      width={widthString}
    >
      <VStack
        key={name}
        alignItems="center"
        background="bg"
        height={heightString}
        left={0}
        onMouseEnter={() => setShouldOverflow(true)}
        onMouseLeave={() => setShouldOverflow(false)}
        position="absolute"
        top={0}
        width={widthString}
        zIndex={zIndex}
      >
        {variant === 'heroSquare' && (
          <HeroSquare dimension={dimension as HeroSquareDimension} name={name as HeroSquareName} />
        )}
        {variant === 'spotSquare' && <SpotSquare name={name as SpotSquareName} />}
        {variant === 'spotRectangle' && <SpotRectangle name={name as SpotRectangleName} />}
        {variant === 'pictogram' && (
          <Pictogram dimension={dimension as PictogramDimension} name={name as PictogramName} />
        )}
        {variant === 'spotIcon' && (
          <SpotIcon dimension={dimension as SpotIconDimension} name={name as SpotIconName} />
        )}

        <TextLegal as="p" className={overflowStyles} textAlign="center">
          {name}
        </TextLegal>
      </VStack>
    </Pressable>
  );
};

export const IllustrationSheet = ({ variant }: { variant: IllustrationVariant }) => {
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
  const defaultValue = illustrationDimensionDefaults[variant];
  const [activeTab, setActiveTab] = useState<TabValue | null>({
    id: defaultValue,
    label: defaultValue,
  });

  const searchOnChange = throttle((text: string) => {
    setQuery(text);
  }, 1000);

  const tabs = dimensions.map((dimension) => ({
    id: dimension,
    label: dimension,
  }));

  const handleTabChange = useCallback((tab: TabValue | null) => {
    setActiveTab(tab);
  }, []);

  return (
    <VStack background="bgAlternate" borderRadius={500} gap={2} padding={4}>
      <Grid gap={2} templateColumns="3fr 1fr">
        <SearchInput
          compact
          accessibilityLabel="Filter illustrations by name"
          onChangeText={searchOnChange}
          placeholder="Illustration name"
          type="text"
          value={query}
        />
        <Select
          compact
          onChange={setSelectedCategory}
          placeholder="Choose something..."
          value={selectedCategory}
        >
          {options.map((option) => (
            <SelectOption key={option} title={option} value={option} />
          ))}
        </Select>
      </Grid>
      <VStack gap={2}>
        <SheetTabs
          accessibilityLabel="Select illustration dimension"
          activeTab={activeTab}
          onChange={handleTabChange}
          tabs={tabs}
        />

        {dimensions.map((dimension) => {
          const width = parseInt(dimension.split('x')[0]);
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
            <Box
              key={dimension}
              background="bg"
              borderRadius={500}
              display={activeTab?.id === dimension ? 'block' : 'none'}
              padding={2}
            >
              {filteredNames.length > 0 ? (
                <Grid columnMin={`${width}px`} gap={2} maxHeight={700} overflow="scroll">
                  {filteredNames.map((filteredName, idx) => (
                    <IllustrationTile
                      key={filteredName}
                      dimension={dimension}
                      idx={idx}
                      name={filteredName}
                      variant={variant}
                      width={width}
                    />
                  ))}
                </Grid>
              ) : (
                <VStack alignItems="center" paddingY={4}>
                  <TextLegal color="fg">No results found</TextLegal>
                </VStack>
              )}
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};

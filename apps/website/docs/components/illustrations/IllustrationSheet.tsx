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
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';
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

const queryMatchesName = (query: string, name: string) => {
  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');
  const nameRe = new RegExp(name.toLowerCase(), 'gi');

  const matchedIconNames: string[] = [];

  if (query in illustrationDescriptionGraph) {
    matchedIconNames.push(...illustrationDescriptionGraph[query]);
  }

  return name.match(queryRe) !== null || matchedIconNames.join(' ').match(nameRe) !== null;
};

export const IllustrationSheet = function IllustrationSheet({
  variant,
}: {
  variant: IllustrationVariant;
}) {
  const [query, setQuery] = useState('');
  const names = variantToNamesMap[variant];
  const dimensions = illustrationDimensions[variant];
  const defaultVal = illustrationDimensionDefaults[variant];

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  return (
    <>
      <Box flexWrap="wrap" spacingVertical={2}>
        <TextInput
          onChange={searchOnChange}
          type="text"
          placeholder="Illustration name"
          label="Filter Illustrations"
        />
      </Box>

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
                    return queryMatchesName(query, name);
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

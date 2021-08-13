import React, { useState } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import {
  IllustrationHeroSquareNames,
  IllustrationSpotRectangleNames,
  IllustrationPictogramNames,
  IllustrationSpotSquareNames,
  IllustrationVariant,
} from '@cbhq/cds-common/types/Illustration';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';
import {
  heroSquareNames,
  spotRectangleNames,
  spotSquareNames,
  pictogramNames,
} from '@cbhq/cds-website/data/illustrationData';
import { cx } from 'linaria';
import throttle from 'lodash/throttle';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import { elevation, searchBox } from '../icons/styles';

const variantToNamesMap: {
  [keys: string]: readonly (
    | IllustrationHeroSquareNames
    | IllustrationSpotRectangleNames
    | IllustrationPictogramNames
    | IllustrationSpotSquareNames
  )[];
} = {
  heroSquare: heroSquareNames,
  spotRectangle: spotRectangleNames,
  spotSquare: spotSquareNames,
  pictogram: pictogramNames,
};

export const IllustrationSheet = function IllustrationSheet({
  variant,
}: {
  variant: IllustrationVariant;
}) {
  const [query, setQuery] = useState('');
  const names = variantToNamesMap[variant];
  const dimensions = illustrationSizes[variant];
  const defaultVal = Object.keys(dimensions)[0];

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  return (
    <ThemeProvider>
      <Box flexWrap="wrap" spacingVertical={2}>
        <input
          className={cx(elevation, searchBox)}
          onChange={searchOnChange}
          type="text"
          placeholder="Search Illustration Here"
        />
      </Box>

      <Tabs
        defaultValue={defaultVal}
        values={Object.keys(dimensions).map(dim => ({ label: dim, value: dim }))}
      >
        {Object.keys(dimensions).map(dim => {
          const { width, height } = dimensions[dim as never];

          return (
            <TabItem key={dim} value={dim}>
              <Box flexWrap="wrap" spacingTop={1} spacingBottom={3}>
                {names
                  .filter(name => name.includes(query))
                  .map(filteredName => (
                    <VStack spacing={3} alignItems="center" key={filteredName}>
                      <Illustration name={filteredName} width={width} height={height} />
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
    </ThemeProvider>
  );
};

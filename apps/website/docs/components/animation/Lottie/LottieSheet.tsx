import React, { useState } from 'react';
import throttle from 'lodash/throttle';
import * as animations from '@cbhq/cds-lottie-files';
import { LottieSource } from '@cbhq/cds-lottie-files/LottieSource';
import { mapValues } from '@cbhq/cds-utils';
import { Lottie } from '@cbhq/cds-web/animation/Lottie';
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { Box } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';

export const LottieSheet = function LottieSheet() {
  const [query, setQuery] = useState('');
  const names: Record<string, { name: string; source: LottieSource }> = mapValues(
    animations,
    (source, name) => ({ name, source }),
  );

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  return (
    <>
      <Box flexWrap="wrap" spacingVertical={2}>
        <TextInput
          onChange={searchOnChange}
          type="text"
          placeholder="Animation name"
          label="Filter Animations"
        />
      </Box>

      <Box flexWrap="wrap" spacingTop={1} spacingBottom={3}>
        <Box flexWrap="wrap" spacing={1}>
          {Object.keys(names)
            .filter((name) => name.includes(query))
            .map((filteredName) => (
              <VStack spacing={3} alignItems="center" key={filteredName}>
                <Lottie
                  autoplay
                  loop
                  key={names[filteredName].name}
                  source={names[filteredName].source}
                  width={200}
                  height={200}
                />
                <TextLabel1 align="center" as="p" spacing={2}>
                  {filteredName}
                </TextLabel1>
              </VStack>
            ))}
        </Box>
      </Box>
    </>
  );
};

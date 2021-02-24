import React from 'react';

import { Box, TextHeadline, HStack, Icon, FiatIcon, iconGlyphMap } from '@cbhq/cds-mobile';
import { entries } from '@cbhq/cds-utils';

import Example from './internal/Example';
import Screen from './internal/Screen';

const IconScreen = () => {
  return (
    <Screen>
      <Example>
        <Box spacing={1}>
          <TextHeadline>FiatIcon</TextHeadline>
          <HStack>
            <FiatIcon currencyCode="USD" />
            <FiatIcon currencyCode="EUR" />
            <FiatIcon currencyCode="GBP" />
            <FiatIcon currencyCode="JPY" />
          </HStack>
          <HStack flexWrap="wrap">
            {entries(iconGlyphMap).map(([name]) => (
              <Icon bordered spacingEnd={1} spacingBottom={1} key={name} size="l" name={name} />
            ))}
          </HStack>
        </Box>
      </Example>
    </Screen>
  );
};

export default IconScreen;

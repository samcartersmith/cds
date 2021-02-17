import React from 'react';

import { Box, Icon, FiatIcon, iconGlyphMap, TextBody, TextHeadline, HStack } from '@cds/mobile';
import { entries } from '@cds/utils';

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
          {entries(iconGlyphMap[32]).map(([name]) => (
            <Box key={name} width={200}>
              <TextBody>{name}</TextBody>
              <Icon size="l" name={name} />
            </Box>
          ))}
        </Box>
      </Example>
    </Screen>
  );
};

export default IconScreen;

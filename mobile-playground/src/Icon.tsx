import React from 'react';

import {
  Box,
  TextBody,
  TextHeadline,
  HStack,
  Icon,
  FiatIcon,
  iconGlyphMap,
} from '@cbhq/cds-mobile';
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
          {entries(iconGlyphMap).map(([name]) => (
            <Box key={name} width={200}>
              <TextBody>{name[32]}</TextBody>
              <Icon size="l" name={name} />
            </Box>
          ))}
        </Box>
      </Example>
    </Screen>
  );
};

export default IconScreen;

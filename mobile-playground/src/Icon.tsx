import React from 'react';

import { FiatIcon } from '@cbhq/cds-mobile/icons/FiatIcon';
import { Icon } from '@cbhq/cds-mobile/icons/Icon';
import { iconGlyphMap } from '@cbhq/cds-mobile/icons/iconGlyphMap';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';
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

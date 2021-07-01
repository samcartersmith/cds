import React from 'react';
import { createIconSheet, CreateIconSheetParams } from '@cbhq/cds-storybook/stories/IconSheet';
import { Icon } from '@cbhq/cds-mobile/icons/Icon';
import { HStack, VStack } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';

import { TextBody, TextHeadline } from '@cbhq/cds-mobile/typography';
import { FiatIcon, TextIcon } from '@cbhq/cds-mobile/icons';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

export const { IconSheet } = createIconSheet({
  Icon,
  HStack,
  ThemeProvider,
} as CreateIconSheetParams);

const IconScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Nesting icons">
        <VStack gap={1}>
          <TextBody align="end">
            <TextIcon name="dot" size="xs" />
            <TextBody>This is some text</TextBody>
          </TextBody>
          <TextBody align="end">
            <TextIcon name="dot" size="xs" />
            <TextBody>
              This is soooooooooooooome reallllllllllllllllly loooooooonnngggggg text
            </TextBody>
          </TextBody>
        </VStack>
      </Example>
      <Example title="Fiat Icons">
        <HStack gap={2}>
          <FiatIcon currencyCode="USD" />
          <FiatIcon currencyCode="EUR" />
          <FiatIcon currencyCode="GBP" />
          <FiatIcon currencyCode="JPY" />
        </HStack>
      </Example>
      <Example title="Icon Sheet">
        <IconSheet />
      </Example>
    </ExamplesScreen>
  );
};

export default IconScreen;

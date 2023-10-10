import React, { memo } from 'react';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';

export type FeaturesBlockProps = { features: string[] };

/**
 * Not being used yet. This might be used at top of Component pages to highlight
 * some of it's features similiar to what
 * [radix UI](https://www.radix-ui.com/docs/primitives/components/accordion) does
 */
const FeaturesBlock = memo(function FeaturesBlock({ features }: FeaturesBlockProps) {
  return (
    <HStack>
      <VStack alignItems="center">
        {features.map((item) => (
          <HStack key={item}>
            <Icon color="primary" name="checkmark" size="m" />
            <TextBody as="span">{item}</TextBody>
          </HStack>
        ))}
      </VStack>
    </HStack>
  );
});

export default FeaturesBlock;

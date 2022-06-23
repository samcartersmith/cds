import React, { memo } from 'react';
import type { LandingPageProjectCategoriesProps } from '@theme/LandingPageProjectCategories';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Box } from '@cbhq/cds-web/layout/Box';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Link } from '@cbhq/cds-web/typography/Link';
import { TextHeadline } from '@cbhq/cds-web/typography/TextHeadline';

const LandingPageProjectCategories = memo(function LandingPageProjectCategories({
  label,
  items: categoryItems,
}: LandingPageProjectCategoriesProps) {
  return (
    <HStack minHeight={600}>
      <Box spacing={gutter} width="50%" borderedEnd>
        <h3 className="project-categories-title">{label}</h3>
      </Box>
      <VStack spacing={gutter} gap={gutter} width="50%">
        {categoryItems.map(({ label: categoryItemLabel, items }) => {
          return (
            <HStack key={categoryItemLabel}>
              <Box width="25%">
                <TextHeadline as="p">{categoryItemLabel}</TextHeadline>
              </Box>
              <VStack>
                {items.map((item) => (
                  <Link key={item.label} to={item.href} variant="title4" openInNewWindow underline>
                    {item.label}
                  </Link>
                ))}
              </VStack>
            </HStack>
          );
        })}
      </VStack>
    </HStack>
  );
});

export default LandingPageProjectCategories;

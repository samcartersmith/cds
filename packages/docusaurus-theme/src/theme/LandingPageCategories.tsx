import React, { memo } from 'react';
import { LandingPageCategoriesProps } from '@theme/LandingPageCategories';
import LandingPageCategoryItem from '@theme/LandingPageCategoryItem';
import { CardGroup } from '@cbhq/cds-web/alpha/CardGroup';
import { Divider } from '@cbhq/cds-web/layout/Divider';

function VerticalDivider() {
  return <Divider direction="vertical" />;
}

const LandingPageCategories = memo(function LandingPageCategories({
  categories,
}: LandingPageCategoriesProps) {
  if (categories) {
    return (
      <CardGroup divider={VerticalDivider} direction="horizontal" justifyContent="space-between">
        {categories.map((item) => (
          <LandingPageCategoryItem key={item.title} {...item} />
        ))}
      </CardGroup>
    );
  }
  return null;
});

export default LandingPageCategories;

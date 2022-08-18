import React, { memo } from 'react';
import { CardGroup } from '@cbhq/cds-web/alpha/CardGroup';
import { Divider } from '@cbhq/cds-web/layout/Divider';

import LandingPageCategoryItem, { LandingPageCategoryItemProps } from './LandingPageCategoryItem';

export type LandingPageCategoriesProps = {
  categories?: LandingPageCategoryItemProps[];
};

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

import React, { memo } from 'react';
import type { PictogramName, SpotSquareName } from '@cbhq/cds-common';
import { CardBody } from '@cbhq/cds-web/alpha/CardBody';
import { Pictogram, SpotSquare } from '@cbhq/cds-web/illustrations';
import { Box } from '@cbhq/cds-web/layout/Box';
import useGoToLinkHandler from '@cbhq/docusaurus-theme/src/theme/useGoToLinkHandler';

export type LandingPageCategoryItemProps = {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  /** The name of the Pictogram Illustration to use in CardMedia. */
  pictogram?: PictogramName;
  /** The name of the SpotSquare Illustration to use in CardMedia. */
  spotSquare?: SpotSquareName;
};

const LandingPageCategoryItem = memo(function LandingPageCategoryItem({
  title,
  description,
  actionLabel,
  href,
  pictogram,
  spotSquare,
}: LandingPageCategoryItemProps) {
  const handlePress = useGoToLinkHandler(href);
  return (
    <Box width="100%">
      <CardBody
        actionLabel={actionLabel}
        description={description}
        justifyContent="space-between"
        media={
          <Box spacingStart={3}>
            {pictogram && <Pictogram name={pictogram} />}
            {spotSquare && <SpotSquare name={spotSquare} />}
          </Box>
        }
        mediaPlacement="above"
        onActionPress={handlePress}
        title={title}
      />
    </Box>
  );
});

export default LandingPageCategoryItem;

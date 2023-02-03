import React, { memo } from 'react';
import type { PictogramName, SpotSquareName } from '@cbhq/cds-common';
import { CardBody } from '@cbhq/cds-web/alpha/CardBody';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
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
        title={title}
        description={description}
        mediaPlacement="above"
        media={
          <Box spacingStart={3}>
            {pictogram && <Illustration type="pictogram" name={pictogram} dimension="48x48" />}
            {spotSquare && <Illustration type="spotSquare" name={spotSquare} dimension="48x48" />}
          </Box>
        }
        actionLabel={actionLabel}
        justifyContent="space-between"
        onActionPress={handlePress}
      />
    </Box>
  );
});

export default LandingPageCategoryItem;

import React, { memo } from 'react';
import type { IllustrationNames } from '@cbhq/cds-common';
import { CardBody } from '@cbhq/cds-web/alpha/CardBody';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box } from '@cbhq/cds-web/layout/Box';
import useGoToLinkHandler from '@cbhq/docusaurus-theme/src/theme/useGoToLinkHandler';

export type LandingPageCategoryItemProps = {
  title: string;
  description: string;
  illustration: IllustrationNames;
  actionLabel: string;
  href: string;
};

type LandingIllustrationProps = { name: IllustrationNames };

function LandingIllustration({ name }: LandingIllustrationProps) {
  return (
    <Box spacingStart={3}>
      <Illustration name={name} dimension="48x48" />
    </Box>
  );
}

const LandingPageCategoryItem = memo(function LandingPageCategoryItem({
  title,
  description,
  illustration,
  actionLabel,
  href,
}: LandingPageCategoryItemProps) {
  const handlePress = useGoToLinkHandler(href);
  return (
    <Box width="100%">
      <CardBody
        title={title}
        description={description}
        mediaPlacement="above"
        media={<LandingIllustration name={illustration} />}
        actionLabel={actionLabel}
        justifyContent="space-between"
        onActionPress={handlePress}
      />
    </Box>
  );
});

export default LandingPageCategoryItem;

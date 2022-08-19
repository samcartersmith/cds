import React, { memo } from 'react';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { join } from '@cbhq/cds-common';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Link, TextBody, TextTitle2 } from '@cbhq/cds-web/typography';

import { LinkFields } from '../misc/Link';
import { MediaAssetFields } from '../misc/MediaAsset';
import figmaIcon from '../static/images/figma.png';
import storybookIcon from '../static/images/storybook.png';

export type OverviewFields = {
  title: string;
  description?: string;
  figmaLink?: string;
  storybookLink?: string;
  relatedComponents?: Entry<LinkFields>[];
  heroImage?: Entry<MediaAssetFields>;
};

export const Overview = memo(function Overview({
  description,
  figmaLink,
  storybookLink,
  relatedComponents,
  heroImage,
}: OverviewFields) {
  return (
    <VStack spacingBottom={9}>
      {description && (
        <TextTitle2 as="h2" color="foregroundMuted" spacingTop={2}>
          {description}
        </TextTitle2>
      )}
      <HStack gap={3} spacingTop={6}>
        {figmaLink && (
          <HStack gap={1} alignItems="center">
            <img src={figmaIcon} alt="figma icon" />
            <Link to={figmaLink} variant="headline" openInNewWindow>
              Figma
            </Link>
          </HStack>
        )}
        {storybookLink && (
          <HStack gap={1} alignItems="center">
            <img src={storybookIcon} alt="storybook icon" />
            <Link to={storybookLink} variant="headline" openInNewWindow>
              Storybook
            </Link>
          </HStack>
        )}
      </HStack>
      {relatedComponents && (
        <HStack spacingTop={5}>
          <TextBody as="p" color="foregroundMuted">
            Related components:{' '}
            {join(
              relatedComponents.map((relatedComponent) => (
                // ID: miscLink
                <CMSContent content={relatedComponent} />
              )),
              ', ',
            )}
          </TextBody>
        </HStack>
      )}
      {heroImage && (
        <Box spacingTop={4}>
          {/* ID: miscMediaAsset */}
          <CMSContent content={heroImage} />
        </Box>
      )}
    </VStack>
  );
});

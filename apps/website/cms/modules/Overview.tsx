import React, { memo } from 'react';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { join } from '@cbhq/cds-common';
import { Icon } from '@cbhq/cds-web/icons';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Link, TextBody, TextHeadline, TextLegal, TextTitle2 } from '@cbhq/cds-web/typography';

import { AttributionFields } from '../misc/Attribution';
import { LinkFields } from '../misc/Link';
import { MediaAssetFields } from '../misc/MediaAsset';
import { RichText, RichTextProps } from '../misc/RichText';
import figmaIcon from '../static/images/figma.png';
import storybookIcon from '../static/images/storybook.png';

export type OverviewFields = {
  title: string;
  description?: Document;
  figmaLink?: string;
  storybookLink?: string;
  relatedComponents?: Entry<LinkFields>[];
  heroImage?: Entry<MediaAssetFields>;
  devPortalLink?: string;
  stringComponentsLink?: string;
  engAttribution?: Entry<AttributionFields>;
  designAttribution?: Entry<AttributionFields>;
  lastRevised?: string;
};

const richTextOptions: RichTextProps['options'] = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <TextTitle2 as="h2" color="foregroundMuted" spacingTop={2}>
        {children}
      </TextTitle2>
    ),
  },
};

export const Overview = memo(function Overview({
  description,
  figmaLink,
  storybookLink,
  relatedComponents,
  heroImage,
  devPortalLink,
  stringComponentsLink,
  engAttribution,
  designAttribution,
  lastRevised,
}: OverviewFields) {
  return (
    <VStack spacingBottom={9}>
      <RichText content={description} options={richTextOptions} />
      {(figmaLink || storybookLink || devPortalLink || stringComponentsLink) && (
        <HStack gap={3} spacingTop={6}>
          {figmaLink && (
            <HStack alignItems="center" gap={1}>
              <img alt="figma icon" src={figmaIcon} />
              <Link openInNewWindow to={figmaLink} variant="headline">
                Figma
              </Link>
            </HStack>
          )}
          {storybookLink && (
            <HStack alignItems="center" gap={1}>
              <img alt="storybook icon" src={storybookIcon} />
              <Link openInNewWindow to={storybookLink} variant="headline">
                Storybook
              </Link>
            </HStack>
          )}
          {devPortalLink && (
            <HStack alignItems="center" gap={1}>
              <TextHeadline as="span">👾</TextHeadline>
              <Link openInNewWindow to={devPortalLink} variant="headline">
                DevPortal
              </Link>
            </HStack>
          )}
          {stringComponentsLink && (
            <HStack alignItems="center" gap={1}>
              <TextHeadline as="span">️️✏️</TextHeadline>
              <Link openInNewWindow to={stringComponentsLink} variant="headline">
                String components
              </Link>
            </HStack>
          )}
        </HStack>
      )}
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
      {(engAttribution || designAttribution) && (
        <HStack gap={2} spacingTop={5}>
          {/* ID: miscAttribution */}
          {engAttribution && <CMSContent content={engAttribution} />}
          {/* ID: miscAttribution */}
          {designAttribution && <CMSContent content={designAttribution} />}
        </HStack>
      )}
      {heroImage && (
        <Box spacingTop={5}>
          {/* ID: miscMediaAsset */}
          <CMSContent content={heroImage} />
        </Box>
      )}
      {lastRevised && (
        <HStack gap={0.5} spacingTop={3}>
          <Icon color="foregroundMuted" name="clockOutline" size="s" />
          <TextLegal as="p" color="foregroundMuted">
            Last revised {lastRevised}
          </TextLegal>
        </HStack>
      )}
    </VStack>
  );
});

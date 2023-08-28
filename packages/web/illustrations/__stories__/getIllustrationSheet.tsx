import React, { memo } from 'react';
import type {
  HeroSquareDimension,
  IllustrationNamesMap,
  IllustrationVariant,
  PictogramDimension,
  Spectrum,
} from '@cbhq/cds-common';
import { illustrationDimensions, illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { HStack } from '../../alpha/HStack';
import { VStack } from '../../layout';
import { FeatureFlagProvider } from '../../system';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextLegal } from '../../typography';
import {
  HeroSquare,
  HeroSquareName,
  Pictogram,
  PictogramName,
  SpotRectangle,
  SpotRectangleName,
  SpotSquare,
  SpotSquareName,
} from '../index';

const SIZES = {
  pictogram: {
    height: illustrationSizes[illustrationDimensions.pictogram[0]][1],
    width: illustrationSizes[illustrationDimensions.pictogram[0]][0],
    scaleMultiplier: 1,
  },
  spotSquare: {
    height: illustrationSizes[illustrationDimensions.spotSquare[0]][1],
    width: illustrationSizes[illustrationDimensions.spotSquare[0]][0],
    scaleMultiplier: 0.4,
  },
  spotRectangle: {
    height: illustrationSizes[illustrationDimensions.spotRectangle[0]][1],
    width: illustrationSizes[illustrationDimensions.spotRectangle[0]][0],
    scaleMultiplier: 0.3,
  },
  heroSquare: {
    height: illustrationSizes[illustrationDimensions.heroSquare[0]][1],
    width: illustrationSizes[illustrationDimensions.heroSquare[0]][0],
    scaleMultiplier: 0.24,
  },
};

function keys<T>(obj: { [key in keyof T]: T[key] }) {
  return Object.keys(obj) as unknown as Extract<keyof T, string>[];
}

const images = {
  heroSquare: keys(heroSquareVersionMap),
  pictogram: keys(pictogramVersionMap),
  spotRectangle: keys(spotRectangleVersionMap),
  spotSquare: keys(spotSquareVersionMap),
};

export function getIllustrationSheet<Type extends IllustrationVariant>(type: Type) {
  type IllustrationName = IllustrationNamesMap[Type];

  const names = images[type] as IllustrationName[];
  type DataItem = { name: IllustrationName; spectrum: Spectrum };

  const data: DataItem[] = [];

  names.forEach((name) => {
    data.push({
      name,
      spectrum: 'light' as const,
    });
    data.push({
      name,
      spectrum: 'dark' as const,
    });
  });

  const renderItem = ({ name, spectrum }: DataItem) => {
    const dim = `${SIZES[type].width}x${SIZES[type].height}` as const;
    return (
      <ThemeProvider scale="xSmall" spectrum={spectrum}>
        <VStack
          key={`${name}-${spectrum}`}
          background
          gap={1}
          alignItems="flex-start"
          width={SIZES[type].width * SIZES[type].scaleMultiplier}
          height={SIZES[type].height * SIZES[type].scaleMultiplier + 20}
          overflow="hidden"
        >
          {type === 'heroSquare' && (
            // render a 48x48 thumbnail
            <HeroSquare
              name={name as HeroSquareName}
              dimension={dim as HeroSquareDimension}
              scaleMultiplier={SIZES.heroSquare.scaleMultiplier}
            />
          )}
          {type === 'spotSquare' && (
            // render a 48x48 thumbnail
            <SpotSquare
              name={name as SpotSquareName}
              scaleMultiplier={SIZES.spotSquare.scaleMultiplier}
            />
          )}
          {type === 'spotRectangle' && (
            // render a 72x36 thumbnail
            <SpotRectangle
              name={name as SpotRectangleName}
              scaleMultiplier={SIZES.spotRectangle.scaleMultiplier}
            />
          )}
          {type === 'pictogram' && (
            <Pictogram
              name={name as PictogramName}
              dimension={dim as PictogramDimension}
              scaleMultiplier={SIZES.pictogram.scaleMultiplier}
            />
          )}
          <TextLegal as="p" noWrap>
            {name}
          </TextLegal>
        </VStack>
      </ThemeProvider>
    );
  };

  const IllustrationSheet = memo(function IllustrationSheet() {
    return (
      <FeatureFlagProvider flexGap>
        <HStack
          flexWrap="wrap"
          gap={2}
          spacingVertical={1}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {data.map(renderItem)}
        </HStack>
      </FeatureFlagProvider>
    );
  });

  return () => <IllustrationSheet />;
}

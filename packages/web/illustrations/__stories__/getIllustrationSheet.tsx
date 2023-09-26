import React, { memo } from 'react';
import type { IllustrationNamesMap, IllustrationVariant, Spectrum } from '@cbhq/cds-common';
import { illustrationDimensions, illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotIconVersionMap from '@cbhq/cds-illustrations/__generated__/spotIcon/data/versionMap';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { HStack } from '../../alpha/HStack';
import { VStack } from '../../alpha/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextLegal } from '../../typography';

type TypeMap = {
  [K in IllustrationVariant]: {
    versionMap: Record<IllustrationNamesMap[K], number>;
    sizes: {
      height: number;
      width: number;
      scaleMultiplier: number;
    };
  };
};

const typeMap: TypeMap = {
  heroSquare: {
    versionMap: heroSquareVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.heroSquare[0]][1],
      width: illustrationSizes[illustrationDimensions.heroSquare[0]][0],
      scaleMultiplier: 0.3,
    },
  },
  pictogram: {
    versionMap: pictogramVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.pictogram[0]][1],
      width: illustrationSizes[illustrationDimensions.pictogram[0]][0],
      scaleMultiplier: 1.5,
    },
  },
  spotIcon: {
    versionMap: spotIconVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.spotIcon[0]][1],
      width: illustrationSizes[illustrationDimensions.spotIcon[0]][0],
      scaleMultiplier: 2.25,
    },
  },
  spotRectangle: {
    versionMap: spotRectangleVersionMap,
    sizes: {
      // render a 144x72 thumbnail
      height: illustrationSizes[illustrationDimensions.spotRectangle[0]][1],
      width: illustrationSizes[illustrationDimensions.spotRectangle[0]][0],
      scaleMultiplier: 0.6,
    },
  },
  spotSquare: {
    versionMap: spotSquareVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.spotSquare[0]][1],
      width: illustrationSizes[illustrationDimensions.spotSquare[0]][0],
      scaleMultiplier: 0.75,
    },
  },
};

type IllustrationSheetProps<Type> = {
  type: Type;
  startIndex?: number;
  endIndex?: number;
};

export function getIllustrationSheet<Type extends IllustrationVariant>({
  type,
  startIndex,
  endIndex,
}: IllustrationSheetProps<Type>) {
  type IllustrationName = IllustrationNamesMap[Type];
  type DataItem = { name: IllustrationName; spectrum: Spectrum };
  type LocalIllustrationProps = { spectrum: Spectrum; name: IllustrationName; version: number };

  const { versionMap, sizes } = typeMap[type];
  const width = sizes.width * sizes.scaleMultiplier;
  const height = sizes.height * sizes.scaleMultiplier;

  const data = (Object.keys(versionMap) as IllustrationName[])
    .slice(startIndex, endIndex)
    .reduce(
      (acc: DataItem[], name) => [
        ...acc,
        { name, spectrum: 'light' as const },
        { name, spectrum: 'dark' as const },
      ],
      [],
    );

  const LocalIllustration = memo(function LocalIllustration({
    spectrum,
    name,
    version,
  }: LocalIllustrationProps) {
    const svgPath = `@cbhq/cds-illustrations/__generated__/${type}/svg/${spectrum}/${name}-${version}.svg`;

    return <img src={svgPath} alt={name} width={width} height={height} />;
  });

  const renderItem = ({ name, spectrum }: DataItem) => {
    return (
      <ThemeProvider key={`${name}-${spectrum}`} scale="xSmall" spectrum={spectrum}>
        <VStack
          background
          gap={1}
          alignItems="flex-start"
          width={width}
          height={height + 20}
          overflow="hidden"
        >
          <LocalIllustration spectrum={spectrum} name={name} version={versionMap[name]} />
          <TextLegal as="p" noWrap>
            {name}
          </TextLegal>
        </VStack>
      </ThemeProvider>
    );
  };

  const IllustrationSheet = memo(function IllustrationSheet() {
    return (
      <HStack
        flexWrap="wrap"
        gap={2}
        spacingVertical={1}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {data.map(renderItem)}
      </HStack>
    );
  });

  return () => <IllustrationSheet />;
}

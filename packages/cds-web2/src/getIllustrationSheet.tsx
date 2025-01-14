/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import React, { memo } from 'react';
import type { ColorScheme } from '@cbhq/cds-common2/core/theme';
import { illustrationDimensions, illustrationSizes } from '@cbhq/cds-common2/tokens/illustrations';
import type { IllustrationVariant } from '@cbhq/cds-common2/types/IllustrationNames';
import type { IllustrationNamesMap } from '@cbhq/cds-common2/types/IllustrationProps';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotIconVersionMap from '@cbhq/cds-illustrations/__generated__/spotIcon/data/versionMap';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { HStack } from './layout/HStack';
import { VStack } from './layout/VStack';
import { Text } from './text/Text';

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
  type DataItem = { name: IllustrationName; colorScheme: ColorScheme };
  type LocalIllustrationProps = {
    colorScheme: ColorScheme;
    name: IllustrationName;
    version: number;
  };

  const { versionMap, sizes } = typeMap[type];
  const width = sizes.width * sizes.scaleMultiplier;
  const height = sizes.height * sizes.scaleMultiplier;

  const data = (Object.keys(versionMap) as IllustrationName[])
    .slice(startIndex, endIndex)
    .reduce(
      (acc: DataItem[], name) => [
        ...acc,
        { name, colorScheme: 'light' as const },
        { name, colorScheme: 'dark' as const },
      ],
      [],
    );

  const LocalIllustration = memo(function LocalIllustration({
    colorScheme,
    name,
    version,
  }: LocalIllustrationProps) {
    // TO DO: svgPath pulled from local repo previously from generated illustrations which are obtained via figma-sync script
    // To DO: requires resolving storybook and static dir imports
    // const svgPath = `@cbhq/cds-illustrations/src/__generated__/${type}/svg/${colorScheme}/${name}-${version}.svg`

    const svgPath = `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${colorScheme}/${name}-${version}.svg`;

    return <img alt={name} height={height} src={svgPath} width={width} />;
  });

  const renderItem = ({ name, colorScheme }: DataItem) => {
    return (
      <VStack
        alignItems="flex-start"
        background="background"
        gap={1}
        height={height + 20}
        overflow="hidden"
        width={width}
      >
        <LocalIllustration colorScheme={colorScheme} name={name} version={versionMap[name]} />
        <Text as="p" style={{ whiteSpace: 'nowrap' }}>
          {name}
        </Text>
      </VStack>
    );
  };

  const IllustrationSheet = memo(function IllustrationSheet() {
    return (
      <HStack
        alignItems="flex-start"
        flexWrap="wrap"
        gap={2}
        justifyContent="flex-start"
        paddingY={1}
      >
        {data.map(renderItem)}
      </HStack>
    );
  });

  return <IllustrationSheet />;
}

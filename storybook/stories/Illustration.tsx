import {
  HeroSquareProps,
  PictogramProps,
  SpotRectangleProps,
  SpotSquareProps,
} from '@cbhq/cds-common/types/IllustrationProps';
import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import React from 'react';
import { BoxBaseProps, StackBaseProps, TextBaseProps } from '@cbhq/cds-common';
import {
  heroSquareNames,
  pictogramNames,
  spotRectangleNames,
  spotSquareNames,
} from '../data/illustrationData';

export function createStories(
  Pictogram: React.ComponentType<PictogramProps>,
  SpotSquare: React.ComponentType<SpotSquareProps>,
  SpotRectangle: React.ComponentType<SpotRectangleProps>,
  HeroSquare: React.ComponentType<HeroSquareProps>,
  HStack: React.ComponentType<BoxBaseProps & StackBaseProps>,
  VStack: React.ComponentType<BoxBaseProps & StackBaseProps>,
  Box: React.ComponentType<BoxBaseProps>,
  TextLabel1: React.ComponentType<TextBaseProps>,
) {
  const ListPictograms = () => (
    <>
      {pictogramNames.map(name => {
        return (
          <VStack key={`${name}_pictogram`}>
            <TextLabel1>{name}</TextLabel1>
            <HStack gap={1}>
              {Object.keys(illustrationSizes.pictogram).map(dimension => (
                <Pictogram
                  key={`${name}_pictogram_${dimension}`}
                  name={name}
                  dimension={dimension as never}
                />
              ))}
            </HStack>
          </VStack>
        );
      })}
    </>
  );

  const ListHeroSquares = () => (
    <>
      {heroSquareNames.map(name => {
        return (
          <VStack key={`${name}_heroSquare`}>
            <TextLabel1>{name}</TextLabel1>
            <HStack gap={1}>
              {Object.keys(illustrationSizes.heroSquare).map(dimension => (
                <HeroSquare
                  key={`${name}_heroSquare_${dimension}`}
                  name={name}
                  dimension={dimension as never}
                />
              ))}
            </HStack>
          </VStack>
        );
      })}
    </>
  );

  const ListSpotSquares = () => (
    <>
      {spotSquareNames.map(name => {
        return (
          <VStack key={`${name}_spotSquare`}>
            <TextLabel1>{name}</TextLabel1>
            <HStack gap={1}>
              {Object.keys(illustrationSizes.spotSquare).map(dimension => (
                <SpotSquare
                  key={`${name}_spotSquare_${dimension}`}
                  name={name}
                  dimension={dimension as never}
                />
              ))}
            </HStack>
          </VStack>
        );
      })}
    </>
  );

  const ListSpotRectangles = () => (
    <>
      {spotRectangleNames.map(name => {
        return (
          <VStack key={`${name}_spotRectangle`}>
            <TextLabel1>{name}</TextLabel1>
            <HStack gap={1}>
              {Object.keys(illustrationSizes.spotRectangle).map(dimension => (
                <SpotRectangle
                  key={`${name}_spotRectangle_${dimension}`}
                  name={name}
                  dimension={dimension as never}
                />
              ))}
            </HStack>
          </VStack>
        );
      })}
    </>
  );

  return {
    ListPictograms,
    ListHeroSquares,
    ListSpotSquares,
    ListSpotRectangles,
  };
}

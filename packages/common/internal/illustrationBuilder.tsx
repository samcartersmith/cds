import React from 'react';

import { illustrationDimensions } from '../tokens/illustrations';
import type {
  BoxBaseProps,
  HeroSquareProps,
  PictogramProps,
  SpotRectangleProps,
  SpotSquareProps,
  StackBaseProps,
  TextBaseProps,
} from '../types';

import {
  heroSquareNames,
  pictogramNames,
  spotRectangleNames,
  spotSquareNames,
} from './data/illustrationData';

export function illustrationBuilder(
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
      {pictogramNames.map((name) => {
        return (
          <VStack key={`${name}_pictogram`}>
            <TextLabel1>{name}</TextLabel1>
            <VStack gap={1}>
              {illustrationDimensions.pictogram.map((dimension) => (
                <VStack key={`${name}_pictogram_${dimension}`}>
                  <Pictogram name={name} dimension={dimension} />
                  <TextLabel1>{dimension}</TextLabel1>
                </VStack>
              ))}
              <VStack>
                <Pictogram name={name} scaleMultiplier={1.5} />
                <TextLabel1>Scale to 1.5</TextLabel1>
              </VStack>
            </VStack>
          </VStack>
        );
      })}
    </>
  );

  const ListHeroSquares = () => (
    <>
      {heroSquareNames.map((name) => {
        return (
          <VStack key={`${name}_heroSquare`}>
            <TextLabel1>{name}</TextLabel1>
            <VStack gap={1}>
              {illustrationDimensions.heroSquare.map((dimension) => (
                <VStack key={`${name}_heroSquare_${dimension}`}>
                  <HeroSquare name={name} dimension={dimension} />
                  <TextLabel1>{dimension}</TextLabel1>
                </VStack>
              ))}
            </VStack>
            <VStack>
              <HeroSquare name={name} scaleMultiplier={1.5} />
              <TextLabel1>Scale to 1.5</TextLabel1>
            </VStack>
          </VStack>
        );
      })}
    </>
  );

  const ListSpotSquares = () => (
    <>
      {spotSquareNames.map((name) => {
        return (
          <VStack key={`${name}_spotSquare`}>
            <TextLabel1>{name}</TextLabel1>
            <VStack gap={1}>
              {illustrationDimensions.spotSquare.map((dimension) => (
                <VStack key={`${name}_spotSquare_${dimension}`}>
                  <SpotSquare name={name} dimension={dimension} />
                </VStack>
              ))}
            </VStack>
            <VStack>
              <SpotSquare name={name} scaleMultiplier={2} />
              <TextLabel1>Scale to 2</TextLabel1>
            </VStack>
          </VStack>
        );
      })}
    </>
  );

  const ListSpotRectangles = () => (
    <>
      {spotRectangleNames.map((name) => {
        return (
          <VStack key={`${name}_spotRectangle`}>
            <TextLabel1>{name}</TextLabel1>
            <VStack gap={1}>
              {illustrationDimensions.spotRectangle.map((dimension) => (
                <VStack key={`${name}_spotRectangle_${dimension}`}>
                  <SpotRectangle name={name} dimension={dimension} />
                  <TextLabel1>{dimension}</TextLabel1>
                </VStack>
              ))}
            </VStack>
            <VStack>
              <SpotRectangle name={name} scaleMultiplier={3} />
              <TextLabel1>Scale to 3</TextLabel1>
            </VStack>
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

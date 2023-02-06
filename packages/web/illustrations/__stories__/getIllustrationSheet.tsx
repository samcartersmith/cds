import React, { memo } from 'react';
import type { IllustrationVariant, Spectrum } from '@cbhq/cds-common';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { HStack } from '../../alpha/HStack';
import { VStack } from '../../layout';
import { FeatureFlagProvider } from '../../system';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextLegal } from '../../typography';
import { Illustration } from '../Illustration';

const ITEM_SIZE = 48;
const ITEM_DIMENSION = `${ITEM_SIZE}x${ITEM_SIZE}` as const;

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
  type Names = (typeof images)[Type];
  const names = images[type];

  const IllustrationSpectrumSheet = memo(function IllustrationSpectrumSheet({
    names: namesProp,
    spectrum,
  }: {
    names: Names;
    spectrum: Spectrum;
  }) {
    return (
      <ThemeProvider spectrum={spectrum} scale="xSmall">
        <HStack
          flexWrap="wrap"
          gap={2}
          spacingVertical={1}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {namesProp.map((name) => {
            return (
              <VStack
                key={`${name}-${spectrum}`}
                background
                gap={1}
                alignItems="flex-start"
                width={ITEM_SIZE}
                height={ITEM_SIZE + 20}
                overflow="hidden"
              >
                <Illustration type={type} name={name} dimension={ITEM_DIMENSION} />
                <TextLegal as="p" noWrap>
                  {name}
                </TextLegal>
              </VStack>
            );
          })}
        </HStack>
      </ThemeProvider>
    );
  });

  const IllustrationSheet = memo(function IllustrationSheet() {
    return (
      <FeatureFlagProvider flexGap>
        <IllustrationSpectrumSheet names={names} spectrum="light" />
        <IllustrationSpectrumSheet names={names} spectrum="dark" />
      </FeatureFlagProvider>
    );
  });

  return () => <IllustrationSheet />;
}

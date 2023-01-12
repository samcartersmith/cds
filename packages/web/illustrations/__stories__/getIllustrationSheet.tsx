import React, { memo } from 'react';
import type { IllustrationNames, IllustrationVariant, Spectrum } from '@cbhq/cds-common';
import { sortedImg } from '@cbhq/cds-common/internal/data/sortedIllustrationData';

import { HStack } from '../../alpha/HStack';
import { VStack } from '../../layout';
import { FeatureFlagProvider } from '../../system';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextLegal } from '../../typography';
import { Illustration } from '../Illustration';

const ITEM_SIZE = 48;
const ITEM_DIMENSION = `${ITEM_SIZE}x${ITEM_SIZE}` as const;

export function getIllustrationSheet(type: IllustrationVariant) {
  const items = sortedImg[type];
  // TODO: remove this set logic - this will not be necessary when we switch to new illustration pipeline
  const names = [
    ...new Set(
      Object.values(items)
        .map((nameAndSpectrum) => {
          const token = nameAndSpectrum.split('-');
          const [name] = token as [name: IllustrationNames, spectrum: Spectrum];
          return name;
        })
        .values(),
    ),
  ];

  const IllustrationSpectrumSheet = memo(function IllustrationSpectrumSheet({
    names: namesProp,
    spectrum,
  }: {
    names: IllustrationNames[];
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
                <Illustration name={name} dimension={ITEM_DIMENSION} />
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

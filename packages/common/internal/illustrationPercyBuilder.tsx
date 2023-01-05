import React from 'react';

import type {
  BoxBaseProps,
  IllustrationBaseProps,
  IllustrationNames,
  IllustrationVariant,
  Spectrum,
  StackBaseProps,
  TextBaseProps,
  ThemeProviderBaseProps,
} from '../types';

import { sortedImg } from './data/sortedIllustrationData';

export function illustrationPercyBuilder(
  Illustration: React.ComponentType<IllustrationBaseProps<'all'>>,
  ThemeProvider: React.ComponentType<ThemeProviderBaseProps>,
  HStack: React.ComponentType<BoxBaseProps & StackBaseProps>,
  VStack: React.ComponentType<BoxBaseProps & StackBaseProps>,
  Box: React.ComponentType<BoxBaseProps>,
  TextLabel1: React.ComponentType<TextBaseProps>,
) {
  const ListIllustrations = (variant: IllustrationVariant, startIdx: number, endIdx: number) => {
    return (
      <HStack
        flexWrap="wrap"
        gap={7}
        spacingVertical={1}
        justifyContent="flex-start"
        alignItems="center"
      >
        {sortedImg[variant].slice(startIdx, endIdx).map((nameAndSpectrum) => {
          const token = nameAndSpectrum.split('-');

          if (token.length <= 1) {
            throw new Error('The name does not have a spectrum');
          }

          const [name, spectrum] = token as [name: IllustrationNames, spectrum: Spectrum];

          return (
            <VStack gap={1} alignItems="center">
              <ThemeProvider spectrum={spectrum}>
                <Box background="background">
                  <Illustration name={name} dimension="96x96" />
                </Box>
              </ThemeProvider>
              <TextLabel1>{nameAndSpectrum}</TextLabel1>
            </VStack>
          );
        })}
      </HStack>
    );
  };

  return {
    ListIllustrations,
  };
}

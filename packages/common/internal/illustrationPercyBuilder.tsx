import React from 'react';
import { split } from '@cbhq/cds-utils';
import type {
  BoxBaseProps,
  IllustrationBaseProps,
  StackBaseProps,
  ThemeProviderBaseProps,
  TextBaseProps,
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
  const ListIllustrations = () => {
    return (
      <HStack
        flexWrap="wrap"
        gap={7}
        spacingVertical={1}
        justifyContent="flex-start"
        alignItems="center"
      >
        {sortedImg.map((nameAndSpectrum) => {
          const [name, spectrum] = split(nameAndSpectrum, '-');
          return (
            <VStack gap={1} alignItems="center">
              <ThemeProvider spectrum={spectrum}>
                <Box background="background">
                  <Illustration name={name} dimension="120x120" />
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

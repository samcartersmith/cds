import React from 'react';
import { ElevationLevels } from '@cbhq/cds-common';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { usePalette } from '../../hooks/usePalette';
import { Box, HStack, VStack } from '../../layout';
import { TextCaption } from '../../typography';
import { ThemeProvider } from '../ThemeProvider';

const Palette = ({ elevation }: { elevation?: ElevationLevels }) => {
  const palette = usePalette();

  return (
    <HStack background="background" flexWrap="wrap">
      {Object.keys(palette).map((color) => {
        return (
          <Box
            key={color}
            alignItems="center"
            //   @ts-expect-error figure this out
            dangerouslySetBackground={palette[color]}
            height={100}
            justifyContent="center"
            width="50%"
          >
            <VStack background="background">
              <TextCaption align="center">{color}</TextCaption>
              {/* @ts-expect-error figure this out */}
              <TextCaption align="center">{palette[color]}</TextCaption>
              {!!elevation && <TextCaption align="center">Elevation: {elevation}</TextCaption>}
            </VStack>
          </Box>
        );
      })}
    </HStack>
  );
};

const PaletteScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Light Palette">
        <Palette />
      </Example>
      <Example title="Dark Palette">
        <ThemeProvider name="dark-palette" spectrum="dark">
          <Palette />
        </ThemeProvider>
      </Example>
      <Example title="Light Palette Elevation 1">
        <Box elevation={1}>
          <Palette elevation={1} />
        </Box>
      </Example>
      <Example title="Dark Palette Elevation 1">
        <ThemeProvider name="dark-palette-elevation-1" spectrum="dark">
          <Box elevation={1}>
            <Palette elevation={1} />
          </Box>
        </ThemeProvider>
      </Example>
      <Example title="Light Palette Elevation 2">
        <Box elevation={2}>
          <Palette elevation={2} />
        </Box>
      </Example>
      <Example title="Dark Palette Elevation 2">
        <ThemeProvider name="dark-palette-elevation-2" spectrum="dark">
          <Box elevation={2}>
            <Palette elevation={2} />
          </Box>
        </ThemeProvider>
      </Example>
    </ExampleScreen>
  );
};

export default PaletteScreen;

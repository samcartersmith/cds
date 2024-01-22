import React from 'react';
import { ElevationLevels } from '@cbhq/cds-common';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { usePalette } from '../../hooks/usePalette';
import { Box, HStack, VStack } from '../../layout';
import { TextCaption } from '../../typography';
import { ThemeProvider } from '../ThemeProvider';

const Palette = ({
  spectrum,
  elevation,
}: {
  spectrum: 'light' | 'dark';
  elevation?: ElevationLevels;
}) => {
  const palette = usePalette();
  return (
    <ThemeProvider name="palette-spectrum" spectrum={spectrum}>
      <HStack background="background" flexWrap="wrap">
        {Object.keys(palette).map((color) => {
          return (
            <Box
              alignItems="center"
              //   @ts-expect-error figure this out
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              dangerouslySetBackground={palette[color]}
              elevation={elevation}
              height={150}
              justifyContent="center"
              width={150}
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
    </ThemeProvider>
  );
};

const PaletteScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Light Palette">
        <Palette spectrum="light" />
      </Example>
      <Example title="Dark Palette">
        <Palette spectrum="dark" />
      </Example>
      <Example title="Light Palette Elevation 1">
        <Palette elevation={1} spectrum="light" />
      </Example>
      <Example title="Dark Palette Elevation 1">
        <Palette elevation={1} spectrum="dark" />
      </Example>
      <Example title="Light Palette Elevation 2">
        <Palette elevation={2} spectrum="light" />
      </Example>
      <Example title="Dark Palette Elevation 2">
        <Palette elevation={2} spectrum="dark" />
      </Example>
    </ExampleScreen>
  );
};

export default PaletteScreen;

import { ElevationLevels } from '@cbhq/cds-common';

import { usePalette } from '../hooks/usePalette';
import { Box, Grid, VStack } from '../layout';
import { FeatureFlagProvider, ThemeProvider } from '../system';
import { TextCaption } from '../typography';
import { objectKeys } from '../utils/types';

const Palette = ({
  spectrum,
  elevation,
}: {
  spectrum: 'light' | 'dark';
  elevation?: ElevationLevels;
}) => {
  const palette = usePalette();
  return (
    <FeatureFlagProvider frontier>
      <ThemeProvider spectrum={spectrum}>
        <Grid background="background" columnMax="200px" columnMin="min-content">
          {objectKeys(palette).map((color) => {
            return (
              <Box
                alignItems="center"
                dangerouslySetBackground={palette[color]}
                elevation={elevation}
                height={200}
                justifyContent="center"
                width={200}
              >
                <VStack background="background">
                  <TextCaption align="center" as="p">
                    {color}
                  </TextCaption>
                  {!!elevation && (
                    <TextCaption align="center" as="p">
                      Elevation: {elevation}
                    </TextCaption>
                  )}
                </VStack>
              </Box>
            );
          })}
        </Grid>
      </ThemeProvider>
    </FeatureFlagProvider>
  );
};

export const LightPalette = () => <Palette spectrum="light" />;
export const DarkPalette = () => <Palette spectrum="dark" />;
export const LightPaletteElevation1 = () => <Palette elevation={1} spectrum="light" />;
export const DarkPaletteElevation1 = () => <Palette elevation={1} spectrum="dark" />;
export const LightPaletteElevation2 = () => <Palette elevation={2} spectrum="light" />;
export const DarkPaletteElevation2 = () => <Palette elevation={2} spectrum="dark" />;

export default {
  title: 'Palette',
  component: Palette,
};

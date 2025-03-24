import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';

import { useTheme } from '../hooks/useTheme';
import { Box, Grid, VStack } from '../layout';
import { Text } from '../typography/Text';

const Palette = ({ elevation }: { elevation?: ElevationLevels }) => {
  const theme = useTheme();

  return (
    <Grid background="bg" columnMax="200px" columnMin="min-content">
      {Object.keys(theme.color).map((name) => {
        return (
          <Box
            key={name}
            alignItems="center"
            background={name as ThemeVars.Color}
            elevation={elevation}
            height={200}
            justifyContent="center"
            width={200}
          >
            <VStack background="bg">
              <Text as="p" display="block" font="caption" textAlign="center">
                {name}
              </Text>
              {!!elevation && (
                <Text as="p" display="block" font="caption" textAlign="center">
                  Elevation: {elevation}
                </Text>
              )}
            </VStack>
          </Box>
        );
      })}
    </Grid>
  );
};

export const DefaultPalette = () => <Palette />;
export const Elevation1 = () => <Palette elevation={1} />;
export const Elevation2 = () => <Palette elevation={2} />;

export default {
  title: 'Palette',
  component: Palette,
};

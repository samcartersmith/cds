import * as animations from '@cbhq/cds-lottie-files';
import { Lottie } from '@cbhq/cds-web/animation/Lottie';
import { Box } from '@cbhq/cds-web/layout/Box';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';

export const Playground = () => {
  return (
    <ThemeProvider>
      <Box flexWrap="wrap" spacing={1}>
        {Object.entries(animations).map(([name, source]) => (
          <Lottie autoplay loop key={name} source={source} width={200} height={200} />
        ))}
      </Box>
    </ThemeProvider>
  );
};

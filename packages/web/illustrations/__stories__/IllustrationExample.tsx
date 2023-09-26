import { memo, PropsWithChildren } from 'react';

import { VStack } from '../../alpha/VStack';
import { Box } from '../../layout';
import { ThemeProvider } from '../../system';

export const IllustrationExample = memo(function IllustrationExample({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <VStack gap={2} alignItems="flex-start">
      <ThemeProvider spectrum="light">
        <Box background>{children}</Box>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <Box background>{children}</Box>
      </ThemeProvider>
    </VStack>
  );
});

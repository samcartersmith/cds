import React, { memo } from 'react';
import ThemeToggles from '@theme/ThemeToggles';
import { Divider, VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';

const ExampleWithThemeToggles = memo(({ children, ...toggleProps }) => {
  return (
    <VStack spacingVertical={2} gap={3}>
      <ThemeProvider scale="xSmall">
        <VStack spacingHorizontal={3}>
          <ThemeToggles {...toggleProps} />
        </VStack>
      </ThemeProvider>
      <Divider offsetHorizontal={5} />
      {children}
    </VStack>
  );
});

ExampleWithThemeToggles.displayName = 'ExampleWithThemeToggles';
export default ExampleWithThemeToggles;

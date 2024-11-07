import React, { memo } from 'react';
import ThemeToggles from '@theme/ThemeToggles';
import { Divider, VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';

type ExampleWithThemeTogglesProps = {
  children?: React.ReactNode;
};

const ExampleWithThemeToggles = memo(
  ({ children, ...toggleProps }: ExampleWithThemeTogglesProps) => {
    return (
      <VStack gap={3} spacingVertical={2}>
        <ThemeProvider scale="xSmall">
          <VStack spacingHorizontal={3}>
            <ThemeToggles {...toggleProps} />
          </VStack>
        </ThemeProvider>
        <Divider offsetHorizontal={5} />
        {children}
      </VStack>
    );
  },
);

ExampleWithThemeToggles.displayName = 'ExampleWithThemeToggles';
export default ExampleWithThemeToggles;

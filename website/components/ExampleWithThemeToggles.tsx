import React, { memo } from 'react';

import { Divider, VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';

import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { ThemeToggles, ThemeTogglesProps } from './ThemeToggles';

export const ExampleWithThemeToggles: React.FC<ThemeTogglesProps> = memo(
  ({ children, ...toggleProps }) => {
    const scale = useRootScale();
    return (
      /** Remove the gap that ReactLiveScope adds to the live editor */
      <div style={{ margin: '-1rem' }}>
        <ThemeProvider scale="large">
          <VStack spacingVertical={2} spacingHorizontal={3} background>
            <ThemeProvider scale="xSmall">
              <VStack gap={3} spacingBottom={3}>
                <ThemeToggles {...toggleProps} />
                <Divider offsetHorizontal={5} />
              </VStack>
            </ThemeProvider>
            <ThemeProvider scale={scale}>{children}</ThemeProvider>
          </VStack>
        </ThemeProvider>
      </div>
    );
  },
);

ExampleWithThemeToggles.displayName = 'ExampleWithThemeToggles';

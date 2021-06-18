import React from 'react';

import { useScale, useToggler } from '@cbhq/cds-common';
import { Switch } from '@cbhq/cds-mobile/controls/Switch';
import { Divider, Spacer, VStack } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';

import Screen from './Screen';

const ExamplesScreen: React.FC = ({ children }) => {
  const scale = useScale();
  const [isDarkEnabled, { toggle: toggleDark }] = useToggler();
  const [isDenseEnabled, { toggle: toggleDense }] = useToggler();

  return (
    <ThemeProvider
      spectrum={isDarkEnabled ? 'dark' : 'light'}
      scale={isDenseEnabled ? 'xSmall' : scale}
    >
      <Screen>
        <ThemeProvider scale="xSmall">
          <VStack>
            <VStack spacingTop={3} spacingHorizontal={2} background>
              <Switch onChange={toggleDark} checked={isDarkEnabled}>
                Dark Spectrum
              </Switch>
              <Spacer vertical={3} />
              <Switch onChange={toggleDense} checked={isDenseEnabled}>
                Dense Scale
              </Switch>
            </VStack>
            <Spacer vertical={3} />
            <Divider />
          </VStack>
        </ThemeProvider>
        {children}
      </Screen>
    </ThemeProvider>
  );
};

export default ExamplesScreen;

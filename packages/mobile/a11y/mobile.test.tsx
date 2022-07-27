import React from 'react';
import TestRenderer from 'react-test-renderer';
import { entries } from '@cbhq/cds-utils';

import { routes } from '../examples/routes';
import { DevicePreferencesProvider, FeatureFlagProvider, ThemeProvider } from '../system';

describe('accessibility test', () => {
  entries(routes)
    /* .filter(([name, Story]) => name === 'Select') */
    .forEach(([name, Story]) => {
      // eslint-disable-next-line jest/no-disabled-tests
      it.skip(`${name} accessibility`, () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const Component = Story();
        const item = TestRenderer.create(
          <FeatureFlagProvider>
            <DevicePreferencesProvider>
              <ThemeProvider name="playground-root">
                <Component />
              </ThemeProvider>
            </DevicePreferencesProvider>
          </FeatureFlagProvider>,
        ).root;
        expect(item).toBeAccessible();
      });
    });
});

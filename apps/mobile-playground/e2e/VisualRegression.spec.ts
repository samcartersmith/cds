import {
  logTestStep,
  pressButton,
  screenShouldAppear,
  textShouldAppearWithTimeout,
} from '@cbhq/detox-utils';

import { cleanUpScreenshots, initializeVisualRegressionTests } from './detox-percy/detoxPercy';
import { getRoutes, launchApp, takeRouteScreenshots } from './utils';

describe('Example', () => {
  beforeAll(async () => {
    await launchApp();
    initializeVisualRegressionTests();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterAll(async () => {
    logTestStep('In After All; finalizing build.');
    cleanUpScreenshots();
  });

  it.each(getRoutes())('%p Visual Diff Test.', async (name: string) => {
    await textShouldAppearWithTimeout('CDS');
    await pressButton(name, 'cds_home_flatlist');
    await screenShouldAppear('example_screen_scrollview');
    await takeRouteScreenshots(name, 'example_screen_scrollview');
  });
});

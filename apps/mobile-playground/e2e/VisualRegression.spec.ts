import { logTestStep, pressButton, screenShouldAppear } from '@cbhq/detox-utils';

import { buildFinalize, initializeVisualRegressionTests } from './detox-percy/detoxPercy';
import { routesNames } from './routeNames';
import { launchApp, takeRouteScreenshots } from './utils';

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
    buildFinalize();
  });

  it.each(routesNames)('%p Visual Diff Test.', async (name: string) => {
    await pressButton(name, 'cds_home_flatlist');
    await screenShouldAppear('example_screen_scrollview');
    await takeRouteScreenshots(name);
  });
});

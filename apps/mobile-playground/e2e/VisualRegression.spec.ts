/* eslint-disable @typescript-eslint/await-thenable */

import { logTestStep, pressButton } from '@cbhq/detox-utils';

import { launchApp } from './utils';

describe('Example', () => {
  beforeAll(async () => {
    await launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterAll(async () => {
    logTestStep('In After All; finalizing build.');
  });

  it.each(['Accordion', 'Alert'])('%p Visual Diff Test.', async (name: string) => {
    await pressButton(name, 'cds_home_flatlist');
    await expect(element(by.id('example_screen_scrollview'))).toBeVisible();
  });
});

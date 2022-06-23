import { by, device, element } from 'detox';

import { pressButton } from './button';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('take screenshot of first screen', async () => {
    expect(element(by.text('CDS'))).toBeVisible();
    await device.takeScreenshot('TestScreenshot_1');
    await pressButton('Alert');
    await device.takeScreenshot('TestScreenshot_2');
  });
});

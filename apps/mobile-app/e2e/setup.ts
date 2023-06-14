import { openApp } from './utils/openApp';

beforeAll(async () => {
  await openApp();
});

afterEach(async () => {
  if (testFailed) {
    await device.takeScreenshot('screenshot');
  }
});

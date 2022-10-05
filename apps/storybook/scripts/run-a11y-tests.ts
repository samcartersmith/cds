import { A11yTestRunner } from '@shopify/storybook-a11y-test';
import path from 'path';

const rootOfRepo = path.join(__dirname, '../../..');
const buildDir = path.join(rootOfRepo, '.nx/outs/projects/apps/storybook/storybook');

async function runA11yTests() {
  const testRunner = new A11yTestRunner(buildDir);

  try {
    // Grab all Story IDs
    const storyIds = await testRunner.collectEnabledStoryIdsFromIFrame();

    // Run tests on all stories in `storyIds`
    const results = await testRunner.testStories({
      storyIds,

      // Optional: maximum time in milliseconds to wait for the browser instance to start.
      // Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
      timeout: 30000,
    });

    if (results.length) {
      // eslint-disable-next-line no-console
      console.error(`‼️  Accessibility violations found`);
      // eslint-disable-next-line no-console
      console.log(results.join('\n'));
      // eslint-disable-next-line no-restricted-globals
      process.exitCode = 1;
    } else {
      // eslint-disable-next-line no-console
      console.log('🧚  Accessibility tests passed');
    }
  } finally {
    await testRunner.teardown();
  }
}

void runA11yTests();

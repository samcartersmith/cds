/* eslint-disable no-undef */
import { routes } from '@cbhq/cds-mobile/examples/newRoutes';
import {
  assertVisualDiffsForPlayground,
  finishVisregTests,
  getPlaygroundRoutes,
  initializeVisregTests,
  reloadApp,
} from '@cbhq/ui-mobile-visreg';

import config from '../detox.config';

describe('All Playground Routes', () => {
  beforeAll(async () => {
    await initializeVisregTests(config);
  });

  afterAll(() => {
    finishVisregTests();
  });

  it.each(getPlaygroundRoutes({ routes, ...config.disabledRoutes }))(
    '%p Visual Diff Test.',
    async (routeName) => {
      await reloadApp();
      await assertVisualDiffsForPlayground(routeName);
    },
  );
});

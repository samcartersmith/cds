import { routes } from '@cbhq/cds-mobile/examples/newRoutes';
import {
  assertVisualDiffsForPlayground,
  finishVisregTests,
  getPlaygroundRoutes,
  initializeVisregTests,
} from '@cbhq/ui-mobile-playground/src/visreg';

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
    async (routeName: string) => {
      await assertVisualDiffsForPlayground(routeName);
    },
  );
});

import {
  assertVisualDiffsForPlayground,
  finishVisregTests,
  getPlaygroundRoutes,
  initializeVisregTests,
} from './visual-regression-testing';

describe('Example', () => {
  beforeAll(async () => {
    await initializeVisregTests();
  });

  afterAll(() => {
    finishVisregTests();
  });

  it.each(getPlaygroundRoutes())('%p Visual Diff Test.', async (routeName: string) => {
    await assertVisualDiffsForPlayground(routeName);
  });
});

jest.mock('@cbhq/cds-utils/env', () => {
  const actual = jest.requireActual('../../env');

  return {
    __esModule: true,
    ...actual,
    isTest: jest.fn(() => false),
  };
});

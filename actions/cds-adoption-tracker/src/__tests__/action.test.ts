import { logAllComponentStats, logIllustrationStats, setupAnalytics } from '../utils/analytics';
import {
  getExternalComponentImportStats,
  getIllustrationNames,
  isPresentationalComponent,
} from '../utils/componentHelpers';
import { getInputs } from '../utils/inputs';
import {
  createProject,
  getPackageJsonDependencies,
  loadPackageJson,
} from '../utils/projectHelpers';

jest.mock('../utils/analytics');
jest.mock('../utils/componentHelpers');
jest.mock('../utils/inputs');
jest.mock('../utils/projectHelpers');

const mockGetInputs = getInputs as jest.Mock;
const mockCreateProject = createProject as jest.Mock;
const mockLoadPackageJson = loadPackageJson as jest.Mock;
const mockGetPackageJsonDependencies = getPackageJsonDependencies as jest.Mock;
const mockGetExternalComponentImportStats = getExternalComponentImportStats as jest.Mock;
const mockIsPresentationalComponent = isPresentationalComponent as jest.Mock;
const mockGetIllustrationNames = getIllustrationNames as jest.Mock;
const mockLogAllComponentStats = logAllComponentStats as jest.Mock;
const mockLogIllustrationStats = logIllustrationStats as jest.Mock;
const mockSetupAnalytics = setupAnalytics as jest.Mock;

// Dynamically import run to avoid the side-effect `void run()` at module level
let run: () => Promise<void>;

beforeAll(async () => {
  jest.useFakeTimers();

  // Set up default mocks before importing action.ts (which calls `void run()` on load)
  mockGetInputs.mockReturnValue({
    projectName: 'test-project',
    tsconfigPath: '/test/tsconfig.json',
    packageJsonPath: '/test/package.json',
  });
  mockCreateProject.mockReturnValue([{ getSourceFiles: () => [] }, '/test']);
  mockLoadPackageJson.mockReturnValue({});
  mockGetPackageJsonDependencies.mockReturnValue([new Set(), {}]);

  // Import the module (triggers `void run()` side-effect)
  const actionModule = await import('../action');
  run = actionModule.run;

  // Let the side-effect run() complete
  jest.runAllTimers();

  // Wait for any pending microtasks
  await Promise.resolve();
});

afterAll(() => {
  jest.useRealTimers();
});

beforeEach(() => {
  jest.clearAllMocks();

  // Set up default mocks for each test
  mockGetInputs.mockReturnValue({
    projectName: 'test-project',
    tsconfigPath: '/test/tsconfig.json',
    packageJsonPath: '/test/package.json',
  });
  mockLoadPackageJson.mockReturnValue({});
  mockGetPackageJsonDependencies.mockReturnValue([new Set(), {}]);
  mockGetExternalComponentImportStats.mockReturnValue([]);
  mockGetIllustrationNames.mockReturnValue([]);
  mockIsPresentationalComponent.mockReturnValue(false);
});

function createMockSourceFile(filePath: string) {
  return { getFilePath: () => filePath };
}

describe('run', () => {
  it('calls setupAnalytics', async () => {
    mockCreateProject.mockReturnValue([{ getSourceFiles: () => [] }, '/test']);

    const promise = run();
    jest.runAllTimers();
    await promise;

    expect(mockSetupAnalytics).toHaveBeenCalled();
  });

  it('skips index.tsx files', async () => {
    const indexFile = createMockSourceFile('/test/src/index.tsx');
    const regularFile = createMockSourceFile('/test/src/App.tsx');
    mockCreateProject.mockReturnValue([
      { getSourceFiles: () => [indexFile, regularFile] },
      '/test',
    ]);

    const promise = run();
    jest.runAllTimers();
    await promise;

    expect(mockGetExternalComponentImportStats).toHaveBeenCalledTimes(1);
    expect(mockGetExternalComponentImportStats).toHaveBeenCalledWith(
      regularFile,
      expect.anything(),
      expect.anything(),
    );
  });

  it('counts CDS component imports and logs stats', async () => {
    const sourceFile = createMockSourceFile('/test/src/App.tsx');
    mockCreateProject.mockReturnValue([{ getSourceFiles: () => [sourceFile] }, '/test']);

    mockGetExternalComponentImportStats.mockReturnValue([
      { name: 'Button', importPath: '@cbhq/cds-web', version: '8.0.0' },
    ]);

    const promise = run();
    jest.runAllTimers();
    await promise;

    expect(mockLogAllComponentStats).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          name: 'Button',
          timesUsed: 1,
          importPath: '@cbhq/cds-web',
        }),
      ],
      [],
      'test-project',
    );
  });

  it('counts non-CDS presentational component imports', async () => {
    const sourceFile = createMockSourceFile('/test/src/App.tsx');
    mockCreateProject.mockReturnValue([{ getSourceFiles: () => [sourceFile] }, '/test']);

    mockGetExternalComponentImportStats.mockReturnValue([
      { name: 'Card', importPath: 'external-lib', version: '1.0.0' },
    ]);
    mockIsPresentationalComponent.mockReturnValue(true);

    const promise = run();
    jest.runAllTimers();
    await promise;

    expect(mockLogAllComponentStats).toHaveBeenCalledWith(
      [],
      [
        expect.objectContaining({
          name: 'Card',
          timesUsed: 1,
          importPath: 'external-lib',
        }),
      ],
      'test-project',
    );
  });

  it('tracks illustration component usage', async () => {
    const sourceFile = createMockSourceFile('/test/src/App.tsx');
    mockCreateProject.mockReturnValue([{ getSourceFiles: () => [sourceFile] }, '/test']);

    mockGetExternalComponentImportStats.mockReturnValue([
      { name: 'HeroSquare', importPath: '@cbhq/cds-illustrations', version: '4.0.0' },
    ]);
    mockGetIllustrationNames.mockReturnValue(['bank']);

    const promise = run();
    jest.runAllTimers();
    await promise;

    expect(mockLogIllustrationStats).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          componentType: 'HeroSquare',
          illustrationName: 'bank',
          timesUsed: 1,
          importPath: '@cbhq/cds-illustrations',
          version: '4.0.0',
        }),
      ],
      'test-project',
    );
  });

  it('aggregates duplicate CDS component stats across files', async () => {
    const file1 = createMockSourceFile('/test/src/A.tsx');
    const file2 = createMockSourceFile('/test/src/B.tsx');
    mockCreateProject.mockReturnValue([{ getSourceFiles: () => [file1, file2] }, '/test']);

    mockGetExternalComponentImportStats.mockReturnValue([
      { name: 'Button', importPath: '@cbhq/cds-web', version: '8.0.0' },
    ]);

    const promise = run();
    jest.runAllTimers();
    await promise;

    expect(mockLogAllComponentStats).toHaveBeenCalledWith(
      [expect.objectContaining({ name: 'Button', timesUsed: 2 })],
      [],
      'test-project',
    );
  });

  it('does not throw on errors', async () => {
    mockCreateProject.mockImplementation(() => {
      throw new Error('Project creation failed');
    });

    const promise = run();
    jest.runAllTimers();

    await expect(promise).resolves.toBeUndefined();
  });
});

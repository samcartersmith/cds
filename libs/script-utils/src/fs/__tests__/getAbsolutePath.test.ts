import { Task } from '@cbhq/mono-tasks';

import { getAbsolutePath } from '../getAbsolutePath';

const mockTask = new Task(
  'mock-task',
  {},
  {
    root: '/Users/john-doe/src/cds',
    projectName: 'mock-tasks',
    targetName: 'test',
    target: {
      executor: `@cbhq/mock-tasks:test`,
      options: {},
    },
    projectsConfigurations: {
      projects: {
        'mock-tasks': {
          root: `packages/mock-tasks`,
        },
      },
      version: 2,
    },
    cwd: 'mock-tasks',
    isVerbose: true,
  },
);

describe('getAbsolutePath', () => {
  it('correctly handles project relative paths', () => {
    const result = getAbsolutePath(mockTask, './__generated__/manifest.json');
    expect(result).toBe(`/Users/john-doe/src/cds/packages/mock-tasks/__generated__/manifest.json`);
  });

  it('correctly handles workspace root paths', () => {
    const result = getAbsolutePath(mockTask, 'packages/mock-tasks/__generated__/manifest.json');
    expect(result).toBe('/Users/john-doe/src/cds/packages/mock-tasks/__generated__/manifest.json');
  });

  it('correctly handles workspace root paths with leading slash', () => {
    const result = getAbsolutePath(mockTask, '/packages/mock-tasks/__generated__/manifest.json');
    expect(result).toBe('/Users/john-doe/src/cds/packages/mock-tasks/__generated__/manifest.json');
  });
});

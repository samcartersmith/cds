import fs from 'node:fs';
import { logInfo } from '@cbhq/mono-tasks';
import { getAbsolutePath, writePrettyFile } from '@cbhq/script-utils';

import { createMockTask } from '../../__fixtures__/createMockTask';
import { Changelog } from '../Changelog';

jest.mock('@cbhq/script-utils');
const mockTask = createMockTask({
  targetName: 'sync-icons',
});

jest.mock('@cbhq/mono-tasks', () => ({
  ...jest.requireActual<Record<string, unknown>>('@cbhq/mono-tasks'),
  logInfo: jest.fn(),
}));

jest.mock('node:fs', () => ({
  existsSync: jest.fn(),
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe('Changelog', () => {
  beforeEach(() => {
    (getAbsolutePath as jest.Mock).mockImplementation((_task: unknown, val: string) => val);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a Changelog instance with previous content if the changelog file exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    const mockChangelog = {
      filePath: './CHANGELOG.md',
      content: 'content',
    };
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockChangelog.content);
    const result = await Changelog.loadFromDisk(mockTask);

    expect(result).toEqual(new Changelog(mockChangelog));
    expect(fs.promises.readFile).toHaveBeenCalledWith('./CHANGELOG.md', 'utf-8');
    expect(fs.promises.writeFile).not.toHaveBeenCalled();
  });

  it('should return a Changelog instance with empty content if the changelog file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await Changelog.loadFromDisk(mockTask);
    expect(logInfo).toHaveBeenCalled();

    expect(result).toEqual({
      filePath: './CHANGELOG.md',
      content: '',
    });
    expect(writePrettyFile).toHaveBeenCalled();
  });
});

import fs from 'node:fs';

import { existsOrCreateDir } from '../existsOrCreateDir';

jest.mock('fs');

describe('existsOrCreateDir', () => {
  let existsSync = jest.spyOn(fs, 'existsSync');
  let mkdirMock = jest.spyOn(fs.promises, 'mkdir');

  beforeEach(() => {
    existsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    mkdirMock = jest.spyOn(fs.promises, 'mkdir').mockResolvedValue('');
  });

  it('directory that exists', async () => {
    existsSync.mockReturnValue(true);
    const result = await existsOrCreateDir('some-directory-1/exists');
    expect(result).toBe(true);
  });

  it('directory that does not exist', async () => {
    existsSync.mockReturnValue(false);
    const result = await existsOrCreateDir('some-directory-2/does-not-exist');
    expect(mkdirMock).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('file in a directory that does exists', async () => {
    existsSync.mockReturnValue(true);
    const result = await existsOrCreateDir('some-directory-3/file-exists.ts');
    expect(result).toBe(true);
  });

  it('file in a directory that does not exist', async () => {
    existsSync.mockReturnValue(false);
    const result = await existsOrCreateDir('some-directory-4/file-exists.ts');
    expect(mkdirMock).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});

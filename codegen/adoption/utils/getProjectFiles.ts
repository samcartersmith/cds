import glob from 'fast-glob';

export async function getProjectFiles(dir: string, ignoreDirs: string[], source?: string) {
  try {
    const files = await glob([source ?? '**/*.(ts|tsx|js|jsx)'], {
      ignore: [
        '__tests__/*',
        '**/*-test.*',
        '**/*.fixture.*',
        '**/*.test.*',
        '**/*.spec.*',
        '**/*.d.ts',
        '**/*.stories.*',
        ...ignoreDirs,
      ],
      onlyFiles: true,
      cwd: dir,
      // Return the absolute path for entries.
      absolute: true,
    });
    return files;
  } catch (err) {
    throw new Error(`Failed to get typescript files for ${dir}`);
  }
}

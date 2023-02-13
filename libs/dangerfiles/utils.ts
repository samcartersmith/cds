/* eslint-disable import/no-extraneous-dependencies */
import { TextDiff } from 'danger';

/**
 * Find the differences in two array of file paths.
 * Similar to lodash _.difference https://lodash.com/docs/4.17.15#difference
 */
export const findFileDifferences = (paths: string[], target: string[]) =>
  paths.reduce((filesWithoutTests, file) => {
    const splitFile = file.split('.');
    const beginning = splitFile.slice(0, -1);
    const ending = splitFile.slice(-1)[0];
    const testFile = [...beginning, 'test', ending].join('.');
    const altEnding = ending === 'tsx' ? 'ts' : 'tsx';
    const altTestFile = [...beginning, 'test', altEnding].join('.');
    const associatedTestFile = target.find((_file) => [testFile, altTestFile].includes(_file));

    return associatedTestFile ? filesWithoutTests : [...filesWithoutTests, file];
  }, [] as string[]);

type FindPatternInFileParams = {
  files: string[];
  diffFn: (filename: string) => Promise<TextDiff | null>;
  pattern: RegExp;
};

type Deprecations = { modified: string[]; added: string[]; removed: string[] };
export const findPatternInFile = async ({ files, pattern, diffFn }: FindPatternInFileParams) => {
  const deprecations: Deprecations = {
    modified: [],
    added: [],
    removed: [],
  };

  // Iterate over each file, collect a diff and check for the pattern
  await Promise.all(
    files.map(async (file) => {
      const diff = await diffFn(file);

      if (diff?.removed.match(pattern)) {
        deprecations.removed.push(file);
      }

      if (diff?.added.match(pattern)) {
        deprecations.added.push(file);
      }

      if (diff?.before.match(pattern)) {
        deprecations.modified.push(file);
      }
    }),
  );

  return deprecations;
};

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

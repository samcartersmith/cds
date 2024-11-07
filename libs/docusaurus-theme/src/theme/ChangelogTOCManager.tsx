import createTOCManager from '@theme/createTOCManager';

const {
  useTOC: useChangelogTOC,
  TOCProvider: ChangelogTOCProvider,
  TOCUpdater: ChangelogTOCUpdater,
} = createTOCManager();

export { ChangelogTOCProvider, ChangelogTOCUpdater, useChangelogTOC };

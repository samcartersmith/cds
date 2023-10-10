import createTOCManager from '@theme/createTOCManager';

export const {
  useTOC: useChangelogTOC,
  TOCProvider: ChangelogTOCProvider,
  TOCUpdater: ChangelogTOCUpdater,
} = createTOCManager();

import createTOCManager from '@theme/createTOCManager';

const {
  useTOC: usePropsTOC,
  TOCProvider: PropsTOCProvider,
  TOCUpdater: PropsTOCUpdater,
} = createTOCManager();

export { PropsTOCProvider, PropsTOCUpdater, usePropsTOC };

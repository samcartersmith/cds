import { createContext } from 'react';
import { noop } from '@cbhq/cds-utils';
import type { DocgenProjectMetadata } from '@cbhq/docusaurus-plugin-docgen';

type DocgenProjectContextType = {
  project: DocgenProjectMetadata | undefined;
  setProject: (project: DocgenProjectMetadata) => void;
};

const DEFAULT_VALUE = {
  project: undefined,
  setProject: noop,
};

const DocgenContext = createContext<DocgenProjectContextType>(DEFAULT_VALUE);

export default DocgenContext;

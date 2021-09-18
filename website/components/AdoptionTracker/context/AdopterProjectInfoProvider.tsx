import React, { createContext, memo } from 'react';

import type { AdopterProjectInfo } from ':cds-website/components/AdoptionTracker/types';

export const AdopterProjectInfoContextFallback: AdopterProjectInfo = {
  baseUrl: '',
  githubUrl: '',
  github: '',
  id: '',
  label: '',
  tsAlias: '',
  tsAliases: {},
  totalParsedFiles: 0,
  dependencies: {},
};

export const AdopterProjectInfoContext = createContext<AdopterProjectInfo>(
  AdopterProjectInfoContextFallback,
);

export const AdopterProjectInfoProvider: React.FC<AdopterProjectInfo> = memo(
  ({ children, ...projectInfo }) => {
    return (
      <AdopterProjectInfoContext.Provider value={projectInfo}>
        {children}
      </AdopterProjectInfoContext.Provider>
    );
  },
);

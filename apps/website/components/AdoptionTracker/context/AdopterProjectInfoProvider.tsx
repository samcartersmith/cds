import React, { createContext, memo } from 'react';

import type { AdopterProjectInfo } from ':cds-website/components/AdoptionTracker/types';

export const AdopterProjectInfoContextFallback: AdopterProjectInfo = {
  baseUrl: '',
  githubUrl: '',
  github: '',
  id: '' as AdopterProjectInfo['id'],
  label: '',
  tsAlias: '',
  tsAliases: {},
  totalParsedFiles: 0,
  dependencies: {},
};

export const AdopterProjectInfoContext = createContext<AdopterProjectInfo>(
  AdopterProjectInfoContextFallback,
);

export const AdopterProjectInfoProvider: React.FC<React.PropsWithChildren<AdopterProjectInfo>> =
  memo(({ children, ...projectInfo }) => {
    return (
      <AdopterProjectInfoContext.Provider value={projectInfo}>
        {children}
      </AdopterProjectInfoContext.Provider>
    );
  });

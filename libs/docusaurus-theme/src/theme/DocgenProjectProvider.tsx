import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTabGroupChoice } from '@docusaurus/theme-common/lib';
import type { DocgenProjectProviderProps } from '@theme/DocgenProjectProvider';
import useDocgenPluginData from '@theme/useDocgenPluginData';
import type { DocgenProjectMetadata } from '@cbhq/docusaurus-plugin-docgen';

import DocgenProjectContext from './DocgenProjectContext';

/**
 * Majority of docgen output lives in .docusaurus cache directory, but we have some functionality
 * that we want to offer at theme level, such as a project selector which can filter
 * content that varies per project.
 */
const DocgenProjectProvider = memo(function DocgenProjectProvider({
  children,
}: DocgenProjectProviderProps) {
  const { projects } = useDocgenPluginData();
  const { tabGroupChoices, setTabGroupChoices } = useTabGroupChoice();
  const projectFromCache = tabGroupChoices.project;
  const [project, setProject] = useState<DocgenProjectMetadata>(
    projectFromCache ? (JSON.parse(projectFromCache) as DocgenProjectMetadata) : projects[0],
  );

  const handleSetProject = useCallback(
    (newProject: DocgenProjectMetadata) => {
      const newStringifiedProject = JSON.stringify(newProject);
      setProject(newProject);
      setTabGroupChoices('project', newStringifiedProject);
    },
    [setTabGroupChoices],
  );

  const contextValue = useMemo(() => {
    return {
      project,
      setProject: handleSetProject,
    };
  }, [project, handleSetProject]);

  return (
    <DocgenProjectContext.Provider value={contextValue}>{children}</DocgenProjectContext.Provider>
  );
});

export default DocgenProjectProvider;

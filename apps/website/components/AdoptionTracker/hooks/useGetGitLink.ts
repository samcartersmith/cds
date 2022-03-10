import { useCallback } from 'react';

import { useAdopterProjectInfo } from './useAdopterProjectInfo';

export const useGetGitLink = () => {
  const { tsAliases, github, githubUrl, baseUrl } = useAdopterProjectInfo();
  return useCallback(
    (file: string) => {
      let filePath = file;
      const aliases = Object.keys(tsAliases);
      const match = aliases.length > 0 ? file.match(new RegExp(`${aliases.join('|')}`)) : null;
      if (match !== null) {
        const [aliasMatch] = match;
        filePath = file.replace(aliasMatch, tsAliases[aliasMatch]);
        return `${githubUrl}/${filePath}`;
      }
      const base = baseUrl.replace(github, '');
      return [githubUrl, base, filePath].join('/');
    },
    [githubUrl, github, tsAliases, baseUrl],
  );
};

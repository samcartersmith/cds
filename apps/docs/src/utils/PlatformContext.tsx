import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useHistory } from '@docusaurus/router';
import { useLocation } from '@docusaurus/router';

type Platform = 'web' | 'native';

type PlatformContextType = {
  platform: Platform;
  setPlatform: React.Dispatch<React.SetStateAction<Platform>>;
};

const PlatformContext = createContext<PlatformContextType>({
  platform: 'web',
  setPlatform: () => {},
});

const PLATFORM_SEARCH_PARAM_KEY = 'platform';

export const PlatformContextProvider = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const { search } = useLocation();

  const platform = useMemo<Platform>(() => {
    const platform = new URLSearchParams(search).get(PLATFORM_SEARCH_PARAM_KEY);
    if (platform === 'web' || platform === 'native') {
      return platform;
    }
    return 'web';
  }, [search]);

  const setPlatform = useCallback(
    (platformUpdater: Platform | ((prevPlatform: Platform) => Platform)) => {
      const searchParams = new URLSearchParams(search);
      let currentPlatform = searchParams.get(PLATFORM_SEARCH_PARAM_KEY);
      if (currentPlatform !== 'web' && currentPlatform !== 'native') {
        currentPlatform = 'web';
      }
      const newPlatform =
        typeof platformUpdater === 'function'
          ? platformUpdater(currentPlatform as 'native' | 'web')
          : platformUpdater;
      searchParams.set(PLATFORM_SEARCH_PARAM_KEY, newPlatform);
      history.push({ search: searchParams.toString() });
    },
    [history, search],
  );

  const value = useMemo(() => ({ platform, setPlatform }), [platform, setPlatform]);
  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};

export const usePlatformContext = () => {
  return useContext(PlatformContext);
};

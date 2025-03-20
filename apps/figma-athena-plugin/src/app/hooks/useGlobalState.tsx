import {
  ComponentProps,
  createContext,
  type Dispatch,
  memo,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Spinner } from '@cbhq/cds-web/loaders';
import { TextBody } from '@cbhq/cds-web/typography';

import type { Prompt } from '../../shared/Prompt';
import { Layout } from '../components/Layout';
import { fetchFigma } from '../fetchFigma';

export type GlobalStateContextValue = {
  cbGPT: {
    secret?: string;
    apiKey?: string;
    setCredentials: (apiKey: string, secret: string) => void;
  };
  prompt: Prompt | null;
  setPrompt: Dispatch<SetStateAction<Prompt | null>>;
};

export const GlobalStateContext = createContext<GlobalStateContextValue | undefined>(undefined);
type ProviderProps = Omit<ComponentProps<typeof GlobalStateContext.Provider>, 'value'>;
export const GlobalStateContextProvider = memo(({ ...props }: ProviderProps) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [secret, setSecret] = useState<string>();
  const [apiKey, setApiKey] = useState<string>();

  const setCredentials = useCallback((apiKey: string, secret: string) => {
    setApiKey(apiKey);
    setSecret(secret);
  }, []);

  useEffect(() => {
    fetchFigma('check-credentials', undefined)
      .then((credentials) => {
        if (credentials !== null) {
          const { apiKey, secret } = credentials;
          setCredentials(apiKey, secret);
        }
      })
      .catch((e) => {
        //  TODO error handling
        console.log(e);
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, [setCredentials]);

  const value = useMemo(
    () => ({
      prompt,
      setPrompt,
      cbGPT: {
        setCredentials,
        secret,
        apiKey,
      },
    }),
    [prompt, setCredentials, secret, apiKey],
  );

  if (isInitializing) {
    return (
      <Layout alignItems="center" gap={4} justifyContent="center">
        <Spinner color="primary" size={8} />
        <TextBody as="p" color="foregroundMuted">
          Booting up...
        </TextBody>
      </Layout>
    );
  }

  return <GlobalStateContext.Provider {...props} value={value} />;
});

export const useGlobalState = () => {
  const globalState = useContext(GlobalStateContext);

  if (!globalState) {
    throw Error('useGlobalState must be used from within a GlobalStateContext.Provider');
  }

  return globalState;
};

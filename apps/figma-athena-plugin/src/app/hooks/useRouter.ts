import { createContext, useContext } from 'react';

export type Routes =
  | 'prompt-list'
  | 'edit-prompt'
  | 'delete-prompt'
  | 'select-nodes'
  | 'generate-descriptors';

export type RouterContextValue<RouterState extends Record<string, unknown>> = {
  route: Routes;
  history: Routes[];
  state: Partial<RouterState>;
  navigate: (route: Routes, state?: Record<string, unknown>) => void;
  goBack: () => void;
};

export const RouterContext = createContext<RouterContextValue<Record<string, unknown>> | undefined>(
  undefined,
);

export const useRouter = <RouterState extends Record<string, unknown>>() => {
  const router = useContext(RouterContext);
  if (!router) throw Error('useRouter must be used from within a RouterContext.Provider');
  return router as RouterContextValue<RouterState>;
};

import { createContext } from 'react';

export const DEFAULT_CONTEXT_VALUE = { fontMigration: false };
export type BetaContextType = typeof DEFAULT_CONTEXT_VALUE;
export const BetaContext = createContext<BetaContextType>(DEFAULT_CONTEXT_VALUE);

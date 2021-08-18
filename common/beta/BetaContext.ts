import { createContext } from 'react';

export const DEFAULT_CONTEXT_VALUE = { fontMigration: false };
export type BetaContextProps = Record<string, boolean>;
export type BetaContextType = typeof DEFAULT_CONTEXT_VALUE;
export const BetaContext = createContext<BetaContextProps>(DEFAULT_CONTEXT_VALUE);

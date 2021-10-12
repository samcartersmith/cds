import { mapValues } from '@cbhq/cds-utils';
import { createContext } from 'react';

export const frontierFeatures = {
  frontierButton: false,
  frontierCard: false,
  frontierColor: false,
  frontierTypography: false,
};

export const frontierFeaturesOn = mapValues(frontierFeatures, () => true);

export const DEFAULT_BETA_CONTEXT = {
  fontMigration: false,
  ...frontierFeatures,
  frontier: false,
};

export type BetaContextType = typeof DEFAULT_BETA_CONTEXT;
export const BetaContext = createContext<BetaContextType>(DEFAULT_BETA_CONTEXT);

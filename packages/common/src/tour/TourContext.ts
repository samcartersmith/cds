import { createContext, useContext } from 'react';

import type { TourApi } from './useTour';

export type TourContextValue = TourApi;

export const TourContext = createContext<TourContextValue | undefined>(undefined);

export const useTourContext = (): TourContextValue => {
  const context = useContext(TourContext);
  if (!context) throw Error('useTourContext must be called inside a Tour');
  return context;
};

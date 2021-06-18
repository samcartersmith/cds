import { useContext } from 'react';

import { RootScaleUpdaterContext } from './context';

/** A user's preference can be saved in localStorage or on the backend. Use useRootScaleUpdater to update CDS side once user preference is known. */
export const useRootScaleUpdater = () => useContext(RootScaleUpdaterContext);

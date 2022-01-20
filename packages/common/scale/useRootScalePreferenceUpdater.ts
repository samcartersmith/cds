import { useContext } from 'react';

import { RootScalePreferenceUpdaterContext } from './context';

/** A user's preference can be saved in localStorage or on the backend. Use useRootScaleUpdater to update CDS side once user preference is known. */
export const useRootScalePreferenceUpdater = () => useContext(RootScalePreferenceUpdaterContext);

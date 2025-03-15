import { useContext } from 'react';

import {
  AdopterComponentsContext,
  AdopterComponentsContextFallback,
} from '../context/AdopterComponentsProvider';

export const useAdopterComponents = () => {
  const data = useContext(AdopterComponentsContext);
  if (!data) {
    console.error('Cannot use `useAdopterComponents` outside of AdopterComponentsProvider');
  }
  return data ?? AdopterComponentsContextFallback;
};

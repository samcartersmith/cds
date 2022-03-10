import { useContext } from 'react';
import {
  AdopterComponentsContext,
  AdopterComponentsContextFallback,
} from '../context/AdopterComponentsProvider';

export const useAdopterComponents = () => {
  const data = useContext(AdopterComponentsContext);
  if (!data) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `useAdopterComponents` outside of AdopterComponentsProvider');
  }
  return data ?? AdopterComponentsContextFallback;
};

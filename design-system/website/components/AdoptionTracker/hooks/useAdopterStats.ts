import { useContext } from 'react';
import { AdopterStatsContext, statsFallback } from '../context/AdopterStatsProvider';

export const useAdopterStats = () => {
  const data = useContext(AdopterStatsContext);
  if (!data) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `useAdopterStats` outside of AdopterStatsProvider');
  }
  return data ?? statsFallback;
};

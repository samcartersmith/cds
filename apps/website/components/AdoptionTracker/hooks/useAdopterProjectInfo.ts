import { useContext } from 'react';
import {
  AdopterProjectInfoContext,
  AdopterProjectInfoContextFallback,
} from '../context/AdopterProjectInfoProvider';

export const useAdopterProjectInfo = () => {
  const data = useContext(AdopterProjectInfoContext);
  if (!data) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `useAdopterProjectInfo` outside of AdopterProjectInfoProvider');
  }
  return data ?? AdopterProjectInfoContextFallback;
};

import { useEffect, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { isBrowser } from '../utils/browser';

export const useHasMounted = () => {
  const [hasMounted, toggleHasMounted] = useToggler(false);

  useEffect(() => {
    toggleHasMounted.toggleOn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentShouldMount = useMemo(() => hasMounted && isBrowser(), [hasMounted]);

  return componentShouldMount;
};

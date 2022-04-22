import { ReactElement, useEffect, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { isBrowser } from '../utils/browser';

export type MountComponentProps = {
  children: ReactElement;
};

/**
 * Checks if component has mounted and triggers a rerender so SSR UI's can hydrate properly
 * @link https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
 */
export const MountComponent = ({ children }: MountComponentProps) => {
  const [hasMounted, toggleHasMounted] = useToggler(false);

  useEffect(() => {
    toggleHasMounted.toggleOn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentShouldMount = useMemo(() => hasMounted && isBrowser(), [hasMounted]);

  return componentShouldMount ? children : null;
};

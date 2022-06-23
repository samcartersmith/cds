import { ReactElement } from 'react';

import { useHasMounted } from '../hooks/useHasMounted';

export type MountComponentProps = {
  children: ReactElement;
};

/**
 * Checks if component has mounted and triggers a rerender so SSR UI's can hydrate properly
 * @link https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
 */
export const MountComponent = ({ children }: MountComponentProps) => {
  const componentShouldMount = useHasMounted();

  return componentShouldMount ? children : null;
};

import { PropsWithChildren, useMemo } from 'react';

import { VStack } from '../../alpha/VStack';

export const MockTabPanel = ({
  id,
  isActive,
  children,
}: PropsWithChildren<{ id: string; isActive: boolean }>) => {
  /** This is a naive and simple approach to
   *  illustrate the proper a11y configuration
   *  Ideally you'll be using some nice animations
   * */
  const display = useMemo(() => (isActive ? undefined : 'none'), [isActive]);

  return (
    <VStack
      /**
       * ACCESSIBILITY PROPS
       * These three props are required to create a truly accessible
       * tab system, and must be named in the following format
       * */
      bordered
      accessibilityLabelledBy={`tab--${id}`}
      background="primaryWash"
      borderRadius="rounded"
      display={display}
      gap={1}
      id={`tabpanel--${id}`}
      role="tabpanel" // Make sure you're properly showing/hiding this tabpanel
      spacing={2}
    >
      {children}
    </VStack>
  );
};

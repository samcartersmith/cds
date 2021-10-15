import React, { useMemo } from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { css } from 'linaria';
import { usePalette } from '@cbhq/cds-web/hooks/usePalette';

const playgroundOverrides = css`
  margin: -1em;
`;

export function PatternArtboard({ children }: { children: React.ReactNode }) {
  const { background } = usePalette();
  const classOverride = useMemo(() => {
    return `${playgroundOverrides} ${background}`;
  }, [background]);
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      spacing={8}
      dangerouslySetClassName={classOverride}
    >
      <VStack width="100%">{children}</VStack>
    </VStack>
  );
}

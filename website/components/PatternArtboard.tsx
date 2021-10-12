import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { css } from 'linaria';

const playgroundOverrides = css`
  margin: -1em;
`;

export function PatternArtboard({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      dangerouslySetBackground="#EDEDED"
      alignItems="center"
      justifyContent="center"
      spacing={8}
      dangerouslySetClassName={playgroundOverrides}
    >
      <VStack width={380}>{children}</VStack>
    </VStack>
  );
}

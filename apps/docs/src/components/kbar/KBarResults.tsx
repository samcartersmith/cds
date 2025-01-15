import React, { memo, useCallback } from 'react';
import { KBarResults as OriginalKBarResults, useMatches } from 'kbar';
import { Box } from '@cbhq/cds-web2/layout/Box';
import { Text } from '@cbhq/cds-web2/text/Text';

import KBarResultItem from './KBarResultItem';

const KBarResults = memo(function KBarResults() {
  const { results, rootActionId } = useMatches();
  const onRender: React.ComponentProps<typeof OriginalKBarResults>['onRender'] = useCallback(
    ({ item, active }) => {
      if (typeof item === 'string') {
        return (
          <Box paddingBottom={2} paddingTop={3} paddingX={3}>
            <Text font="headline">{item}</Text>
          </Box>
        );
      }
      return <KBarResultItem action={item} active={active} currentRootActionId={rootActionId} />;
    },
    [rootActionId],
  );

  return <OriginalKBarResults items={results} onRender={onRender} />;
});

export default KBarResults;

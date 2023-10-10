import React, { memo, useCallback } from 'react';
import KBarResultItem from '@theme/KBarResultItem';
import { KBarResults as OriginalKBarResults, useMatches } from 'kbar';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel2 } from '@cbhq/cds-web/typography';

const KBarResults = memo(function KBarResults() {
  const { results, rootActionId } = useMatches();
  const onRender: React.ComponentProps<typeof OriginalKBarResults>['onRender'] = useCallback(
    ({ item, active }) => {
      if (typeof item === 'string') {
        return (
          <VStack opacity={0.75} spacingHorizontal={3} spacingVertical={1}>
            <TextLabel2 as="p" color="foregroundMuted" transform="uppercase">
              {item}
            </TextLabel2>
          </VStack>
        );
      }
      return <KBarResultItem action={item} active={active} currentRootActionId={rootActionId} />;
    },
    [rootActionId],
  );

  return <OriginalKBarResults items={results} onRender={onRender} />;
});

export default KBarResults;

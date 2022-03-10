import React, { useCallback, memo } from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { orderBy, toPairs } from 'lodash';
import { Icon } from '@cbhq/cds-web/icons';
import { BetaCell } from ':cds-website/components/BetaCell';
import type { ComponentData } from './types';
import { useGetGitLink } from './hooks/useGetGitLink';

export const AdopterComponentCallSites = memo(
  ({ callSites }: { callSites: ComponentData['callSites'] }) => {
    const getGitLink = useGetGitLink();
    const sortedCallSites = orderBy(toPairs(callSites), (item) => item[1], ['desc']);

    const handleOnPress = useCallback(
      (callSite: string) => {
        return () => window?.open(getGitLink(callSite), '_blank');
      },
      [getGitLink],
    );

    return (
      <VStack>
        <TextHeadline as="h4">Call Sites</TextHeadline>
        {sortedCallSites.map(([callSite, callSiteCount]) => {
          const callSiteText = callSiteCount === 1 ? 'instance' : 'instances';
          return (
            <BetaCell
              priority="end"
              offsetHorizontal={1}
              start={
                <TextLabel2 as="p" overflow="truncate">
                  {callSite}
                </TextLabel2>
              }
              end={<TextLabel2 as="p" align="end">{`${callSiteCount} ${callSiteText}`}</TextLabel2>}
              onPress={handleOnPress(callSite)}
              endAccessory={<Icon size="s" name="externalLink" color="foregroundMuted" />}
            />
          );
        })}
      </VStack>
    );
  },
);

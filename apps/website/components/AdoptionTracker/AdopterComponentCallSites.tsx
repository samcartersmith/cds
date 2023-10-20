import React, { memo, useCallback } from 'react';
import orderBy from 'lodash/orderBy';
import toPairs from 'lodash/toPairs';
import { Icon } from '@cbhq/cds-web/icons';
import { VStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import { BetaCell } from ':cds-website/components/BetaCell';

import { useGetGitLink } from './hooks/useGetGitLink';
import type { ComponentData } from './types';

export const AdopterComponentCallSites = memo(
  ({ callSites }: { callSites: ComponentData['callSites'] }) => {
    const getGitLink = useGetGitLink();
    const sortedCallSites = orderBy(toPairs(callSites), (item) => item[1], ['desc']);

    const handleOnPress = useCallback(
      (callSite: string) => {
        return () => getBrowserGlobals()?.window.open(getGitLink(callSite), '_blank');
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
              end={<TextLabel2 align="end" as="p">{`${callSiteCount} ${callSiteText}`}</TextLabel2>}
              endAccessory={<Icon color="foregroundMuted" name="externalLink" size="s" />}
              offsetHorizontal={1}
              onPress={handleOnPress(callSite)}
              priority="end"
              start={
                <TextLabel2 as="p" overflow="truncate">
                  {callSite}
                </TextLabel2>
              }
            />
          );
        })}
      </VStack>
    );
  },
);

AdopterComponentCallSites.displayName = 'AdopterComponentCallSites';

import React, { memo, useCallback, useState } from 'react';
import countBy from 'lodash/countBy';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import toPairs from 'lodash/toPairs';
import { Icon } from '@cbhq/cds-web/icons';
import { VStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import { BetaCell } from ':cds-website/components/BetaCell';

import { useGetGitLink } from './hooks/useGetGitLink';
import type { ComponentData } from './types';

export const AdopterComponentsExtendedStyles = memo(
  ({
    extendedStyledComponents,
  }: {
    extendedStyledComponents: ComponentData['extendedStyledComponents'];
  }) => {
    const getGitLink = useGetGitLink();
    const sortedAliases = orderBy(
      toPairs(groupBy(extendedStyledComponents, 'alias')),
      ([, callSites]) => callSites.length,
      ['desc'],
    );
    const [activeProp, setActiveProp] = useState<string | undefined>();
    const handleOnPress = useCallback(
      (prop: string) => {
        return () => {
          setActiveProp(prop === activeProp ? undefined : prop);
        };
      },
      [activeProp],
    );

    const handleOnPropCallSite = useCallback(
      (callSite: string) => {
        return () => getBrowserGlobals()?.window.open(getGitLink(callSite), '_blank');
      },
      [getGitLink],
    );

    const selectedContent = useCallback(
      (
        callSites: {
          alias: string;
          callSite: string;
        }[],
      ) => {
        const callSitesPairs = toPairs(countBy(callSites, 'callSite'));
        const sortedCallSites = orderBy(
          callSitesPairs,
          [([, callSiteCount]) => callSiteCount, ([callSite]) => callSite],
          ['desc', 'asc'],
        );
        return sortedCallSites.map(([callSite, callSiteCount]) => {
          const callSiteText = callSiteCount === 1 ? 'file' : 'files';

          return (
            <BetaCell
              end={<TextLabel2 align="end" as="p">{`${callSiteCount} ${callSiteText}`}</TextLabel2>}
              endAccessory={<Icon color="foregroundMuted" name="externalLink" size="s" />}
              offsetHorizontal={1}
              onPress={handleOnPropCallSite(callSite)}
              priority="end"
              start={
                <TextLabel2 as="p" overflow="truncate">
                  {callSite}
                </TextLabel2>
              }
            />
          );
        });
      },
      [handleOnPropCallSite],
    );

    return (
      <VStack>
        <TextHeadline as="h4" spacingBottom={1}>
          Extended Styled Components
        </TextHeadline>
        {sortedAliases.map(([alias, callSites]) => {
          const callSiteCount = callSites.length;
          const selected = activeProp === alias;
          const instancesText = callSiteCount === 1 ? 'instance' : 'instances';
          return (
            <>
              <BetaCell
                end={<TextLabel2 as="p">{`${callSiteCount} ${instancesText}`}</TextLabel2>}
                endAccessory={
                  <Icon
                    color={selected ? 'primary' : 'foregroundMuted'}
                    name={selected ? 'caretUp' : 'caretDown'}
                    size="s"
                  />
                }
                offsetHorizontal={1}
                onPress={handleOnPress(alias)}
                priority="start"
                selected={selected}
                start={<TextLabel2 as="p">{alias}</TextLabel2>}
              />
              {selected && selectedContent(callSites)}
            </>
          );
        })}
      </VStack>
    );
  },
);

AdopterComponentsExtendedStyles.displayName = 'AdopterComponentsExtendedStyles';

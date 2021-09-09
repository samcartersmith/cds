import React, { useCallback, useState, memo } from 'react';
import {Divider, VStack} from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { orderBy, sumBy, toPairs } from 'lodash';
import { BetaCell } from '@cbhq/cds-website/components/BetaCell';
import { Icon } from '@cbhq/cds-web/icons';
import type { ComponentData } from './types';
import { useGetGitLink } from './hooks/useGetGitLink';

export const AdopterComponentProps = memo(
  ({ propsWithCallSites }: { propsWithCallSites: ComponentData['propsWithCallSites'] }) => {
    const getGitLink = useGetGitLink();
    const sortedProps = orderBy(
      toPairs(propsWithCallSites),
      ([, callSites]) => {
        const callSitePairs = toPairs(callSites);
        return sumBy(callSitePairs, (item) => item[1]);
      },
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
        return () => window?.open(getGitLink(callSite), '_blank');
      },
      [getGitLink],
    );

    const selectedContent = useCallback(
      (callSites: [string, number][]) => {
        const sortedCallSites = orderBy(callSites, ([, callSiteCount]) => callSiteCount, ['desc']);
        return (
          <VStack>
            {sortedCallSites.map(([callSite, callSiteCount]) => (
              <BetaCell
                priority="end"
                offsetHorizontal={1}
                onPress={handleOnPropCallSite(callSite)}
                start={
                  <TextLabel2 as="p" overflow="truncate">
                    {callSite}
                  </TextLabel2>
                }
                end={<TextLabel2 as="p" align="end">{`${callSiteCount}x`}</TextLabel2>}
                endAccessory={<Icon size="s" name="externalLink" color="foregroundMuted" />}
              />
            ))
            }
            <Divider spacingTop={2} spacingBottom={2} />
          </VStack>
      )
    },
      [handleOnPropCallSite],
    );

    return (
      <VStack>
        <TextHeadline as="h4" spacingBottom={1}>
          Props
        </TextHeadline>
        {sortedProps.map(([prop, callSites]) => {
          const callSitePairs = toPairs(callSites);
          const propCount = sumBy(callSitePairs, (item) => item[1]);
          const selected = activeProp === prop;
          const instancesText = propCount === 1 ? 'instance' : 'instances';
          return (
            <>
              <BetaCell
                priority="start"
                offsetHorizontal={1}
                start={<TextLabel2 as="p">{prop}</TextLabel2>}
                end={<TextLabel2 as="p">{`${propCount} ${instancesText}`}</TextLabel2>}
                endAccessory={
                  <Icon
                    size="s"
                    name={selected ? 'caretUp' : 'caretDown'}
                    color={selected ? 'primary' : 'foregroundMuted'}
                  />
                }
                onPress={handleOnPress(prop)}
                selected={selected}
              />
              {selected && selectedContent(callSitePairs)}
            </>
          );
        })}
      </VStack>
    );
  },
);

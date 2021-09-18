import React, { useCallback, useState, memo, useContext } from 'react';
import { Divider, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { orderBy, sumBy, toPairs } from 'lodash';
import { Icon } from '@cbhq/cds-web/icons';
import { BetaCell } from ':cds-website/components/BetaCell';
import type { ComponentData } from './types';
import { useGetGitLink } from './hooks/useGetGitLink';
import { AdopterSearchContext, AdopterSearchContextType } from './search/AdopterSearchProvider';
import { getResultsByType, isMatch } from './search/SearchUtils';

export const AdopterComponentProps = memo(
  ({ propsWithCallSites }: { propsWithCallSites: ComponentData['propsWithCallSites'] }) => {
    const getGitLink = useGetGitLink();
    let sortedProps = orderBy(
      toPairs(propsWithCallSites),
      ([, callSites]) => {
        const callSitePairs = toPairs(callSites);
        return sumBy(callSitePairs, (item) => item[1]);
      },
      ['desc'],
    );

    // filter props down to search terms
    const { results: searchResults } = useContext(AdopterSearchContext) as AdopterSearchContextType;
    const propsResults = getResultsByType(searchResults).props;
    if (propsResults.length) {
      sortedProps = sortedProps.filter(([prop, callSites]) => {
        for (const propsResult of propsResults) {
          if (isMatch(propsResult, [prop])) {
            return true;
          }
        }
        return false;
      });
    }

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
            ))}
            <Divider spacingTop={2} spacingBottom={2} />
          </VStack>
        );
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

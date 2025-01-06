/* eslint-disable react/no-array-index-key */
import React, { Fragment, memo, useCallback, useContext, useState } from 'react';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';
import toPairs from 'lodash/toPairs';
import { Icon } from '@cbhq/cds-web/icons';
import { Divider, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import { BetaCell } from ':cds-website/components/BetaCell';

import { useGetGitLink } from './hooks/useGetGitLink';
import { AdopterSearchContext, AdopterSearchContextType } from './search/AdopterSearchProvider';
import { getResultsByType, isMatch } from './search/SearchUtils';
import type { ComponentData } from './types';

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
      sortedProps = sortedProps.filter(([prop]) => {
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
        return () => getBrowserGlobals()?.window.open(getGitLink(callSite), '_blank');
      },
      [getGitLink],
    );

    const selectedContent = useCallback(
      (callSites: [string, number][]) => {
        const sortedCallSites = orderBy(callSites, ([, callSiteCount]) => callSiteCount, ['desc']);
        return (
          <VStack>
            {sortedCallSites.map(([callSite, callSiteCount], index) => (
              <BetaCell
                key={`${callSite}-${callSiteCount}-${index}`}
                end={<TextLabel2 align="end" as="p">{`${callSiteCount}x`}</TextLabel2>}
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
            ))}
            <Divider spacingBottom={2} spacingTop={2} />
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
        {sortedProps.map(([prop, callSites], index) => {
          const callSitePairs = toPairs(callSites);
          const propCount = sumBy(callSitePairs, (item) => item[1]);
          const selected = activeProp === prop;
          const instancesText = propCount === 1 ? 'instance' : 'instances';
          return (
            <Fragment key={`${prop}-${index}`}>
              <BetaCell
                key={prop}
                end={<TextLabel2 as="p">{`${propCount} ${instancesText}`}</TextLabel2>}
                endAccessory={
                  <Icon
                    color={selected ? 'primary' : 'foregroundMuted'}
                    name={selected ? 'caretUp' : 'caretDown'}
                    size="s"
                  />
                }
                offsetHorizontal={1}
                onPress={handleOnPress(prop)}
                priority="start"
                selected={selected}
                start={<TextLabel2 as="p">{prop}</TextLabel2>}
              />
              {selected && selectedContent(callSitePairs)}
            </Fragment>
          );
        })}
      </VStack>
    );
  },
);

AdopterComponentProps.displayName = 'AdopterComponentProps';

import React, { useCallback, useMemo } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { kebabCase } from '@cbhq/cds-utils';
import { Icon } from '@cbhq/cds-web/icons';
import { VStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import { BetaCell } from ':cds-website/components/BetaCell';

import { getCdsRecs } from './utils/getCdsRecs';

export const useCdsRecommendations = (name: string) => {
  return useMemo(() => getCdsRecs(name), [name]);
};

export const AdopterCdsRecommendation = ({
  componentName,
  recommendations,
}: {
  componentName: string;
  recommendations: string[];
}) => {
  const baseUrl = useBaseUrl('components');
  const handleOnPress = useCallback(
    (cdsComponent: string) => {
      return () => {
        const url = `${baseUrl}/${kebabCase(cdsComponent)}`;
        getBrowserGlobals()?.window.open(url, '_blank');
      };
    },
    [baseUrl],
  );
  const titleText = `CDS suggestion${recommendations.length === 1 ? '' : 's'}`;

  return (
    <VStack>
      <TextHeadline as="h4" spacingBottom={1}>
        {titleText}
      </TextHeadline>
      {recommendations.map((item) => {
        return (
          <BetaCell
            key={`${componentName}-${item}`}
            endAccessory={<Icon color="foregroundMuted" name="externalLink" size="s" />}
            offsetHorizontal={1}
            onPress={handleOnPress(item)}
            priority="start"
            start={
              <TextLabel2 as="p" overflow="truncate">
                {item}
              </TextLabel2>
            }
          />
        );
      })}
    </VStack>
  );
};

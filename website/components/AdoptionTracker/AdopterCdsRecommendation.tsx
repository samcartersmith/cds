import React, { useCallback, useMemo } from 'react';
import { components } from '@cbhq/cds-website/data/componentsList';
import { kebabCase } from '@cbhq/cds-utils';

import { TextHeadline, TextLabel2 } from '@cbhq/cds-web/typography';
import { Icon } from '@cbhq/cds-web/icons';
import { VStack } from '@cbhq/cds-web/layout';
import { BetaCell } from '@cbhq/cds-website/components/BetaCell';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { uniq } from 'lodash';

// TODO: Add tags for custom component names
// const tags = {
//   Container: ['Box', 'HStack', 'VStack'],
// };

export const useCdsRecommendations = (name: string) => {
  return useMemo(() => {
    const matches: string[] = [];
    for (const cdsName of components) {
      const camelCaseSplit = kebabCase(cdsName).split('-');
      for (const splitName of kebabCase(name).split('-')) {
        if ([cdsName, ...camelCaseSplit].includes(splitName)) {
          matches.push(cdsName);
        }
      }
    }
    return uniq(matches);
  }, [name]);
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
        window?.open(url, '_blank');
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
            priority="start"
            offsetHorizontal={1}
            start={
              <TextLabel2 as="p" overflow="truncate">
                {item}
              </TextLabel2>
            }
            onPress={handleOnPress(item)}
            endAccessory={<Icon size="s" name="externalLink" color="foregroundMuted" />}
          />
        );
      })}
    </VStack>
  );
};

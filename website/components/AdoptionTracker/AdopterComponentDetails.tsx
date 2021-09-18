import React, { memo, useMemo } from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2, TextTitle3, TextHeadline } from '@cbhq/cds-web/typography';
import type { ComponentData } from './types';
import { AdopterComponentProps } from './AdopterComponentProps';
import { AdopterComponentCallSites } from './AdopterComponentCallSites';
import { AdopterComponentsExtendedStyles } from './AdopterComponentsExtendedStyles';
import { AdopterCdsRecommendation, useCdsRecommendations } from './AdopterCdsRecommendation';
import { AdopterComponentsAliasedCds } from ':cds-website/components/AdoptionTracker/AdopterComponentsAliasedCds';

type DetailsObject = { title: string; details: Details };
type Details = [string, string[]] | string | string[] | DetailsObject | DetailsObject[];

function isDetailsStringArray(item: Details): item is string[] {
  return Array.isArray(item) && typeof item[0] === 'string';
}

function isDetailsObjectArray(item: Details): item is DetailsObject[] {
  return Array.isArray(item) && !isDetailsStringArray(item);
}

function isDetailsObject(item: Details): item is DetailsObject {
  if (!Array.isArray(item) && typeof item !== 'string') {
    return true;
  }
  return false;
}

function parseDetails(item: Details): React.ReactNode {
  if (isDetailsObject(item)) {
    if (item.details === '') {
      return <TextLabel2 as="p">{item.title}</TextLabel2>;
    }
    return (
      <>
        <TextLabel1 as="p">{item.title}</TextLabel1>
        {parseDetails(item.details)}
      </>
    );
  }
  if (isDetailsObjectArray(item) || isDetailsStringArray(item)) {
    return item.map(parseDetails);
  }

  if (typeof item === 'string') {
    return <TextLabel2 as="p">{item}</TextLabel2>;
  }

  return null;
}

const ComponentDetailsTextStack = ({ title, details }: { title: string; details: Details }) => {
  const detailsNode = useMemo(() => parseDetails(details), [details]);
  return (
    <VStack gap={1}>
      <TextHeadline as="h4">{title}</TextHeadline>
      {detailsNode}
    </VStack>
  );
};

export const AdopterComponentDetails = memo(
  ({
    callSites,
    name,
    extendedStyledComponents,
    aliasedCdsComponents,
    propsWithCallSites,
    sourceFile,
    styledComponent,
    cds,
  }: ComponentData) => {
    const cdsRecommendations = useCdsRecommendations(name);
    return (
      <VStack
        width="55%"
        maxHeight="90vh"
        overflow="scroll"
        position="sticky"
        top={76}
        left={0}
        right={0}
        gap={3}
        spacingHorizontal={2}
      >
        <TextTitle3 as="h3">{name}</TextTitle3>
        {!cds && cdsRecommendations.length > 0 && (
          <AdopterCdsRecommendation componentName={name} recommendations={cdsRecommendations} />
        )}
        <ComponentDetailsTextStack title="Source file" details={sourceFile} />
        {styledComponent && (
          <ComponentDetailsTextStack title="Styled component" details={styledComponent} />
        )}
        {propsWithCallSites && <AdopterComponentProps propsWithCallSites={propsWithCallSites} />}
        {extendedStyledComponents && (
          <AdopterComponentsExtendedStyles extendedStyledComponents={extendedStyledComponents} />
        )}
        {aliasedCdsComponents && (
          <AdopterComponentsAliasedCds aliasedCdsComponents={aliasedCdsComponents} />
        )}
        {callSites && <AdopterComponentCallSites callSites={callSites} />}
      </VStack>
    );
  },
);

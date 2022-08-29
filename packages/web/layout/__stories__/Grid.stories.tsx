import React from 'react';
import { ResponsiveGridProps } from '@cbhq/cds-common';

import { TextBody, TextTitle1, TextTitle3 } from '../../typography';
import { BoxElement } from '../Box';
import { Grid, GridProps } from '../Grid';
import { HStack, HStackProps } from '../HStack';
import { VStack } from '../VStack';

import { LoremIpsum } from './LoremIpsum';

const Item: React.FC<Pick<HStackProps<BoxElement>, 'as'>> = ({ children, as }) => (
  <HStack
    background="backgroundAlternate"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    as={as}
  >
    {children}
  </HStack>
);

const gridResponsiveConfig: ResponsiveGridProps = {
  phone: {
    columns: 3,
    gap: 2,
  },
  tablet: {
    columns: 6,
    gap: 1,
  },
};

const GridBase = (props: GridProps<BoxElement>) => {
  return (
    <Grid gap={0.5} responsiveConfig={gridResponsiveConfig} {...props}>
      {Array.from({ length: 12 }).map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={idx} as={props.as === 'ul' ? 'li' : 'div'}>
          <TextTitle1 as="h3">{idx + 1}</TextTitle1>
        </Item>
      ))}
    </Grid>
  );
};

const ImplicitGrid = (props: GridProps<BoxElement>) => {
  return (
    <Grid {...props} gap={0.5}>
      {Array.from({ length: 12 }).map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={idx}>
          <TextTitle1 as="h3">{idx + 1}</TextTitle1>
        </Item>
      ))}
    </Grid>
  );
};

const ImplicitGridClamped = (props: GridProps<BoxElement>) => {
  return (
    <Grid {...props} gap={0.5}>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <LoremIpsum repeat={3} />
      </Item>
      <Item>
        <TextBody as="p">Small</TextBody>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <TextBody as="p">1</TextBody>
      </Item>
      <Item>
        <LoremIpsum repeat={2} />
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
    </Grid>
  );
};

export const GridExamples = () => {
  return (
    <VStack gap={4}>
      <VStack gap={1}>
        <TextTitle1 as="h2">Twelve Column Grid</TextTitle1>
        <GridBase columns={12} />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Columns as String</TextTitle1>
        <TextTitle3 as="h3">100px 20% 1fr</TextTitle3>
        <GridBase columns="100px 20% 1fr" />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">As a List</TextTitle1>
        <GridBase columns={12} as="ul" />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Implicit Grid</TextTitle1>
        <ImplicitGrid columnMin="100px" />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Implicit Grid with Clamps</TextTitle1>
        <ImplicitGridClamped columnMin="min-content" columnMax="200px" />
      </VStack>
    </VStack>
  );
};

export default {
  title: 'Core Components/Grid',
  component: GridExamples,
};

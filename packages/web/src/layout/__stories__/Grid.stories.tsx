import React from 'react';
import {
  GridColumn as GridColumnType,
  ResponsiveColumnProps,
  ResponsiveGridProps,
} from '@cbhq/cds-common';

import { TextBody, TextTitle1, TextTitle3 } from '../../typography';
import { BoxElement } from '../Box';
import { Grid, GridProps } from '../Grid';
import { GridColumn } from '../GridColumn';
import { HStack, HStackProps } from '../HStack';
import { VStack } from '../VStack';

import { LoremIpsum } from './LoremIpsum';

const Item: React.FC<React.PropsWithChildren<HStackProps<BoxElement>>> = ({
  children,
  ...props
}) => (
  <HStack
    alignItems="center"
    background="backgroundAlternate"
    justifyContent="center"
    spacing={2}
    {...props}
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

type GridColumnProps = {
  responsive?: boolean;
};

const responsiveColumnConfig = (idx: number) =>
  ({
    phone: {
      colStart: idx + 1,
      colEnd: idx + 6 > 13 ? -1 : idx + 6,
    },
    tablet: {
      colStart: idx + 1,
      colEnd: idx + 4 > 13 ? -1 : idx + 4,
    },
  } as ResponsiveColumnProps);

const ColumnExamples = ({ responsive }: GridColumnProps) => {
  return (
    <Grid columns={12} gap={0.5}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <GridColumn
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          background="primary"
          colEnd={(idx + 2) as GridColumnType}
          colStart={1}
          responsiveConfig={responsive ? responsiveColumnConfig(idx) : undefined}
          spacing={2}
        />
      ))}
    </Grid>
  );
};

const FullBleedExample = () => {
  return (
    <Grid gap={0.5} templateColumns="100px 1fr 100px">
      <Item background="background">
        <TextBody as="p">Gutter</TextBody>
      </Item>
      <Item>
        <TextBody as="p">Body</TextBody>
      </Item>
      <Item background="background">
        <TextBody as="p">Gutter</TextBody>
      </Item>
      <GridColumn
        background="backgroundAlternate"
        gridColumn="1 / -1"
        justifyContent="center"
        spacing={2}
      >
        <TextBody as="p">Full Bleed</TextBody>
      </GridColumn>
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
        <GridBase templateColumns="100px 20% 1fr" />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">As a List</TextTitle1>
        <GridBase as="ul" columns={12} />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Implicit Grid</TextTitle1>
        <ImplicitGrid columnMin="100px" />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Implicit Grid with Clamps</TextTitle1>
        <ImplicitGridClamped columnMax="200px" columnMin="min-content" />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Column Span</TextTitle1>
        <ColumnExamples />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Responsive Column Span</TextTitle1>
        <ColumnExamples responsive />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Full Bleed</TextTitle1>
        <FullBleedExample />
      </VStack>
    </VStack>
  );
};

export default {
  title: 'Core Components/Grid',
  component: GridExamples,
};

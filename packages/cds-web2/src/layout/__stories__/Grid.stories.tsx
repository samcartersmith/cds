import React from 'react';

import { TextBody, TextTitle1, TextTitle3 } from '../../typography';
import { Grid, type GridDefaulElement, type GridProps } from '../Grid';
import { GridColumn } from '../GridColumn';
import { HStack, type HStackProps } from '../HStack';
import { VStack } from '../VStack';

import { LoremIpsum } from './LoremIpsum';

const Item: React.FC<React.PropsWithChildren<HStackProps<'div' | 'li'>>> = ({
  children,
  ...props
}) => (
  <HStack
    alignItems="center"
    background="bgAlternate"
    justifyContent="center"
    padding={2}
    {...props}
  >
    {children}
  </HStack>
);

const responsiveGapConfig = { base: 2, minTablet: 1, minDesktop: 0.5 } as const;
const GridBase = (props: GridProps<'div' | 'ul'>) => {
  return (
    <Grid gap={responsiveGapConfig} {...props}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Item key={idx} as={props.as === 'ul' ? 'li' : 'div'}>
          <TextTitle1 as="h3">{idx + 1}</TextTitle1>
        </Item>
      ))}
    </Grid>
  );
};

const ImplicitGrid = (props: GridProps<GridDefaulElement>) => {
  return (
    <Grid {...props} gap={0.5}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Item key={idx}>
          <TextTitle1 as="h3">{idx + 1}</TextTitle1>
        </Item>
      ))}
    </Grid>
  );
};

const ImplicitGridClamped = (props: GridProps<GridDefaulElement>) => {
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

const responsiveColStartConfig = (idx: number) => ({
  base: idx + 1,
  minTablet: idx + 1,
  minDesktop: 1,
});
const responsiveColEndConfig = (idx: number) => ({
  base: idx + 6 > 13 ? -1 : idx + 6,
  minTablet: idx + 4 > 13 ? -1 : idx + 4,
  minDesktop: idx + 2,
});

const ColumnExamples = ({ responsive }: GridColumnProps) => {
  return (
    <Grid columns={12} gap={0.5}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <GridColumn
          key={idx}
          background="bgPrimary"
          gridColumnEnd={responsive ? responsiveColEndConfig(idx) : idx + 2}
          gridColumnStart={responsive ? responsiveColStartConfig(idx) : 1}
          padding={2}
        />
      ))}
    </Grid>
  );
};

const FullBleedExample = () => {
  return (
    <Grid gap={0.5} templateColumns="100px 1fr 100px">
      <Item background="bg">
        <TextBody as="p">Gutter</TextBody>
      </Item>
      <Item>
        <TextBody as="p">Body</TextBody>
      </Item>
      <Item background="bg">
        <TextBody as="p">Gutter</TextBody>
      </Item>
      <GridColumn background="bgAlternate" gridColumn="1 / -1" justifyContent="center" padding={2}>
        <TextBody as="p">Full Bleed</TextBody>
      </GridColumn>
    </Grid>
  );
};

const responsiveGridColumnConfig = {
  base: 'repeat(3, 1fr)',
  minTablet: 'repeat(6, 1fr)',
  minDesktop: 'repeat(12, 1fr)',
} as const;

export const GridExamples = () => {
  return (
    <VStack gap={4}>
      <VStack gap={1}>
        <TextTitle1 as="h2">Twelve Column Grid</TextTitle1>
        <GridBase gridTemplateColumns={responsiveGridColumnConfig} />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">Columns as String</TextTitle1>
        <TextTitle3 as="h3">100px 20% 1fr</TextTitle3>
        <GridBase templateColumns="100px 20% 1fr" />
      </VStack>
      <VStack gap={1}>
        <TextTitle1 as="h2">As a List</TextTitle1>
        <GridBase as="ul" gridTemplateColumns={responsiveGridColumnConfig} />
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

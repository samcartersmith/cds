/* eslint-disable react/no-array-index-key */
import React, { ReactNode } from 'react';
import { PaletteBorder, ResponsiveGridProps, SpacingScale } from '@cbhq/cds-common';

import {
  Link,
  TextBody,
  TextDisplay1,
  TextDisplay2,
  TextHeadline,
  TextTitle3,
  TextTitle4,
} from '../../typography';
import { BoxElement } from '../Box';
import { Divider } from '../Divider';
import { Grid, GridProps } from '../Grid';
import { HStack, HStackProps } from '../HStack';
import { VStack } from '../VStack';

import { LoremIpsum } from './LoremIpsum';

const Item: React.FC<HStackProps<BoxElement>> = ({ children, ...props }) => (
  <HStack
    background="backgroundAlternate"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    minWidth="100px"
    {...props}
  >
    {children}
  </HStack>
);

const Example: React.FC<{ title: string; description?: string | ReactNode }> = ({
  children,
  title,
  description,
}) => {
  return (
    <VStack gap={2}>
      <TextTitle3 as="h3">{title}</TextTitle3>
      {description}
      {children}
    </VStack>
  );
};

const sharedWrapperProps = {
  borderColor: 'line' as PaletteBorder,
  spacing: 1 as SpacingScale,
  gap: 1 as SpacingScale,
};

const FlexLayout = () => {
  return (
    <HStack {...sharedWrapperProps}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Item key={idx}>
          <TextBody as="p">{idx + 1}</TextBody>
        </Item>
      ))}
    </HStack>
  );
};

const FlexGrow = () => {
  return (
    <HStack {...sharedWrapperProps}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Item key={idx} flexGrow={1}>
          <TextBody as="p">{idx + 1}</TextBody>
        </Item>
      ))}
    </HStack>
  );
};

const RatioLayout = () => {
  return (
    <HStack {...sharedWrapperProps} flexWrap="wrap">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Item key={idx} flexGrow={idx}>
          <TextBody as="p">{idx + 1}</TextBody>
        </Item>
      ))}
    </HStack>
  );
};

const HolyGrailLayout = () => {
  return (
    <HStack {...sharedWrapperProps} flexWrap="wrap">
      <Item flexBasis="200px">
        <TextBody as="p">Navigation</TextBody>
      </Item>
      <Item flexGrow={1}>
        <TextBody as="p">Main Content</TextBody>
      </Item>
      <Item flexBasis="200px">
        <TextBody as="p">Sidebar</TextBody>
      </Item>
    </HStack>
  );
};

const FlexboxImplicitLayout = () => {
  return (
    <HStack flexWrap="wrap" {...sharedWrapperProps}>
      {Array.from({ length: 20 }).map((_, idx) => (
        <Item
          key={idx}
          flexBasis={idx % 2 ? '200px' : '100px'}
          background={idx % 2 ? 'primaryWash' : 'backgroundAlternate'}
        >
          <TextBody as="p">{idx + 1}</TextBody>
        </Item>
      ))}
    </HStack>
  );
};

const FlexboxImplicitTextLayout = () => {
  return (
    <HStack flexWrap="wrap" {...sharedWrapperProps}>
      <Item>
        <TextBody as="p">Small</TextBody>
      </Item>
      <Item>
        <TextBody as="p">This is a medium block of text</TextBody>
      </Item>
      <Item>
        <TextBody as="p">1</TextBody>
      </Item>
      <Item>
        <TextBody as="p">2</TextBody>
      </Item>
      <Item>
        <TextBody as="p">3</TextBody>
      </Item>
      <Item>
        <TextBody as="p">4</TextBody>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <TextBody as="p">Small</TextBody>
      </Item>
      <Item>
        <TextBody as="p">Small</TextBody>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
    </HStack>
  );
};

const GridLayout = ({
  columnCount = 5,
  ...props
}: GridProps<BoxElement> & { columnCount?: number }) => {
  return (
    <Grid {...sharedWrapperProps} {...props}>
      {Array.from({ length: columnCount }).map((_, idx) => (
        <Item key={idx}>
          <TextBody as="p">{idx + 1}</TextBody>
        </Item>
      ))}
    </Grid>
  );
};

const GridImplicitLayout = () => {
  return (
    <Grid columnMin="100px" columnMax="1fr" {...sharedWrapperProps}>
      {Array.from({ length: 20 }).map((_, idx) => (
        <Item key={idx} width="100px" background="backgroundAlternate">
          <TextBody as="p">{idx + 1}</TextBody>
        </Item>
      ))}
    </Grid>
  );
};

const GridImplicitTextLayout = () => {
  return (
    <Grid columnMin="max-content" columnMax="300px" {...sharedWrapperProps}>
      <Item>
        <TextBody as="p">Small</TextBody>
      </Item>
      <Item>
        <TextBody as="p">This is a medium block of text</TextBody>
      </Item>
      <Item>
        <TextBody as="p">1</TextBody>
      </Item>
      <Item>
        <TextBody as="p">2</TextBody>
      </Item>
      <Item>
        <TextBody as="p">3</TextBody>
      </Item>
      <Item>
        <TextBody as="p">4</TextBody>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <TextBody as="p">Small</TextBody>
      </Item>
      <Item>
        <TextBody as="p">Small</TextBody>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
    </Grid>
  );
};

const responsiveColumns: ResponsiveGridProps = {
  phone: {
    columns: 1,
  },
  tablet: {
    columns: 3,
  },
};

export const Examples = () => {
  return (
    <VStack>
      <TextDisplay1 as="h1" spacingBottom={3}>
        Explicit Layouts
      </TextDisplay1>
      <TextHeadline as="h3" spacingBottom={4}>
        Explicit layouts let you declare every track size to create custom layouts.
      </TextHeadline>
      <TextDisplay2 as="h2" spacingBottom={2}>
        Flexbox
      </TextDisplay2>
      <VStack gap={4}>
        <Example
          title="HStack with No Props"
          description={
            <TextBody as="p">
              This layout is essentially <code>display: flex</code>. It fills the parent container
              and children are sized by <code>width: auto</code>.
            </TextBody>
          }
        >
          <FlexLayout />
        </Example>
        <Example
          title="Stretch/Grow Equal Columns"
          description={
            <TextBody as="p">
              The children <em>grow</em> to equally fill the available space when you pass{' '}
              <code>flex-grow: 1</code> to each child.
            </TextBody>
          }
        >
          <FlexGrow />
        </Example>
        <Example
          title="Ratio Based Column Layout"
          description={
            <TextBody as="p">
              Children will grow proportionally depending on available space and their value of{' '}
              <code>flex-grow</code>.
            </TextBody>
          }
        >
          <RatioLayout />
        </Example>
        <Example
          title="The Holy Grail Layout"
          description={
            <TextBody as="p">
              The first and last child are given explicit sizes via <code>flex-basis</code>, while
              the middle child grows to fill the available remaining space using{' '}
              <code>flex-grow: 1</code>.
            </TextBody>
          }
        >
          <HolyGrailLayout />
        </Example>
      </VStack>
      <Divider spacingVertical={4} />
      <TextDisplay2 as="h2" spacingBottom={2}>
        Grid
      </TextDisplay2>
      <TextBody as="p" spacingBottom={2}>
        These Grid layouts are the same as the ones we just saw, but instead of using flexbox they
        use CSS grid. Grid column dimensions are passed explicitly to the parent via the{' '}
        <code>columns</code> prop, rather than adding styles to each individual child. Read more
        about
        <Link href="https://www.w3.org/TR/css3-grid-layout/#explicit-grids">Explicit Grids</Link>.
      </TextBody>
      <VStack gap={4}>
        <Example
          title="Grid with No Props"
          description={
            <TextBody as="p">
              This layout is essentially <code>display: grid</code>. The Grid fills the width of the
              parent container and children also fill the width of the parent, respectively. Since
              no tracks have been defined, it will appear as a single column of children.
            </TextBody>
          }
        >
          {/* @ts-expect-error for demo purposes */}
          <GridLayout />
        </Example>
        <Example
          title="Equal Columns"
          description={
            <VStack gap={1}>
              <TextBody as="p">The available space will be divided into equal columns.</TextBody>
              <TextTitle4 as="h4" spacingTop={2}>
                Tradeoffs
              </TextTitle4>
              <ul>
                <TextBody as="li">
                  Explicit columns are not responsive. They will not wrap to the next line, and the
                  Grid will actually clip the content when the viewport shrinks.
                </TextBody>
                <TextBody as="li">
                  Under the hood we&apos;re actually saying{' '}
                  <code>grid-template-columns: repeat(COLUMNS, minmax(0, 1fr))</code> where{' '}
                  <code>COLUMNS</code> is the number of equal width columns you want per row. This
                  means the minimum size of each column is actually 0, rather than{' '}
                  <code>min-content</code>, so it will get clipped when the content overflows the
                  available space.
                </TextBody>
              </ul>
            </VStack>
          }
        >
          <GridLayout columns={5} />
        </Example>
        <Example
          title="Responsive Equal Columns"
          description={
            <TextBody as="p">
              You can pass a <code>responsiveConfig</code> and specify number of columns at each
              device breakpoint to make a Grid responsive.{' '}
            </TextBody>
          }
        >
          <GridLayout columns={5} responsiveConfig={responsiveColumns} />
        </Example>
        <Example
          title="Ratio Based Column Layout"
          description={
            <TextBody as="p">
              In the context of Grid free space is referred to as <code>fr</code> and it can be
              divvied between children proportionally. For example: <code>1fr 2fr 3fr</code> will
              create 3 columns that take up the available space of the parent and columns are
              proportionately sized by the number of <code>fr</code>.
            </TextBody>
          }
        >
          <GridLayout columns="1fr 2fr 3fr" columnCount={3} />
        </Example>
        <Example
          title="The Holy Grail Layout"
          description={
            <TextBody as="p">
              Column widths will also apply to all other rows within the Grid.
            </TextBody>
          }
        >
          <GridLayout columns="200px 1fr 200px" columnCount={3} />
        </Example>
        <Divider spacingVertical={4} />
        <VStack>
          <TextDisplay1 as="h1" spacingBottom={3}>
            Implicit Layouts
          </TextDisplay1>
          <TextHeadline as="h3" spacingBottom={4}>
            Implicit layouts allow the content to shape the layout. They are particularly useful
            when content size is unknown or varied.
          </TextHeadline>
          <VStack gap={4}>
            <TextDisplay2 as="h2" spacingBottom={2}>
              Flexbox
            </TextDisplay2>
            <Example
              title="Implicit Flexbox Layout"
              description={
                <VStack gap={1}>
                  <TextBody as="p">
                    Implicit layouts let the content decide how tracks will be defined and laid out
                    based on the size of the children.
                  </TextBody>
                  <TextBody as="p">
                    Columns are sized based on the content of each child and will fill the available
                    space in each row with as many children that can fit. Subsequent rows may vary
                    in column sizes since each column is sized based on the child&apos;s content.
                  </TextBody>
                  <TextBody as="p">
                    Flexbox does not support gaps between rows, though, so may look problematic when
                    items start to wrap.
                  </TextBody>
                </VStack>
              }
            >
              <FlexboxImplicitLayout />
            </Example>
            <Example
              title="Implicit Layout with Inferred Column Sizes"
              description={
                <TextBody as="p">
                  In this example all items are sized based on their content. We apply{' '}
                  <code>display: flex</code> and <code>flex-wrap: wrap</code> to the parent, and all
                  the children flow into an implicit grid.
                </TextBody>
              }
            >
              <FlexboxImplicitTextLayout />
            </Example>
            <Divider spacingVertical={4} />
            <TextDisplay2 as="h2" spacingBottom={2}>
              Grid
            </TextDisplay2>
            <TextBody as="p" spacingBottom={1}>
              When no columns are explicitly passed to a Grid component, it will create an implied
              grid based on the content&apos; relationship to the available space. Under the hood,
              Grid is measuring the available space and calculating how many items it can fit in
              each row. A minimum column size is required because it cannot be inferred. Read more
              about{' '}
              <Link href="https://www.w3.org/TR/css3-grid-layout/#implicit-grids">
                Implicit Grids
              </Link>
              .
            </TextBody>
            <Example
              title="Implicit Grid Layout"
              description={
                <VStack gap={1}>
                  <TextBody as="p">
                    If you don&apos;t pass a <code>columns</code> prop, the Grid will automatically
                    lay out children by how many will fit within the available space. You must
                    declare a minimum <code>columnMin</code> dimension which will create implied
                    columns that will be a minimum of the declared size. You can optionally pass a{' '}
                    <code>columnMax</code> prop to clamp the upperbound of columns. This is similar
                    to setting a <code>flex-basis</code> and a <code>max-width</code> on each child
                    as you would in a Flexbox implementation.
                  </TextBody>
                  <TextTitle4 as="h4" spacingTop={2}>
                    Tradeoffs
                  </TextTitle4>
                  <ul>
                    <TextBody as="li">
                      Implicit columns will automatically wrap content to the next row and add a gap
                      between rows as well, that matches the gap between columns.
                    </TextBody>
                    <TextBody as="li">
                      Implicit layouts are useful when you don&apos;t know how many children there
                      will be, but you know their size.
                    </TextBody>
                    <TextBody as="p">
                      Implicit Grids do not support different column sizes, nor do they support the
                      <code>grid-column</code> prop on children if you try to for a child to span
                      more than one column.
                    </TextBody>
                    <TextBody as="p">
                      It&apos; also important to not that the grid column sizes are calculated based
                      on <em>all of the children</em>, not by the children in each row. So column
                      sizes will carry over from one row to the next.
                    </TextBody>
                  </ul>
                </VStack>
              }
            >
              <GridImplicitLayout />
            </Example>
            <Example
              title="Implicit Grid with Inferred Column Sizes"
              description={
                <VStack gap={1}>
                  <TextBody as="p">
                    The closest you can get to inferring the size of each item is to pass{' '}
                    <code>columnMin=&quot;max-content&quot;</code>. Keep in mind, if an item
                    contains typography it will not wrap to the next line, even if it runs out of
                    room within the row.
                  </TextBody>
                  <TextBody as="p">
                    You might think you can pass a <code>columnMax</code> to clamp the upperbound of
                    the column size, but under the hood the CSS grid&apos; <code>minmax</code>{' '}
                    method will actually ignore the <code>max</code> value since it is less than the{' '}
                    <code>min</code> value.
                  </TextBody>
                </VStack>
              }
            >
              <GridImplicitTextLayout />
            </Example>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default {
  title: 'Demos/Layouts',
  component: FlexLayout,
  //   excludeStories: /.*Performance$/,
};

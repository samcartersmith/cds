/* eslint-disable react/jsx-handler-names */
import { Meta, Story } from '@storybook/react';
import { css } from 'linaria';

import { Accordion, AccordionItem } from '../../accordion';
import { VStack } from '../../alpha/VStack';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Avatar } from '../../media';
import { ThemeProvider } from '../../system';
import { TextBody, TextHeadline, TextLabel2 } from '../../typography';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '..';

export default {
  title: 'Core Components/Table/TableCell',
  component: TableCell,
} as Meta;

const spacingConfig = {
  flush: {
    outer: { spacing: 0, spacingVertical: 0, spacingHorizontal: 2 },
    inner: { spacing: 0, spacingVertical: 0, spacingHorizontal: 0 },
  },
  normal: { spacing: 2 },
  big: { spacing: 5 },
  huge: { spacing: 7 },
} as const;

export const CellSpacing: Story = () => {
  return (
    <Table bordered cellSpacing={spacingConfig.flush} variant="ruled">
      <TableHeader>
        <TableRow backgroundColor="backgroundAlternate">
          <TableCell title="First Header" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell subtitle="0.11882557" title="$2,475.68" />
        </TableRow>
      </TableBody>
    </Table>
  );
};

const flex = css`
  display: flex;
`;

export const VerticallyAlignedTableCell: Story = () => {
  return (
    <Table bordered cellSpacing={spacingConfig.flush} variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell
            alignItems="flex-start"
            dangerouslySetClassName={flex}
            title="This TableCell will be aligned to the top of its parent"
            width={300}
          />
          <TableCell>
            <Accordion>
              <AccordionItem itemKey="1" title="Accordion Item">
                <TextBody as="p">
                  <LoremIpsum repeat={3} />
                </TextBody>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const ComplexSpacingOverride: Story = () => {
  return (
    <VStack gap={2}>
      <TextBody as="p">
        This story is complex on purpose - it is intended to provide visgreg testing to ensure crazy
        spacing configs do what they are supposed to do:
      </TextBody>
      <Table bordered cellSpacing={spacingConfig.flush} variant="ruled">
        <TableHeader>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell subtitle="Default set on Table" title="Flush first column" />
            <TableCell subtitle="Default set on Table" title="Flush second column" />
            <TableCell subtitle="Default set on Table" title="Flush third column" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              innerPadding={spacingConfig.normal}
              onPress={console.log}
              subtitle={`innerPadding ${JSON.stringify(spacingConfig.normal)}`}
              title="TableCell with defined innerPadding"
            />
            <TableCell
              innerPadding={spacingConfig.big}
              onPress={console.log}
              subtitle={`innerPadding ${JSON.stringify(spacingConfig.big)}`}
              title="TableCell with defined innerPadding"
            />
            <TableCell
              innerPadding={spacingConfig.huge}
              onPress={console.log}
              subtitle={`innerPadding ${JSON.stringify(spacingConfig.huge)}`}
              title="TableCell with defined innerPadding"
            />
          </TableRow>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell
              onPress={console.log}
              outerPadding={spacingConfig.normal}
              subtitle={`outerPadding ${JSON.stringify(spacingConfig.normal)}`}
              title="TableCell with defined innerPadding"
            />
            <TableCell
              onPress={console.log}
              outerPadding={spacingConfig.big}
              subtitle={`outerPadding ${JSON.stringify(spacingConfig.big)}`}
              title="TableCell with defined outerPadding"
            />
            <TableCell
              onPress={console.log}
              outerPadding={spacingConfig.huge}
              subtitle={`outerPadding ${JSON.stringify(spacingConfig.huge)}`}
              title="TableCell with defined outerPadding"
            />
          </TableRow>
          <TableRow>
            <TableCell
              innerPadding={spacingConfig.normal}
              onPress={console.log}
              outerPadding={spacingConfig.normal}
              subtitle={`innerPadding/outerPadding ${JSON.stringify(spacingConfig.normal)}`}
              title="TableCell with defined spacing"
            />
            <TableCell
              innerPadding={spacingConfig.big}
              onPress={console.log}
              outerPadding={spacingConfig.big}
              subtitle={`innerPadding/outerPadding ${JSON.stringify(spacingConfig.big)}`}
              title="TableCell with defined spacing"
            />
            <TableCell
              innerPadding={spacingConfig.huge}
              onPress={console.log}
              outerPadding={spacingConfig.huge}
              subtitle={`innerPadding/outerPadding ${JSON.stringify(spacingConfig.huge)}`}
              title="TableCell with defined spacing"
            />
          </TableRow>
        </TableBody>
      </Table>
    </VStack>
  );
};

export const SampleCells: Story = () => {
  return (
    <ThemeProvider spectrum="light">
      <Table bordered variant="ruled">
        <TableHeader>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell title="First Header" />
            <TableCell>
              <TextHeadline as="p" color="currentColor">
                Second Header
              </TextHeadline>
            </TableCell>
            <TableCell title="Third Header" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              overflow="truncate"
              start={
                <Avatar
                  alt="test-avatar"
                  size="l"
                  src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
                />
              }
              subtitle="BTC and I'm like please please truncate me"
              title="Bitcoin"
            />
            <TableCell subtitle="0.11882557" title="$2,475.68" />
            <TableCell>
              <TextHeadline as="h2" color="currentColor">
                $2,221.01
              </TextHeadline>
              <TextLabel2 as="p" color="foregroundMuted">
                0.1519581 BTC
              </TextLabel2>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell title="First Item (footer)" />
            <TableCell title="Second Item (footer)" />
            <TableCell title="Third Item (footer)" />
          </TableRow>
        </TableFooter>
      </Table>
    </ThemeProvider>
  );
};

export const SampleCellsDense = () => {
  return (
    <ThemeProvider scale="xSmall">
      <SampleCells />
    </ThemeProvider>
  );
};

export const SampleFixedLayout: Story = () => {
  return (
    <ThemeProvider spectrum="light">
      <Table bordered tableLayout="fixed" variant="ruled">
        <TableHeader>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell title="First Header" width="20%" />
            <TableCell>
              <TextHeadline as="p" color="currentColor">
                Second Header
              </TextHeadline>
            </TableCell>
            <TableCell title="Third Header" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              overflow="truncate"
              start={
                <Avatar
                  alt="test-avatar"
                  size="l"
                  src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
                />
              }
              subtitle="BTC and I'm like please please truncate me"
              title="Bitcoin"
            />
            <TableCell subtitle="0.11882557" title="$2,475.68" />
            <TableCell>
              <TextHeadline as="h2" color="currentColor">
                $2,221.01
              </TextHeadline>
              <TextLabel2 as="p" color="foregroundMuted">
                0.1519581 BTC
              </TextLabel2>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell title="First Item (footer)" />
            <TableCell title="Second Item (footer)" />
            <TableCell title="Third Item (footer)" />
          </TableRow>
        </TableFooter>
      </Table>
    </ThemeProvider>
  );
};

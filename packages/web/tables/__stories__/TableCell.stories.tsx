/* eslint-disable react/jsx-handler-names */
import { Meta, Story } from '@storybook/react';

import { VStack } from '../../alpha/VStack';
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
    <Table variant="ruled" bordered cellSpacing={spacingConfig.flush}>
      <TableHeader>
        <TableRow backgroundColor="backgroundAlternate">
          <TableCell title="First Header" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell title="$2,475.68" subtitle="0.11882557" />
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
      <Table variant="ruled" bordered cellSpacing={spacingConfig.flush}>
        <TableHeader>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell title="Flush first column" subtitle="Default set on Table" />
            <TableCell title="Flush second column" subtitle="Default set on Table" />
            <TableCell title="Flush third column" subtitle="Default set on Table" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              onPress={console.log}
              title="TableCell with defined innerSpacing"
              subtitle={`innerSpacing ${JSON.stringify(spacingConfig.normal)}`}
              innerSpacing={spacingConfig.normal}
            />
            <TableCell
              onPress={console.log}
              title="TableCell with defined innerSpacing"
              subtitle={`innerSpacing ${JSON.stringify(spacingConfig.big)}`}
              innerSpacing={spacingConfig.big}
            />
            <TableCell
              onPress={console.log}
              title="TableCell with defined innerSpacing"
              subtitle={`innerSpacing ${JSON.stringify(spacingConfig.huge)}`}
              innerSpacing={spacingConfig.huge}
            />
          </TableRow>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell
              onPress={console.log}
              title="TableCell with defined innerSpacing"
              subtitle={`outerSpacing ${JSON.stringify(spacingConfig.normal)}`}
              outerSpacing={spacingConfig.normal}
            />
            <TableCell
              onPress={console.log}
              title="TableCell with defined outerSpacing"
              subtitle={`outerSpacing ${JSON.stringify(spacingConfig.big)}`}
              outerSpacing={spacingConfig.big}
            />
            <TableCell
              onPress={console.log}
              title="TableCell with defined outerSpacing"
              subtitle={`outerSpacing ${JSON.stringify(spacingConfig.huge)}`}
              outerSpacing={spacingConfig.huge}
            />
          </TableRow>
          <TableRow>
            <TableCell
              onPress={console.log}
              title="TableCell with defined spacing"
              subtitle={`innerSpacing/outerSpacing ${JSON.stringify(spacingConfig.normal)}`}
              innerSpacing={spacingConfig.normal}
              outerSpacing={spacingConfig.normal}
            />
            <TableCell
              onPress={console.log}
              title="TableCell with defined spacing"
              subtitle={`innerSpacing/outerSpacing ${JSON.stringify(spacingConfig.big)}`}
              innerSpacing={spacingConfig.big}
              outerSpacing={spacingConfig.big}
            />
            <TableCell
              onPress={console.log}
              title="TableCell with defined spacing"
              subtitle={`innerSpacing/outerSpacing ${JSON.stringify(spacingConfig.huge)}`}
              innerSpacing={spacingConfig.huge}
              outerSpacing={spacingConfig.huge}
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
      <Table variant="ruled" bordered>
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
              start={
                <Avatar
                  alt="test-avatar"
                  src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
                  size="l"
                />
              }
              title="Bitcoin"
              subtitle="BTC and I'm like please please truncate me"
              overflow="truncate"
            />
            <TableCell title="$2,475.68" subtitle="0.11882557" />
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
      <Table variant="ruled" bordered tableLayout="fixed">
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
              start={
                <Avatar
                  alt="test-avatar"
                  src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
                  size="l"
                />
              }
              title="Bitcoin"
              subtitle="BTC and I'm like please please truncate me"
              overflow="truncate"
            />
            <TableCell title="$2,475.68" subtitle="0.11882557" />
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

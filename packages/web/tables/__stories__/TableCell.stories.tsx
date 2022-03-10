import { Meta, Story } from '@storybook/react';

import { Avatar } from '../../media';
import { ThemeProvider } from '../../system';
import { TextHeadline, TextLabel2 } from '../../typography';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '..';

export default {
  title: 'Core Components/Table/TableCell',
  component: TableCell,
} as Meta;

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

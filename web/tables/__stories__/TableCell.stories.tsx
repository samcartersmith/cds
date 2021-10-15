import { css } from 'linaria';
import { Story, Meta } from '@storybook/react';

import { Table, TableRow, TableBody, TableFoot, TableCell, TableHead } from '..';
import { ThemeProvider } from '../../system';
import { TextLabel2, TextHeadline } from '../../typography';
import { Box } from '../../layout';

export default {
  title: 'Core Components/Table/TableCell',
  component: TableCell,
} as Meta;

const MockAvatar = (props: Partial<HTMLImageElement>) => {
  const avatarStyles = css`
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 1;

    background: var(--light);
    border: 1px solid var(--line);
    border-radius: 50%;

    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 50%;
    }
  `;

  return (
    <div className={avatarStyles}>
      <img src={props?.src} alt={props?.alt} />
    </div>
  );
};

export const SampleCells: Story = () => {
  return (
    <ThemeProvider spectrum="light">
      <Table variant="ruled" bordered>
        <TableHead>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell title="First Header" />
            <TableCell>
              <TextHeadline as="p" color="currentColor">
                Second Header
              </TextHeadline>
            </TableCell>
            <TableCell title="Third Header" />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              overflow="truncate"
              start={
                <Box spacingEnd={1}>
                  <MockAvatar src="https://uifaces.co/our-content/donated/fyXUlj0e.jpg" />
                </Box>
              }
              title="Bitcoin"
              subtitle="BTC and I'm like please please truncate me"
            />
            <TableCell
              overflow="truncate"
              alignItems="flex-start"
              title="$2,475.68"
              subtitle="0.11882557"
            />
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
        <TableFoot>
          <TableRow>
            <TableCell title="First Item (footer)" />
            <TableCell title="Second Item (footer)" />
            <TableCell title="Third Item (footer)" />
          </TableRow>
        </TableFoot>
      </Table>
    </ThemeProvider>
  );
};

import { css } from 'linaria';
import { Story, Meta } from '@storybook/react';

import { Table, TableRow, TableBody, TableFoot, TableCell, TableHead } from '..';
import { ThemeProvider } from '../../system';
import { Box, VStack } from '../../layout';
import { Icon } from '../../icons';
import { TextHeadline } from '../../typography';

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

const overflowClass = css`
  max-width: 200px;
`;

export const SampleCells: Story = () => {
  return (
    <ThemeProvider spectrum="light">
      <Table variant="ruled" border>
        <TableHead>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell
              title="First Header"
              accessory={
                <VStack>
                  <Icon color="foregroundMuted" name="sortUpCenter" size="xs" />
                  <Icon
                    color="foregroundMuted"
                    name="sortDownCenter"
                    size="xs"
                    // @ts-expect-error This in not exposed, but we want to use it
                    offsetTop={0.5}
                  />
                </VStack>
              }
            />
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
              className={overflowClass}
              media={
                <Box spacingEnd={1}>
                  <MockAvatar src="https://uifaces.co/our-content/donated/fyXUlj0e.jpg" />
                </Box>
              }
              title="First Item"
              subtitle="This one will get truncated if it gets too long, you only need to use other special CDS components"
            />
            <TableCell title="Second Item" subtitle="This gets truncated too cause it's so long" />
            <TableCell
              title="Third Item"
              description="This is a description, it is _never_ turncated"
            />
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

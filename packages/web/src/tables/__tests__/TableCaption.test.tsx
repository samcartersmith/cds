/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { responsiveClassName } from '../../styles/responsive';
import { palette } from '../../tokens';
import { TextDisplay2 } from '../../typography';
import { Table } from '../Table';
import { TableCaption } from '../TableCaption';
import { TableCaptionProps } from '../types/tableCaptionTypes';

const DEFAULT_CAPTION = 'Table Caption';
const TABLE_TEST_ID = 'mock-table';
const CAPTION_TEST_ID = 'mock-caption';

type TableCaptionMockProps = {
  children?: TableCaptionProps['children'];
} & Omit<TableCaptionProps, 'children'>;

const TableCaptionMock = ({ children = DEFAULT_CAPTION, ...rest }: TableCaptionMockProps) => (
  <Table testID={TABLE_TEST_ID}>
    <TableCaption {...rest} testID={CAPTION_TEST_ID}>
      {children}
    </TableCaption>
  </Table>
);

describe('TableCaption', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<TableCaptionMock />)).toHaveNoViolations();
  });

  it('renders an accessible label for table when children is a string', () => {
    render(<TableCaptionMock />);

    expect(screen.getByText(DEFAULT_CAPTION)).toBeVisible();
    expect(screen.getByTestId(TABLE_TEST_ID)).toHaveAccessibleName(DEFAULT_CAPTION);
  });

  it('renders an accessible label for table when children is a React element', () => {
    const caption = 'Some Other Caption';

    render(
      <TableCaptionMock>
        <TextDisplay2 as="h2">{caption}</TextDisplay2>
      </TableCaptionMock>,
    );

    expect(screen.getByText(caption)).toBeVisible();
    expect(screen.getByTestId(TABLE_TEST_ID)).toHaveAccessibleName(caption);
  });

  it('renders text as a span by default', () => {
    render(<TableCaptionMock />);

    expect(screen.getByText(DEFAULT_CAPTION)).toContainHTML(
      `<span class="typographyResets title3 currentColor transition start">${DEFAULT_CAPTION}</span>`,
    );
  });

  it('renders text as the desired element', () => {
    render(<TableCaptionMock as="h2" />);

    expect(screen.getByText(DEFAULT_CAPTION)).toContainHTML(
      `<h2 class="typographyResets title3 currentColor transition start">${DEFAULT_CAPTION}</h2>`,
    );
  });

  it('left aligns string children by default', () => {
    render(<TableCaptionMock />);

    expect(screen.getByText(DEFAULT_CAPTION)).toHaveClass('start');
  });

  it('center aligns string children', () => {
    render(<TableCaptionMock align="center" />);

    expect(screen.getByText(DEFAULT_CAPTION)).toHaveClass('center');
  });

  it('right aligns string children', () => {
    render(<TableCaptionMock align="end" />);

    expect(screen.getByText(DEFAULT_CAPTION)).toHaveClass('end');
  });

  it('justify aligns string children', () => {
    render(<TableCaptionMock align="justify" />);

    expect(screen.getByText(DEFAULT_CAPTION)).toHaveClass('justify');
  });

  it('sets text color', () => {
    render(<TableCaptionMock color="positive" />);

    expect(screen.getByTestId(CAPTION_TEST_ID)).toHaveStyle({ color: palette.positive });
  });

  it('sets background color', () => {
    render(<TableCaptionMock backgroundColor="negative" />);

    expect(screen.getByTestId(CAPTION_TEST_ID)).toHaveStyle({ backgroundColor: palette.negative });
  });

  it('sets responsiveClassName', () => {
    render(
      <TableCaptionMock
        responsiveConfig={{
          phone: {
            innerSpacing: {
              spacing: 2,
            },
          },
        }}
      />,
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId(CAPTION_TEST_ID).firstChild).toHaveClass(responsiveClassName);
  });
});

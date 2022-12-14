import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { TextTitle2 } from '../../typography';
import { Table, TableProps } from '../Table';

const A11Y_LABEL = 'An accessible label';

type TableMockProps = Omit<TableProps, 'children'>;

const TableMock = (props: TableMockProps) => (
  <Table {...props}>
    {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
    <>Child</>
  </Table>
);

describe('Table', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<TableMock />)).toHaveNoViolations();
  });

  it('has an accessible name when accessibilityLabelledBy is set', () => {
    render(
      <>
        <TextTitle2 id="table-title" as="h2">
          {A11Y_LABEL}
        </TextTitle2>
        <TableMock accessibilityLabelledBy="table-title" />
      </>,
    );

    expect(screen.getByLabelText(A11Y_LABEL)).toBeTruthy();
  });

  it('has an accessible name when accessibilityLabel is set', () => {
    render(<TableMock accessibilityLabel={A11Y_LABEL} />);

    expect(screen.getByLabelText(A11Y_LABEL)).toBeTruthy();
  });
});

import '@testing-library/jest-dom';

import { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { tableHeaderStaticClassName, tableStickyClassName } from '../styles/tableStyles';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableFooter } from '../TableFooter';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

import {
  compactCellSpacing,
  defaultCellSpacing,
  useTableCellSpacing,
  useTableCellTag,
  useTableSectionTag,
} from './useTable';

const HOOK_ERROR = Error(
  'This component must be wrapped in a TableHeader, TableBody or TableFooter.',
);
describe('useTableTag', () => {
  it('Throw an error warning devs to use this hook in context', async () => {
    const { result: sectionResult } = renderHook(() => useTableSectionTag());
    const { result: cellResult } = renderHook(() => useTableCellTag());
    expect(sectionResult.error).toEqual(HOOK_ERROR);
    expect(cellResult.error).toEqual(HOOK_ERROR);
  });

  it('Get proper section tag for TableHeader', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableHeader>{children}</TableHeader>
    );
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('thead');
  });

  it('Get proper section tag for TableBody', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => <TableBody>{children}</TableBody>;
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('tbody');
  });

  it('Get proper section tag for TableFooter', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableFooter>{children}</TableFooter>
    );
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('tfoot');
  });

  it('Get proper cell tag in TableHeader', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableHeader>{children}</TableHeader>
    );
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('th');
  });

  it('Get proper cell tag in TableBody', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => <TableBody>{children}</TableBody>;
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('td');
  });

  it('Get proper cell tag in TableFooter', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableFooter>{children}</TableFooter>
    );
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('td');
  });

  it('Get proper cell spacing', async () => {
    const cellSpacing = {
      outer: { spacingVertical: 0, spacingHorizontal: 0 },
      inner: { spacingVertical: 0 },
    } as const;

    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <Table cellSpacing={cellSpacing}>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toBe(cellSpacing);
  });

  it('Get default cell spacing', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toBe(defaultCellSpacing);
  });

  it('Get compact cell spacing', async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <Table compact>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toBe(compactCellSpacing);
  });

  it('TableHeader with sticky gets proper className', async () => {
    const TEST_ID = 'table-header';

    const { getByTestId } = render(
      <Table>
        <TableHeader sticky testID={TEST_ID}>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableBody>
      </Table>,
    );

    const tableHeader: HTMLElement | null = getByTestId(TEST_ID);
    expect(tableHeader).toHaveClass(tableHeaderStaticClassName);
    expect(tableHeader).toHaveClass(tableStickyClassName);
  });

  it('TableHeader without sticky gets proper className', async () => {
    const TEST_ID = 'table-header';

    const { getByTestId } = render(
      <Table>
        <TableHeader testID={TEST_ID}>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableBody>
      </Table>,
    );

    const tableHeader: HTMLElement | null = getByTestId(TEST_ID);
    expect(tableHeader).toHaveClass(tableHeaderStaticClassName);
    expect(tableHeader).not.toHaveClass(tableStickyClassName);
  });
});

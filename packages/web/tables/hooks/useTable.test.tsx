import { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { defaultCellSpacing } from '../context/TableContext';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableFooter } from '../TableFooter';
import { TableHeader } from '../TableHeader';

import { useTableCellSpacing, useTableCellTag, useTableSectionTag } from './useTable';

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
});

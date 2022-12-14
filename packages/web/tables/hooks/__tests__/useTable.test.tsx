import { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { ThemeProvider } from '../../../system/ThemeProvider';
import { Table } from '../../Table';
import { TableBody } from '../../TableBody';
import { TableFooter } from '../../TableFooter';
import { TableHeader } from '../../TableHeader';
import {
  compactCellSpacing,
  defaultCellSpacing,
  defaultDenseCellSpacing,
  useTableCellSpacing,
  useTableCellTag,
  useTableSectionTag,
} from '../useTable';

const HOOK_ERROR = Error(
  'This component must be wrapped in a TableHeader, TableBody or TableFooter.',
);
describe('useTableTag', () => {
  it('Throw an error warning devs to use this hook in context', () => {
    const { result: sectionResult } = renderHook(() => useTableSectionTag());
    const { result: cellResult } = renderHook(() => useTableCellTag());
    const { result: cellSpacingResult } = renderHook(() => useTableCellSpacing());
    expect(sectionResult.error).toEqual(HOOK_ERROR);
    expect(cellResult.error).toEqual(HOOK_ERROR);
    expect(cellSpacingResult.error).toEqual(HOOK_ERROR);
  });

  it('Get proper section tag for TableHeader', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableHeader>{children}</TableHeader>
    );
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('thead');
  });

  it('Get proper section tag for TableBody', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => <TableBody>{children}</TableBody>;
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('tbody');
  });

  it('Get proper section tag for TableFooter', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableFooter>{children}</TableFooter>
    );
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('tfoot');
  });

  it('Get proper cell tag in TableHeader', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableHeader>{children}</TableHeader>
    );
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('th');
  });

  it('Get proper cell tag in TableBody', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => <TableBody>{children}</TableBody>;
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('td');
  });

  it('Get proper cell tag in TableFooter', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <TableFooter>{children}</TableFooter>
    );
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('td');
  });

  it('Get proper cell tag in TableBody when using the as prop', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => <TableBody>{children}</TableBody>;
    const { result } = renderHook(() => useTableCellTag('th'), { wrapper });

    expect(result.current).toBe('th');
  });

  it('Get proper cell spacing', () => {
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

    expect(result.current).toEqual(cellSpacing);
  });

  it('Get default cell spacing', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toEqual(defaultCellSpacing);
  });

  it('Get default cell spacing dense', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <ThemeProvider spectrum="light" scale="xSmall">
        <Table>
          <TableBody>{children}</TableBody>
        </Table>
      </ThemeProvider>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toEqual(defaultDenseCellSpacing);
  });

  it('Get compact cell spacing', () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <Table compact>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toEqual(compactCellSpacing);
  });

  it('Get cell spacing can skip as validation', () => {
    const { result } = renderHook(() => useTableCellSpacing({ skipAsValidation: true }));

    expect(result.error).toBeUndefined();
  });
});

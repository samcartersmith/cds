import {
  ElevationProvider,
  ElevationChildrenProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { SystemProvider } from '@cbhq/cds-common/SystemProvider';
import { elevationChildrenPalette } from '@cbhq/cds-common/tokens/elevation';
import { renderHook } from '@testing-library/react-hooks';

import { paletteValueToCssVar } from '../../utils/palette';
import { useElevationStyles } from '../useElevationStyles';

const paletteAsCssVars = {
  '--foreground': 'rgb(var(--gray100))',
  '--foreground-muted': 'rgb(var(--gray60))',
  '--background': 'rgb(var(--gray0))',
  '--background-alternate': 'rgb(var(--gray5))',
  '--background-overlay': 'rgba(var(--gray80),0.33)',
  '--line': 'rgba(var(--gray60),0.2)',
  '--line-heavy': 'rgba(var(--gray60),0.66)',
  '--primary': 'rgb(var(--blue60))',
  '--primary-wash': 'rgb(var(--blue0))',
  '--primary-foreground': 'rgb(var(--gray0))',
  '--negative': 'rgb(var(--red60))',
  '--negative-foreground': 'rgb(var(--gray0))',
  '--positive': 'rgb(var(--green60))',
  '--positive-foreground': 'rgb(var(--gray0))',
  '--secondary': 'rgb(var(--gray0))',
  '--secondary-foreground': 'rgb(var(--gray100))',
  '--transparent': 'rgba(var(--gray0),0)',
};

describe('useElevationStyles', () => {
  it('returns emptyObject if not used in an elevated surface and no elevation is passed in', () => {
    const { result } = renderHook(() => useElevationStyles(), {
      wrapper: (props) => <div {...props} />,
    });
    expect(result.current).toEqual({});
  });

  it('light mode - returns emptyObject if used in an elevated surface but no elevation is passed to ElevationProvider', () => {
    const { result } = renderHook(() => useElevationStyles(), {
      wrapper: (props) => (
        <SystemProvider>
          <ElevationProvider>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toEqual({});
  });

  it('light mode - returns a style object for an elevated surface with level 1', () => {
    /** If value is passed in then we know this is for the elevated surface and not its children */
    const { result } = renderHook(() => useElevationStyles(1));
    expect(result.current).toEqual({
      boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.02)',
    });
  });

  it('light mode - returns a style object for an elevated surface with level 2', () => {
    /** If value is passed in then we know this is for the elevated surface and not its children */
    const { result } = renderHook(() => useElevationStyles(2));
    expect(result.current).toEqual({
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
    });
  });

  it('light mode - does not return a style object for the child of an elevated surface with level 1', () => {
    const { result } = renderHook(() => useElevationStyles(), {
      wrapper: (props) => (
        <SystemProvider>
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toEqual({});
  });

  it('light mode - does not return a style object for the child of an elevated surface with level 2', () => {
    const { result } = renderHook(() => useElevationStyles(), {
      wrapper: (props) => (
        <SystemProvider>
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toEqual({});
  });

  it('dark mode - returns a style object for an elevated surface with level 1', () => {
    /** If value is passed in then we know this is for the elevated surface and not its children */
    const { result } = renderHook(() => useElevationStyles(1), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={1} {...props} />
        </SystemProvider>
      ),
    });
    expect(result.current).toEqual({
      ...paletteAsCssVars,
      '--background': paletteValueToCssVar('gray5'),
      '--transparent': paletteValueToCssVar('gray5'),
      boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.02)',
    });
  });

  it('dark mode - returns a style object for an elevated surface with level 2', () => {
    /** If value is passed in then we know this is for the elevated surface and not its children */
    const { result } = renderHook(() => useElevationStyles(2), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={2} {...props} />
        </SystemProvider>
      ),
    });
    expect(result.current).toEqual({
      ...paletteAsCssVars,
      '--background': paletteValueToCssVar('gray10'),
      '--transparent': paletteValueToCssVar('gray10'),
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
    });
  });

  it('dark mode - returns a style object for the child of an elevated surface with level 1', () => {
    const { result } = renderHook(() => useElevationStyles(), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toEqual({
      ...paletteAsCssVars,
      '--background': paletteValueToCssVar('gray5'),
      '--transparent': paletteValueToCssVar('gray5'),
      // @ts-expect-error - secondary exists on elevationChildrenPalette level 1
      '--secondary': paletteValueToCssVar(elevationChildrenPalette[1].secondary),
    });
  });

  it('dark mode - returns a style object for the child of an elevated surface with level 2', () => {
    const { result } = renderHook(() => useElevationStyles(), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toEqual({
      ...paletteAsCssVars,
      '--background': paletteValueToCssVar('gray10'),
      '--transparent': paletteValueToCssVar('gray10'),
      // @ts-expect-error - secondary exists on elevationChildrenPalette level 2
      '--secondary': paletteValueToCssVar(elevationChildrenPalette[2].secondary),
      // @ts-expect-error - line exists on elevationChildrenPalette level 2
      '--line': paletteValueToCssVar(elevationChildrenPalette[2].line),
    });
  });
});

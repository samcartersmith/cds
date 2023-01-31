import { renderHook } from '@testing-library/react-hooks';

import { ThemeProvider } from '../../system/ThemeProvider';
import { usePaletteToCssVars } from '../usePaletteToCssVars';

const MockCustomPalette: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  <ThemeProvider palette={{ background: 'orange60' }}>{children}</ThemeProvider>
);

const defaultPaletteMock = {
  '--foreground': 'rgb(var(--gray100))',
  '--foreground-muted': 'rgb(var(--gray60))',
  '--background': 'rgb(var(--gray0))',
  '--background-alternate': 'rgb(var(--gray5))',
  '--background-overlay': 'rgba(var(--gray80),0.33)',
  '--line': 'rgba(var(--gray60),0.2)',
  '--line-heavy': 'rgba(var(--gray60),0.68)',
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

describe('usePaletteToCssVars', () => {
  it('should convert defaultPalette if no custom palette is provided', () => {
    const { result } = renderHook(() => usePaletteToCssVars(), {
      wrapper: ThemeProvider,
    });
    expect(result.current).toEqual(defaultPaletteMock);
  });

  it('should handle palette overrides', () => {
    const { result } = renderHook(() => usePaletteToCssVars(), {
      wrapper: MockCustomPalette,
    });
    expect(result.current).toEqual({
      ...defaultPaletteMock,
      '--background': 'rgb(var(--orange60))',
    });
  });
});

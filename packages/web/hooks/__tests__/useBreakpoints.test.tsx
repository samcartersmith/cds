import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { breakpoints } from '../../layout/responsive';
import {
  DefaultToDeviceProps,
  DefaultToDeviceProvider,
} from '../../system/DefaultToDeviceProvider';
import { defaultDeviceMatchesMap, useBreakpoints } from '../useBreakpoints';

type WrapperProps = {
  children?: ReactNode;
} & Omit<DefaultToDeviceProps, 'children'>;

const wrapper = ({ children, device }: WrapperProps) => (
  <DefaultToDeviceProvider device={device}>{children}</DefaultToDeviceProvider>
);

describe('useBreakpoints hook', () => {
  it('matches tablet breakpoint and smaller devices when window width is 768px', () => {
    window.innerWidth = breakpoints.tablet;
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current).toStrictEqual({
      isPhone: true,
      isPhoneLandscape: true,
      isTablet: true,
      isTabletLandscape: false,
      isDesktop: false,
      isDesktopLarge: false,
      isExtraWide: false,
    });
  });
  it('defaults to match phone breakpoint when default device is a phone', () => {
    const { result } = renderHook(() => useBreakpoints(), {
      wrapper,
      initialProps: { device: 'phone' },
    });

    expect(result.current).toStrictEqual(defaultDeviceMatchesMap.phone);
  });
  it('defaults to match tablet breakpoint when default device is a tablet', () => {
    const { result } = renderHook(() => useBreakpoints(), {
      wrapper,
      initialProps: { device: 'tablet' },
    });

    expect(result.current).toStrictEqual(defaultDeviceMatchesMap.tablet);
  });
  it('defaults to match desktop breakpoint when default device is a desktop', () => {
    const { result } = renderHook(() => useBreakpoints(), {
      wrapper,
      initialProps: { device: 'desktop' },
    });

    expect(result.current).toStrictEqual(defaultDeviceMatchesMap.desktop);
  });
});

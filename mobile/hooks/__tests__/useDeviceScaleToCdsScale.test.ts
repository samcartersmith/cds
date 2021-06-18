/* eslint-disable react/display-name */
import { entries } from '@cbhq/cds-utils';
import { renderHook } from '@testing-library/react-hooks';

import { deviceScaleMap } from '../../hooks/useDeviceScaleToCdsScale';
import { useDeviceScaleToCdsScale } from '../useDeviceScaleToCdsScale';

const mockDeviceScale = (fontScale: number) => {
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/PixelRatio', () => ({
    getFontScale: jest.fn(() => fontScale),
  }));
};

describe('useDeviceScaleToCdsScale', () => {
  it('returns correct CDS scale based on device font scale', () => {
    for (const [cdsScale, deviceFontScale] of entries(deviceScaleMap)) {
      mockDeviceScale(deviceFontScale);
      const { result } = renderHook(() => useDeviceScaleToCdsScale());
      expect(result.current).toEqual(cdsScale);
    }
  });

  it('returns correct CDS scale if font scale is xSmall or below', () => {
    mockDeviceScale(deviceScaleMap.xSmall - 0.04);
    const { result } = renderHook(() => useDeviceScaleToCdsScale());
    expect(result.current).toEqual('xSmall');
  });

  it('returns correct CDS scale if font scale is small or below', () => {
    mockDeviceScale(deviceScaleMap.small - 0.04);
    const { result } = renderHook(() => useDeviceScaleToCdsScale());
    expect(result.current).toEqual('small');
  });

  it('returns correct CDS scale if font scale is medium or below', () => {
    mockDeviceScale(deviceScaleMap.medium - 0.04);
    const { result } = renderHook(() => useDeviceScaleToCdsScale());
    expect(result.current).toEqual('medium');
  });

  it('returns correct CDS scale if font scale is large or below', () => {
    mockDeviceScale(deviceScaleMap.large - 0.04);
    const { result } = renderHook(() => useDeviceScaleToCdsScale());
    expect(result.current).toEqual('large');
  });

  it('returns correct CDS scale if font scale is xLarge or below', () => {
    mockDeviceScale(deviceScaleMap.xLarge - 0.04);
    const { result } = renderHook(() => useDeviceScaleToCdsScale());
    expect(result.current).toEqual('xLarge');
  });

  it('returns correct CDS scale if font scale is xxLarge or below', () => {
    mockDeviceScale(deviceScaleMap.xxLarge - 0.04);
    const { result } = renderHook(() => useDeviceScaleToCdsScale());
    expect(result.current).toEqual('xxLarge');
  });

  it('returns correct CDS scale if font scale is xxxLarge or above', () => {
    mockDeviceScale(deviceScaleMap.xxxLarge + 0.4);
    const { result } = renderHook(() => useDeviceScaleToCdsScale());
    expect(result.current).toEqual('xxxLarge');
  });
});

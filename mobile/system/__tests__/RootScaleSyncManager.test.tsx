/* eslint-disable react/display-name */
import { RootScaleProvider } from '@cbhq/cds-common/scale/RootScaleProvider';
import { useRootScaleUpdater } from '@cbhq/cds-common/scale/useRootScaleUpdater';
import { renderHook } from '@testing-library/react-hooks';

import { useDeviceScaleToCdsScale } from '../../hooks/useDeviceScaleToCdsScale';
import { useRootScaleSyncManager } from '../RootScaleSyncManager';

jest.mock('@cbhq/cds-common/scale/useRootScaleUpdater');
jest.mock('../../hooks/useDeviceScaleToCdsScale');

describe('RootScaleSyncManager', () => {
  it('matches value from useDeviceScaleToCdsScale', () => {
    const updateSpy = jest.fn();
    (useRootScaleUpdater as jest.Mock).mockImplementation(() => updateSpy);
    (useDeviceScaleToCdsScale as jest.Mock).mockImplementation(() => 'xLarge');
    renderHook(() => useRootScaleSyncManager(), { wrapper: RootScaleProvider });
    expect(updateSpy).toHaveBeenCalledWith('xLarge');
  });

  it('updates root scale to match device scale if updated', () => {
    const updateSpy = jest.fn();
    (useRootScaleUpdater as jest.Mock).mockImplementation(() => updateSpy);
    (useDeviceScaleToCdsScale as jest.Mock).mockImplementation(() => 'xxxLarge');
    const { rerender } = renderHook(() => useRootScaleSyncManager(), {
      wrapper: RootScaleProvider,
    });
    expect(updateSpy.mock.calls[0][0]).toEqual('xxxLarge');

    // update device scale to small
    (useDeviceScaleToCdsScale as jest.Mock).mockImplementation(() => 'small');
    rerender();
    expect(updateSpy.mock.calls[1][0]).toEqual('small');

    // update device scale to xSmall
    (useDeviceScaleToCdsScale as jest.Mock).mockImplementation(() => 'xSmall');
    rerender();
    expect(updateSpy.mock.calls[2][0]).toEqual('xSmall');
  });
});

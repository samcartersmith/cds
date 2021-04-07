import { renderHook } from '@testing-library/react-hooks';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { useAndroidNavigationBarUpdater } from '../AndroidNavigationBar';
import { ThemeProvider } from '../ThemeProvider';

jest.useFakeTimers();
jest.mock('react-native-navigation-bar-color');
const mockPlatform = (OS: 'ios' | 'android', Version?: number) => {
  jest.runAllTimers();
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/Platform', () => ({ OS, Version }));
};

describe('useAndroidNavigationBarUpdater', () => {
  it('does not fire for iOS', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useAndroidNavigationBarUpdater(), {
      wrapper: ThemeProvider,
    });
    result.current();
    expect(changeNavigationBarColor).not.toHaveBeenCalled();
  });

  it('correctly fires for android version', () => {
    mockPlatform('android', 26);

    const { result } = renderHook(() => useAndroidNavigationBarUpdater(), {
      wrapper: ThemeProvider,
    });
    result.current();
    expect(changeNavigationBarColor).toHaveBeenCalled();
  });
});

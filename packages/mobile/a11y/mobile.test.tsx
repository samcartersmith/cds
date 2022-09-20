/* eslint-disable jest/require-top-level-describe */
import React from 'react';
import { NativeModules } from 'react-native'; // !this module
import TestRenderer from 'react-test-renderer';
import { render, waitFor } from '@testing-library/react-native';
import { UseCounterParams } from '@cbhq/cds-common/visualizations/useCounter';
import { entries } from '@cbhq/cds-utils';

import { routes } from '../examples/routes';
import { getSource, RemoteImage } from '../media';
import { DevicePreferencesProvider, FeatureFlagProvider, ThemeProvider } from '../system';

const needSpecialMocksComponents = ['ProgressCircle', 'Card', 'ProgressBar'];

jest.setTimeout(80000);

/**
 * The components in the needSpecialMocksComponents list require
 * some special mocking. However, if the same mocking is applied to
 * other components like Accordian, it would break its test.
 * Therefore, this type of mock setup has be to conditionally applied.
 */
const setupMocks = () => {
  jest.mock('react-native/Libraries/Animated/Animated', () => {
    return {
      ...jest.requireActual<Record<string, unknown>>('react-native/Libraries/Animated/Animated'),
      timing: (value: { setValue: (arg0: unknown) => void }, config: { toValue: unknown }) => {
        return {
          start: jest.fn((callback?: ({ finished }: { finished: boolean }) => void) => {
            value.setValue(config.toValue);
            callback?.({ finished: true });
          }),
        };
      },
      createAnimatedComponent: (c: React.ComponentType<unknown>) => c,
    };
  });

  jest.mock('@cbhq/cds-common/visualizations/useCounter', () => ({
    useCounter: ({ endNum }: UseCounterParams) => endNum,
  }));
};

type RouteType = typeof routes;

const testRoutesAccessibility = (
  testComponentList: [keyof RouteType, RouteType[keyof RouteType]][],
  setupSpecialMocks: boolean,
) => {
  beforeAll(() => {
    // Need to mock this for tooltip test
    NativeModules.StatusBarManager = { getHeight: jest.fn() };
    if (setupSpecialMocks) {
      setupMocks();
    }
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  return testComponentList.forEach(([name, Story]) => {
    it(`${name} accessibility`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const Component = Story();
      const item = TestRenderer.create(
        <FeatureFlagProvider>
          <DevicePreferencesProvider>
            <ThemeProvider name="playground-root">
              <Component />
            </ThemeProvider>
          </DevicePreferencesProvider>
        </FeatureFlagProvider>,
      ).root;
      await waitFor(() => item);
      expect(item).toBeAccessible();
    });
  });
};

describe('Mobile Accessibility Test Suite', () => {
  // This is a test suite for routes that does not need special mocking
  testRoutesAccessibility(
    entries(routes).filter(
      ([name]) => !needSpecialMocksComponents.includes(name) && name !== 'RemoteImage',
    ),
    false,
  );

  // RemoteImage Individual test.
  // Route method was flakey. We weren't able to ensure that
  // the SvgCssUri completed fetching the image before testing
  // for accessibility issues. Therefore, I am pulling this test
  // out as a single component to ensure it still meets accessibility
  it('RemoteImage accessibility test', () => {
    const TEST_ID = 'remoteimage-test-id';
    const result = render(
      <RemoteImage
        testID={TEST_ID}
        shape="circle"
        width={32}
        height={32}
        source={getSource('https://source.unsplash.com/120x120?user-0')}
      />,
    );

    expect(result.getByTestId(TEST_ID)).toBeAccessible();
  });
});

describe('Mobile Accessibility Test Suite - Need special mocks', () => {
  // This is a test suite for routes that require special mocking
  testRoutesAccessibility(
    entries(routes).filter(([name]) => needSpecialMocksComponents.includes(name)),
    true,
  );
});

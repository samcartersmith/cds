import React from 'react';
import { type MeasureOnSuccessCallback, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useRefMap } from '@cbhq/cds-common2/hooks/useRefMap';
import { TabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { NoopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { Box } from '../../layout';
import { TextDisplay1 } from '../../typography';
import { type SegmentedTabsProps, SegmentedTabs } from '../SegmentedTabs';

const TEST_ID = 'mock-segmented-tabs';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const tabs = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

jest.mock('@cbhq/cds-common2/hooks/useRefMap');

const mockUseRefMap = (mocks: ReturnType<typeof useRefMap>) => {
  (useRefMap as jest.Mock).mockReturnValue(mocks);
};

const refMap: ReturnType<typeof useRefMap> = {
  refs: { current: {} },
  registerRef: NoopFn,
  getRef: jest.fn(() => ({
    measureLayout: jest.fn((_, callback: MeasureOnSuccessCallback) => {
      callback(0, 0, 68, 40, 0, 0);
    }),
  })),
};

const exampleProps: SegmentedTabsProps = {
  testID: TEST_ID,
  tabs,
  activeTab: tabs[0],
  onChange: jest.fn(),
};

const mockApi = {
  tabs,
  defaultActiveId: undefined,
  activeTab: tabs[0],
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

describe('SegmentedTabs', () => {
  beforeEach(() => {
    mockUseRefMap(refMap);
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  it('passes a11y', () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('set the first tab active by default', () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} />
      </TabsContext.Provider>,
    );

    const tabsContainer = screen.getByTestId(TEST_ID);

    fireEvent(tabsContainer, 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: 350, height: 40 } },
    });

    jest.advanceTimersByTime(300);
    expect(screen.getByTestId('tabs-active-indicator')).toHaveAnimatedStyle({
      width: 68,
      height: 40,
      transform: [{ translateX: 0 }],
    });
  });

  it('sets the second tab active when clicking on it', () => {
    const onChange = jest.fn();
    const mockData: ReturnType<typeof useRefMap> = {
      refs: { current: {} },
      registerRef: NoopFn,
      getRef: jest.fn(() => ({
        measureLayout: jest.fn((_, callback: MeasureOnSuccessCallback) => {
          callback(68, 0, 68, 40, 0, 0);
        }),
      })),
    };
    const { rerender } = render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} onChange={onChange} />
      </TabsContext.Provider>,
    );
    mockUseRefMap(mockData);
    fireEvent.press(screen.getByTestId('sell-tab'));
    expect(onChange).toHaveBeenCalledTimes(1);

    const newProps = { ...exampleProps, activeTab: tabs[1] };
    rerender(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...newProps} onChange={onChange} />
      </TabsContext.Provider>,
    );

    jest.advanceTimersByTime(300);

    expect(screen.getByTestId('tabs-active-indicator')).toHaveAnimatedStyle({
      width: 68,
      height: 40,
      transform: [{ translateX: 68 }],
    });
  });

  it('renders custom tab component', () => {
    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
    const Component = () => <TextDisplay1 testID="custom-tab">Custom tab</TextDisplay1>;
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} TabComponent={Component} />
      </TabsContext.Provider>,
    );
    expect(screen.getAllByTestId('custom-tab')[0]).toBeTruthy();
  });

  it('renders custom tab indicator', () => {
    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
    const ActiveIndicatorComponent = () => <AnimatedBox animated testID="custom-indicator" />;
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} TabsActiveIndicatorComponent={ActiveIndicatorComponent} />
      </TabsContext.Provider>,
    );
    jest.advanceTimersByTime(300);

    expect(screen.getByTestId('custom-indicator')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} ref={ref} />
      </TabsContext.Provider>,
    );
    expect(ref.current).toBeInstanceOf(View);
  });
});

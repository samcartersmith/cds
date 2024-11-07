import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { TabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { TextDisplay1 } from '../../typography';
import { SegmentedTab, SegmentedTabProps } from '../SegmentedTab';

const TEST_ID = 'mock-segmented-tab';

const exampleProps: SegmentedTabProps = {
  id: 'buy',
  label: 'Buy',
  onPress: NoopFn,
  testID: TEST_ID,
};

const mockApi = {
  tabs: [],
  activeTab: null,
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

const mockActiveApi = { ...mockApi, activeTab: exampleProps };

describe('SegmentedTab', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  it('passes a11y', () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders SegmentedTab correctly', () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} />
      </TabsContext.Provider>,
    );
    expect(screen.getByText('Buy')).toBeTruthy();
    expect(screen.getByText('Buy')).toHaveAnimatedStyle({ color: 'rgba(10,11,13,1)' });
  });

  it('renders correct color when active', () => {
    render(
      <TabsContext.Provider value={mockActiveApi}>
        <SegmentedTab {...exampleProps} />
      </TabsContext.Provider>,
    );
    jest.advanceTimersByTime(300);
    expect(screen.getByTestId(`${TEST_ID}-label`)).toHaveAnimatedStyle({
      color: 'rgba(255,255,255,1)',
    });
  });

  it('triggers onPress when clicking the tab', () => {
    const onPress = jest.fn();
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} onPress={onPress} />
      </TabsContext.Provider>,
    );
    fireEvent.press(screen.getByTestId(TEST_ID));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders custom node for label', () => {
    const label = <TextDisplay1 testID="custom-label">Custom label</TextDisplay1>;
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} label={label} />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId('custom-label')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} ref={ref} />
      </TabsContext.Provider>,
    );
    expect(ref.current).toBeInstanceOf(View);
  });
});

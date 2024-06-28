import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import { TabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { renderA11y } from '@cbhq/cds-web-utils';

import { useDimensions } from '../../hooks/useDimensions';
import { TextDisplay1 } from '../../typography';
import { type SegmentedTabsProps, SegmentedTabs } from '../SegmentedTabs';

const TEST_ID = 'mock-segmented-tabs';

const tabs = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

jest.mock('../../hooks/useDimensions');
jest.mock('@cbhq/cds-common/hooks/useRefMap');

const mockUseDimensions = (mocks: Partial<ReturnType<typeof useDimensions>>) => {
  (useDimensions as jest.Mock).mockReturnValue(mocks);
};

const mockUseRefMap = (mocks: ReturnType<typeof useRefMap>) => {
  (useRefMap as jest.Mock).mockReturnValue(mocks);
};

const mockDimensions: Partial<ReturnType<typeof useDimensions>> = {
  width: 230,
  x: 20,
  y: 64,
  height: 40,
};

const refMap: ReturnType<typeof useRefMap> = {
  refs: new WeakMap(),
  registerRef: NoopFn,
  getRef: jest.fn(() => ({
    getBoundingClientRect: jest.fn(() => ({
      x: 20,
      y: 64,
      width: 68,
      height: 40,
    })),
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
  activeTab: tabs[0],
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

describe('SegmentedTabs', () => {
  beforeEach(() => {
    mockUseDimensions(mockDimensions);
    mockUseRefMap(refMap);
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} />
        </TabsContext.Provider>,
      ),
    ).toHaveNoViolations();
  });

  it('set the first tab active on render', async () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId('tabs-active-indicator')).toHaveStyle({
      width: '68px',
      height: '40px',
      transform: 'none',
    });
  });

  it('sets the second tab active when clicking on it', () => {
    const onChange = jest.fn();
    const mockData: ReturnType<typeof useRefMap> = {
      refs: new WeakMap(),
      registerRef: NoopFn,
      getRef: jest.fn(() => ({
        getBoundingClientRect: jest.fn(() => ({
          x: 88,
          y: 64,
          width: 68,
          height: 40,
        })),
      })),
    };
    mockUseRefMap(mockData);
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} onChange={onChange} />
      </TabsContext.Provider>,
    );
    fireEvent.click(screen.getByTestId('sell-tab'));

    expect(screen.getByTestId('tabs-active-indicator')).toHaveStyle({
      width: '68px',
      height: '40px',
      transform: 'translateX(68px) translateZ(0)',
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders custom tab component', () => {
    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
    const TabComponent = () => (
      <TextDisplay1 as="span" testID="custom-tab">
        Custom tab
      </TextDisplay1>
    );
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} TabComponent={TabComponent} />
      </TabsContext.Provider>,
    );
    expect(screen.getAllByTestId('custom-tab')[0]).toBeInTheDocument();
  });

  it('renders custom tab indicator', () => {
    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
    const TabsActiveIndicatorComponent = () => <div data-testid="custom-indicator" />;
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs
          {...exampleProps}
          TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
        />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTabs {...exampleProps} ref={ref} />
      </TabsContext.Provider>,
    );
    expect(ref.current).not.toBeNull();
  });
});

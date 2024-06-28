import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { renderA11y } from '@cbhq/cds-web-utils';

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

describe('SegmentedTab', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} />
        </TabsContext.Provider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders SegmentedTab correctly', () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} />
      </TabsContext.Provider>,
    );
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toHaveClass('foreground');
  });

  it('renders SegmentedTab correctly when disabled', () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} disabled />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });

  it('renders with custom classNames', () => {
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} className="custom-class" />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveClass('custom-class');
  });

  it('does not call onPress when disabled and clicked', () => {
    const onPress = jest.fn();
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} disabled onPress={onPress} />
      </TabsContext.Provider>,
    );
    fireEvent.click(screen.getByTestId(TEST_ID));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('triggers onPress when clicking the tab', () => {
    const onPress = jest.fn();
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} onPress={onPress} />
      </TabsContext.Provider>,
    );
    fireEvent.click(screen.getByTestId(TEST_ID));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders custom node for label', () => {
    const label = (
      <TextDisplay1 as="span" testID="custom-label">
        Custom label
      </TextDisplay1>
    );
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} label={label} />
      </TabsContext.Provider>,
    );
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <TabsContext.Provider value={mockApi}>
        <SegmentedTab {...exampleProps} ref={ref} />
      </TabsContext.Provider>,
    );
    expect(ref.current).not.toBeNull();
  });
});

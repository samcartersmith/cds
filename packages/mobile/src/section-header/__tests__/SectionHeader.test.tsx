import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { SectionHeader } from '../SectionHeader';

describe('SectionHeader', () => {
  const defaultProps = {
    title: 'Test Title',
    start: <Text>Test Media</Text>,
    icon: <Text>Test Icon</Text>,
    testID: 'section-header',
    balance: 'Test Balance',
    description: 'Test Description',
    end: <Text>Test End</Text>,
    accessibilityLabel: 'Test Aria Label',
  };

  it('renders title correctly', () => {
    const { getByText: screenGetByText } = render(<SectionHeader {...defaultProps} />);
    expect(screenGetByText(defaultProps.title)).toBeTruthy();
  });

  it('renders start correctly', () => {
    const { getByText: screenGetByText } = render(<SectionHeader {...defaultProps} />);
    expect(screenGetByText('Test Media')).toBeTruthy();
  });

  it('renders icon correctly', () => {
    const { getByText: screenGetByText } = render(<SectionHeader {...defaultProps} />);
    expect(screenGetByText('Test Icon')).toBeTruthy();
  });

  it('renders balance correctly', () => {
    const { getByText: screenGetByText } = render(<SectionHeader {...defaultProps} />);
    expect(screenGetByText(defaultProps.balance)).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(<SectionHeader {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    const { getByTestId: screenGetByTestId } = render(<SectionHeader {...defaultProps} />);
    expect(screenGetByTestId(defaultProps.testID)).toBeTruthy();
  });

  it('is accessible', () => {
    const { getByTestId: screenGetByTestId } = render(<SectionHeader {...defaultProps} />);
    expect(screenGetByTestId(defaultProps.testID)).toBeAccessible();
  });
});

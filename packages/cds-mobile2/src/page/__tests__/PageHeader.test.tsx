import React from 'react';
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { TextBody } from '../../typography';
import { PageHeader } from '../PageHeader';

const defaultProps = {
  start: (
    <Box>
      <TextBody>Start</TextBody>
    </Box>
  ),
  title: (
    <Box>
      <TextBody>Title</TextBody>
    </Box>
  ),
  end: (
    <Box>
      <TextBody>End</TextBody>
    </Box>
  ),
  testID: 'page-header',
};

describe('PageHeader', () => {
  it('passes accessiblility', () => {
    render(<PageHeader {...defaultProps} />);
    expect(screen.getByTestId(defaultProps.testID)).toBeAccessible();
  });
  it('renders title correctly', () => {
    render(<PageHeader title={<TextBody>Test</TextBody>} />);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('renders start, end, and title correctly', () => {
    render(<PageHeader {...defaultProps} />);
    expect(screen.getByText('Start')).toBeTruthy();
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('End')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(<PageHeader {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    render(<PageHeader {...defaultProps} />);
    expect(screen.getByTestId(defaultProps.testID)).toBeTruthy();
  });
});

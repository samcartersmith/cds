import React from 'react';
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { TextBody } from '../../typography';
import { PageFooter } from '../PageFooter';

const defaultProps = {
  action: (
    <Box>
      <TextBody>Action</TextBody>
    </Box>
  ),
  testID: 'page-footer',
};

describe('PageFooter', () => {
  it('passes accessiblility', () => {
    render(<PageFooter {...defaultProps} />);
    expect(screen.getByTestId(defaultProps.testID)).toBeAccessible();
  });
  it('renders action correctly', () => {
    render(<PageFooter action={<TextBody>Test</TextBody>} />);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(<PageFooter {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    render(<PageFooter {...defaultProps} />);
    expect(screen.getByTestId(defaultProps.testID)).toBeTruthy();
  });
});

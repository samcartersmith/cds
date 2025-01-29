import React from 'react';
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { TextBody } from '../../typography';
import { DefaultThemeProvider } from '../../utils/testHelpers';
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
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(defaultProps.testID)).toBeAccessible();
  });

  it('renders action correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter action={<TextBody>Test</TextBody>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} ref={ref} />
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(defaultProps.testID)).toBeTruthy();
  });
});

import React from 'react';
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { PageHeader } from '../PageHeader';

const defaultProps = {
  start: (
    <Box>
      <Text>Start</Text>
    </Box>
  ),
  title: (
    <Box>
      <Text>Title</Text>
    </Box>
  ),
  end: (
    <Box>
      <Text>End</Text>
    </Box>
  ),
  testID: 'page-header',
};

describe('PageHeader', () => {
  it('passes accessiblility', () => {
    render(
      <DefaultThemeProvider>
        <PageHeader {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(defaultProps.testID)).toBeAccessible();
  });

  it('renders title correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageHeader title={<Text>Test</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('renders start, end, and title correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageHeader {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Start')).toBeTruthy();
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('End')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <PageHeader {...defaultProps} ref={ref} />
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageHeader {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(defaultProps.testID)).toBeTruthy();
  });
});

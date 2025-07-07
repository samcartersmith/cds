import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TopNavBar } from '../TopNavBar';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<DefaultThemeProvider>{component}</DefaultThemeProvider>);
};

describe('NavigationBar', () => {
  it('renders with default props', () => {
    renderWithTheme(<TopNavBar />);
    screen.getByLabelText('main navigation');
  });

  it('renders children correctly', () => {
    renderWithTheme(
      <TopNavBar>
        <Text>Middle Content</Text>
      </TopNavBar>,
    );
    screen.getByText('Middle Content');
  });

  it('renders start, middle, and end content', () => {
    renderWithTheme(
      <TopNavBar end={<Text>End Content</Text>} start={<Text>Start Content</Text>}>
        <Text>Middle Content</Text>
      </TopNavBar>,
    );
    screen.getByText('Start Content');
    screen.getByText('Middle Content');
    screen.getByText('End Content');
  });

  it('renders bottom content', () => {
    renderWithTheme(<TopNavBar bottom={<Text>Bottom Content</Text>} />);
    screen.getByText('Bottom Content');
  });

  it('applies custom accessibilityLabel', () => {
    const customLabel = 'custom navigation label';
    renderWithTheme(
      <TopNavBar
        accessibilityLabel={customLabel}
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
      >
        <Text>Middle Content</Text>
      </TopNavBar>,
    );
    screen.getByLabelText(customLabel);
  });
});

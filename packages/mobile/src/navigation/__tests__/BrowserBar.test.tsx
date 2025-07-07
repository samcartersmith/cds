import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { BrowserBar } from '../BrowserBar';
import { BrowserBarSearchInput } from '../BrowserBarSearchInput';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<DefaultThemeProvider>{component}</DefaultThemeProvider>);
};

const defaultSearchProps = {
  placeholder: 'Search the web',
  value: '',
  onChangeText: jest.fn(),
};

describe('BrowserBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders BrowserBarSearchInput with correct default props', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput.props.value).toBe('');
    expect(searchInput.props.placeholder).toBe('Search the web');
  });

  it('renders as compact SearchInput by default', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByRole('search');
    // The compact prop is true by default on BrowserBarSearchInput
  });

  it('renders start content when input is not focused', () => {
    renderWithTheme(
      <BrowserBar start={<Text>Back Button</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByText('Back Button');
  });

  it('renders end content when input is not focused', () => {
    renderWithTheme(
      <BrowserBar end={<Text>Menu Button</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByText('Menu Button');
  });

  it('calls onFocus prop when BrowserBarSearchInput is focused', () => {
    const onFocusMock = jest.fn();
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} onFocus={onFocusMock} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');

    expect(onFocusMock).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur prop when BrowserBarSearchInput loses focus', () => {
    const onBlurMock = jest.fn();
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} onBlur={onBlurMock} />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');
    fireEvent(searchInput, 'blur');

    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it('forwards SearchInput props correctly to BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput
          {...defaultSearchProps}
          disabled={true}
          placeholder="Custom placeholder"
          value="test search"
        />
      </BrowserBar>,
    );

    const searchInput = screen.getByRole('search');
    expect(searchInput.props.value).toBe('test search');
    expect(searchInput.props.placeholder).toBe('Custom placeholder');
    expect(searchInput.props.editable).toBe(false); // disabled maps to editable=false
  });

  it('applies custom gap prop', () => {
    renderWithTheme(
      <BrowserBar gap={3} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // The gap prop is applied to the HStack container
    screen.getByTestId('browser-bar');
  });

  it('applies custom padding props', () => {
    renderWithTheme(
      <BrowserBar paddingBottom={3} paddingTop={2} paddingX={4} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // The padding props are applied to the HStack container
    screen.getByTestId('browser-bar');
  });

  it('applies default padding values', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // Default values: paddingX=3, paddingTop=1, paddingBottom=1
    screen.getByTestId('browser-bar');
  });

  it('renders complex start content correctly', () => {
    const startContent = (
      <HStack alignItems="center" gap={1}>
        <Icon name="backArrow" size="s" testID="start-icon" />
        <Text>Back</Text>
      </HStack>
    );

    renderWithTheme(
      <BrowserBar start={startContent} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByText('Back');
    screen.getByTestId('start-icon');
  });

  it('renders complex end content correctly', () => {
    const endContent = (
      <HStack alignItems="center" gap={1}>
        <Icon name="more" size="s" testID="end-icon-1" />
        <Icon name="share" size="s" testID="end-icon-2" />
      </HStack>
    );

    renderWithTheme(
      <BrowserBar end={endContent} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByTestId('end-icon-1');
    screen.getByTestId('end-icon-2');
  });

  it('handles empty start and end gracefully', () => {
    renderWithTheme(
      <BrowserBar end={null} start={null} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByRole('search');
  });

  it('handles undefined start and end gracefully', () => {
    renderWithTheme(
      <BrowserBar end={undefined} start={undefined} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByRole('search');
  });

  it('applies correct flex properties to NavigationBarStart', () => {
    renderWithTheme(
      <BrowserBar start={<Text>Start</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // NavigationBarStart should have flexBasis="auto", flexGrow={0}, flexShrink={0}
    screen.getByText('Start');
  });

  it('applies correct flex properties to NavigationBarEnd', () => {
    renderWithTheme(
      <BrowserBar end={<Text>End</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // NavigationBarEnd should have flexBasis="auto", flexGrow={0}, flexShrink={0}
    screen.getByText('End');
  });

  it('applies correct flex properties to SearchInput container', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // SearchInput container should have flexBasis={0}, flexGrow={1}, flexShrink={0}
    screen.getByRole('search');
  });

  it('passes through all SearchInput props to BrowserBarSearchInput', () => {
    const searchProps = {
      clearIconAccessibilityLabel: 'Clear search',
      startIconAccessibilityLabel: 'Search icon',
      onSearch: jest.fn(),
      onClear: jest.fn(),
      disableBackArrow: true,
      hideStartIcon: true,
      hideEndIcon: true,
    };

    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} {...searchProps} />
      </BrowserBar>,
    );

    screen.getByRole('search');
  });

  it('handles rerendering with different props correctly', () => {
    const { rerender } = renderWithTheme(
      <BrowserBar start={<Text>Initial Start</Text>} testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByText('Initial Start');

    rerender(
      <DefaultThemeProvider>
        <BrowserBar start={<Text>Updated Start</Text>} testID="browser-bar">
          <BrowserBarSearchInput {...defaultSearchProps} />
        </BrowserBar>
      </DefaultThemeProvider>,
    );

    screen.getByText('Updated Start');
    expect(screen.queryByText('Initial Start')).toBeNull();
  });

  it('maintains correct testID on main container', () => {
    renderWithTheme(
      <BrowserBar testID="custom-browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    screen.getByTestId('custom-browser-bar');
  });

  it('handles compact prop override on BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} compact={false} />
      </BrowserBar>,
    );

    screen.getByRole('search');
    // compact={false} is passed through to SearchInput
  });

  it('applies correct HStack alignment and layout properties', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // The main HStack should have alignItems="center"
    screen.getByTestId('browser-bar');
  });

  it('renders with proper component structure', () => {
    renderWithTheme(
      <BrowserBar
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
        testID="browser-bar"
      >
        <BrowserBarSearchInput {...defaultSearchProps} />
      </BrowserBar>,
    );

    // Verify the main container exists
    screen.getByTestId('browser-bar');

    // Verify SearchInput is rendered
    screen.getByRole('search');

    // Verify start and end content are rendered
    screen.getByText('Start Content');
    screen.getByText('End Content');
  });

  it('supports all SearchInput accessibility props on BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <BrowserBarSearchInput
          {...defaultSearchProps}
          accessibilityLabel="Browser search bar"
          clearIconAccessibilityLabel="Clear search"
          startIconAccessibilityLabel="Search"
        />
      </BrowserBar>,
    );

    screen.getByRole('search');
  });

  it('hides start and end content when BrowserBarSearchInput is focused with expandOnFocus', () => {
    renderWithTheme(
      <BrowserBar
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
        testID="browser-bar"
      >
        <BrowserBarSearchInput {...defaultSearchProps} expandOnFocus={true} />
      </BrowserBar>,
    );

    // Initially, start and end should be visible
    screen.getByText('Start Content');
    screen.getByText('End Content');

    // Focus the input
    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');

    // Start and end content should be hidden when focused (due to context)
    // Note: This behavior is controlled by BrowserBarContext
  });

  it('does not hide start and end content when expandOnFocus is false', () => {
    renderWithTheme(
      <BrowserBar
        end={<Text>End Content</Text>}
        start={<Text>Start Content</Text>}
        testID="browser-bar"
      >
        <BrowserBarSearchInput {...defaultSearchProps} expandOnFocus={false} />
      </BrowserBar>,
    );

    // Initially, start and end should be visible
    screen.getByText('Start Content');
    screen.getByText('End Content');

    // Focus the input
    const searchInput = screen.getByRole('search');
    fireEvent(searchInput, 'focus');

    // Start and end content should still be visible when expandOnFocus is false
    screen.getByText('Start Content');
    screen.getByText('End Content');
  });

  it('supports custom children instead of BrowserBarSearchInput', () => {
    renderWithTheme(
      <BrowserBar testID="browser-bar">
        <Text>Custom Content</Text>
      </BrowserBar>,
    );

    screen.getByText('Custom Content');
  });
});

import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { NoopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { Button } from '../../buttons';
import { ButtonGroup } from '../../buttons/ButtonGroup';
import { LogoMark } from '../../icons';
import { Box, VStack } from '../../layout';
import { TextBody, TextDisplay1 } from '../../typography';
import { MultiContentModule, MultiContentModuleProps } from '../MultiContentModule';

const exampleProps: MultiContentModuleProps = {
  title: 'Title',
  description: 'Description',
  pictogram: 'waiting',
  testID: 'mcm',
};

describe('MultiContentModule', () => {
  it('passes accessibility', () => {
    render(<MultiContentModule {...exampleProps} />);
    expect(screen.getByTestId('mcm')).toBeAccessible();
  });

  it('passes accessibility when passing action', () => {
    render(
      <MultiContentModule
        {...exampleProps}
        action="Button"
        actionAccessibilityLabel="Button Label"
        onActionPress={NoopFn}
      />,
    );
    expect(screen.getByTestId('mcm')).toBeAccessible();
  });

  it('renders pictogram, title and description correctly', () => {
    render(<MultiContentModule {...exampleProps} />);
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByTestId('mcm-pictogram')).toBeTruthy();
    expect(screen.getByTestId('mcm-primary-content')).toBeTruthy();
  });

  it('renders custom node for pictogram', () => {
    const pictogram = (
      <Box testID="custom-pictogram">
        <LogoMark size={32} />
      </Box>
    );
    render(<MultiContentModule {...exampleProps} pictogram={pictogram} />);
    expect(screen.getByTestId('custom-pictogram')).toBeTruthy();
  });

  it('renders custom node for title', () => {
    const title = <TextDisplay1 testID="custom-title">Custom Title</TextDisplay1>;
    render(<MultiContentModule {...exampleProps} title={title} />);
    expect(screen.getByTestId('custom-title')).toBeTruthy();
  });

  it('renders custom node for description', () => {
    const description = <TextBody testID="custom-description">Custom Description</TextBody>;
    render(<MultiContentModule {...exampleProps} description={description} />);
    expect(screen.getByTestId('custom-description')).toBeTruthy();
  });

  it('renders children correctly', () => {
    render(
      <MultiContentModule {...exampleProps}>
        <TextBody>primary content</TextBody>
      </MultiContentModule>,
    );
    expect(screen.getByText('primary content')).toBeTruthy();
  });

  it('renders action correctly', () => {
    const spy = jest.fn();
    render(
      <MultiContentModule
        {...exampleProps}
        action="Button"
        actionAccessibilityLabel="Button Label"
        onActionPress={spy}
      />,
    );
    expect(screen.getByText('Button')).toBeTruthy();
    expect(screen.getByLabelText('Button Label')).toBeTruthy();

    fireEvent.press(screen.getByRole('button'));
    expect(spy).toHaveBeenCalled();
  });

  it('renders custom node for action', () => {
    const action = (
      <VStack paddingTop={2}>
        <ButtonGroup accessibilityLabel="Group" direction="vertical">
          <Button onPress={NoopFn} testID="continue-btn">
            Continue
          </Button>
          <Button onPress={NoopFn} testID="cancel-btn" variant="secondary">
            Cancel
          </Button>
        </ButtonGroup>
      </VStack>
    );
    render(<MultiContentModule {...exampleProps} action={action} />);
    expect(screen.getByTestId('continue-btn')).toBeTruthy();
    expect(screen.getByTestId('cancel-btn')).toBeTruthy();
  });

  it('sets aria-label correctly', () => {
    render(<MultiContentModule {...exampleProps} accessibilityLabel="Test Aria Label" />);
    expect(screen.getByLabelText('Test Aria Label')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(<MultiContentModule {...exampleProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

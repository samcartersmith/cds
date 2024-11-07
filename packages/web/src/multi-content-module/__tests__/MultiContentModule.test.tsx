import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { renderA11y } from '@cbhq/cds-web-utils';

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
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<MultiContentModule title={exampleProps.title} />),
    ).toHaveNoViolations();
  });

  it('passes accessibility when passing action', async () => {
    expect(
      await renderA11y(
        <MultiContentModule
          action="Button"
          actionAccessibilityLabel="Button Label"
          onActionPress={NoopFn}
          title={exampleProps.title}
        />,
      ),
    ).toHaveNoViolations();
  });

  it('renders pictogram, title and description correctly', () => {
    render(<MultiContentModule {...exampleProps} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByTestId('mcm-pictogram')).toBeInTheDocument();
    expect(screen.queryByTestId('mcm-primary-content')).not.toBeInTheDocument();
  });

  it('renders custom node for pictogram', () => {
    const pictogram = (
      <Box testID="custom-pictogram">
        <LogoMark size={32} />
      </Box>
    );
    render(<MultiContentModule {...exampleProps} pictogram={pictogram} />);
    expect(screen.getByTestId('custom-pictogram')).toBeInTheDocument();
  });

  it('renders custom node for title', () => {
    const title = (
      <TextDisplay1 as="h1" testID="custom-title">
        Custom Title
      </TextDisplay1>
    );
    render(<MultiContentModule {...exampleProps} title={title} />);
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders custom node for description', () => {
    const description = (
      <TextBody as="p" testID="custom-description">
        Custom Description
      </TextBody>
    );
    render(<MultiContentModule {...exampleProps} description={description} />);
    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <MultiContentModule {...exampleProps}>
        <TextBody as="p">primary content</TextBody>
      </MultiContentModule>,
    );
    expect(screen.getByText('primary content')).toBeInTheDocument();
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
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByLabelText('Button Label')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalled();
  });

  it('renders custom node for action', () => {
    const action = (
      <VStack spacingTop={2}>
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
    expect(screen.getByTestId('continue-btn')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-btn')).toBeInTheDocument();
  });

  it('sets aria-label correctly', () => {
    render(<MultiContentModule {...exampleProps} accessibilityLabel="Test Aria Label" />);
    expect(screen.getByLabelText('Test Aria Label')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<MultiContentModule {...exampleProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

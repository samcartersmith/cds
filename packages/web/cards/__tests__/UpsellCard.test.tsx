import React from 'react';
import { render, screen } from '@testing-library/react';
import { UpsellCardBaseProps } from '@cbhq/cds-common';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { renderA11y } from '@cbhq/cds-web-utils';

import { Button } from '../../buttons/Button';
import { UpsellCard } from '../UpsellCard';

const exampleProps: UpsellCardBaseProps = {
  title: 'Test Title',
  description: 'Test Description',
  action: 'Test Action',
  onActionPress: NoopFn,
  onDismissPress: NoopFn,
  testID: 'upsell-card-test',
};

describe('UpsellCard', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<UpsellCard {...exampleProps} />)).toHaveNoViolations();
  });

  it('renders title, description, action, dismiss, and media', () => {
    render(<UpsellCard {...exampleProps} media={<div data-testid="media" />} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Action')).toBeInTheDocument();
    expect(screen.getByTestId('icon-base-glyph')).toBeInTheDocument();
    expect(screen.getByTestId('media')).toBeInTheDocument();
  });

  it('renders dangerouslySetBackground', () => {
    render(<UpsellCard {...exampleProps} dangerouslySetBackground="#d3d3d3" />);
    expect(screen.getByTestId(exampleProps.testID as string)).toHaveStyle({
      backgroundColor: '#d3d3d3',
    });
  });

  it('calls onActionPress on action button click', async () => {
    const onActionPressMock = jest.fn();
    render(<UpsellCard {...exampleProps} onActionPress={onActionPressMock} />);
    const actionButton = await screen.findByRole('button', { name: 'Test Action' });
    await actionButton.click();
    expect(onActionPressMock).toHaveBeenCalled();
  });

  it('calls onDismissPress on dismiss button click', () => {
    const onDismissPressMock = jest.fn();
    render(<UpsellCard {...exampleProps} onDismissPress={onDismissPressMock} />);
    const dismissButton = screen.getByTestId(`${exampleProps.testID}-dismiss-button`);
    dismissButton.click();
    expect(onDismissPressMock).toHaveBeenCalled();
  });
  it('renders custom action button', () => {
    render(
      <UpsellCard
        {...exampleProps}
        action={
          <Button role="button" testID="custom-action-button">
            Custom Action
          </Button>
        }
      />,
    );
    expect(screen.getByTestId('custom-action-button')).toBeInTheDocument();
  });
});

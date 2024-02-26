import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { renderA11y } from '@cbhq/cds-web-utils';

import { Button } from '../../buttons/Button';
import { type UpsellCardProps, UpsellCard } from '../UpsellCard';

const exampleProps: UpsellCardProps = {
  title: 'Test Title',
  description: 'Test Description',
  action: 'Test Action',
  onActionPress: NoopFn,
  onDismissPress: NoopFn,
  testID: 'upsell-card-test',
};

const compactProps: UpsellCardProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT.',
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
  it('does not render action button if action prop is not passed', () => {
    const { action, ...propsWithoutAction } = exampleProps;
    render(<UpsellCard {...propsWithoutAction} />);
    const actionButton = screen.queryByText('Test Action');
    expect(actionButton).not.toBeInTheDocument();
  });
  it('calls onPress when the card is pressed', () => {
    const onPressFn = jest.fn();
    render(<UpsellCard onPress={onPressFn} {...compactProps} />);

    fireEvent.click(screen.getByText(`${compactProps.title}`));

    expect(onPressFn).toHaveBeenCalled();
  });
});

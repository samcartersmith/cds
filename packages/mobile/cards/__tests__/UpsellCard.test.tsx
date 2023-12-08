import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { UpsellCardBaseProps } from '@cbhq/cds-common';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../../buttons';
import { UpsellCard } from '../UpsellCard';

const styles = StyleSheet.create({
  media: {
    width: 32,
    height: 32,
    objectFit: 'cover',
    borderRadius: 100,
  },
  children: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const exampleProps: UpsellCardBaseProps = {
  title: 'Test Title',
  description: 'Test Description',
  action: 'Test Action' as string,
  onActionPress: NoopFn,
  onDismissPress: NoopFn,
  testID: 'upsell-card-test',
  media: (
    <Image
      accessibilityIgnoresInvertColors
      data-testid="media"
      source={{
        uri: assets.btc.imageUrl,
      }}
      style={styles.media}
    />
  ),
};

describe('UpsellCard', () => {
  it('passes accessibility', async () => {
    render(<UpsellCard {...exampleProps} />);
    expect(screen.getByTestId(exampleProps.testID as string)).toBeAccessible();
  });

  it('renders title, description, action and dismiss', () => {
    render(<UpsellCard {...exampleProps} />);
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Description')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Test Action' })).toBeDefined();
    expect(screen.getByTestId(`${exampleProps.testID}-dismiss-button`)).toBeDefined();
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
    fireEvent.press(screen.getByText(exampleProps.action as string));
    expect(onActionPressMock).toHaveBeenCalled();
  });

  it('calls onDismissPress on dismiss button click', () => {
    const onDismissPressMock = jest.fn();
    render(<UpsellCard {...exampleProps} onDismissPress={onDismissPressMock} />);
    fireEvent.press(screen.getByTestId(`${exampleProps.testID}-dismiss-button`));
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
    expect(screen.getByTestId('custom-action-button')).toBeVisible();
  });
});

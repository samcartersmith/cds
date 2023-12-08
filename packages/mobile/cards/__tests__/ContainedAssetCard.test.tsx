import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { ContainedAssetCard } from '../ContainedAssetCard';

const DummyHeader = () => <Text>Header</Text>;

describe('ContainedAssetCard', () => {
  it('renders title, description and subtitle', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        subtitle="Subtitle"
        title="Title"
      />,
    );

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Subtitle')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <ContainedAssetCard header={<DummyHeader />} onPress={onPress} testID="card" title="Title" />,
    );

    fireEvent.press(screen.getByTestId('card'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('passes a11y', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        subtitle="Subtitle"
        testID="card"
        title="Title"
      />,
    );
    expect(screen.getByTestId('card')).toBeAccessible();
  });
});

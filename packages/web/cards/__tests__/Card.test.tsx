import { fireEvent, render, screen } from '@testing-library/react';

import { FeatureFlagProvider } from '../../system';
import { Card } from '../Card';

describe('Card.test', () => {
  it('renders', () => {
    render(
      <Card testID="test-card">
        <div />
      </Card>,
    );

    expect(screen.getByTestId('test-card')).toBeTruthy();
  });

  it('triggers onPress', () => {
    const onPress = jest.fn();
    render(
      <Card onPress={onPress} testID="test-card">
        <div />
      </Card>,
    );

    fireEvent.click(screen.getByTestId('test-card'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders frontier', () => {
    const onPress = jest.fn();
    render(
      <FeatureFlagProvider frontierCard>
        <Card onPress={onPress} testID="test-card">
          <div />
        </Card>
      </FeatureFlagProvider>,
    );

    expect(screen.getByTestId('test-card')).toBeTruthy();
  });
});

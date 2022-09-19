import { fireEvent, render } from '@testing-library/react';

import { FeatureFlagProvider } from '../../system';
import { Card } from '../Card';

describe('Card.test', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <Card testID="test-card">
        <div />
      </Card>,
    );

    expect(getByTestId('test-card')).toBeTruthy();
  });

  it('triggers onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card onPress={onPress} testID="test-card">
        <div />
      </Card>,
    );

    fireEvent.click(getByTestId('test-card'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders frontier', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <FeatureFlagProvider frontierCard>
        <Card onPress={onPress} testID="test-card">
          <div />
        </Card>
      </FeatureFlagProvider>,
    );

    expect(getByTestId('test-card')).toBeTruthy();
  });
});

/* eslint-disable react-native/no-raw-text */

import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Animated, Pressable } from 'react-native';

import { IconButton } from '../IconButton';

const name = 'allTimeHighHeavy';
describe('IconButton', () => {
  it('renders an animated view', () => {
    const result = render(
      <IconButton name={name} accessibilityLabel={name} accessibilityHint={name} />
    );

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    const result = render(
      <IconButton name={name} accessibilityLabel={name} accessibilityHint={name} />
    );

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    const result = render(
      <IconButton onPress={spy} name={name} accessibilityLabel={name} accessibilityHint={name} />
    );

    fireEvent.press(result.getByLabelText('allTimeHighHeavy'));

    expect(spy).toHaveBeenCalled();
  });
});

describe('spacing', () => {
  const testID = 'xg12g8d9';
  it('renders all', async () => {
    const { getByTestId } = render(
      <IconButton
        spacing={1}
        name={name}
        accessibilityLabel={name}
        testID={testID}
        accessibilityHint={name}
      />
    );

    await waitFor(() => getByTestId(testID));

    expect(getByTestId(testID)).toHaveStyle({
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
    });
  });

  it('renders horizontal', async () => {
    const { getByTestId } = render(
      <IconButton
        spacingHorizontal={1}
        name={name}
        accessibilityLabel={name}
        testID={testID}
        accessibilityHint={name}
      />
    );

    await waitFor(() => getByTestId(testID));

    expect(getByTestId(testID)).toHaveStyle({
      paddingLeft: 8,
      paddingRight: 8,
    });
  });

  it('renders vertical', async () => {
    const { getByTestId } = render(
      <IconButton
        spacingVertical={1}
        name={name}
        accessibilityLabel={name}
        testID={testID}
        accessibilityHint={name}
      />
    );

    await waitFor(() => getByTestId(testID));

    expect(getByTestId(testID)).toHaveStyle({
      paddingTop: 8,
      paddingBottom: 8,
    });
  });

  it('renders start/end', async () => {
    const { getByTestId } = render(
      <IconButton
        spacingStart={1}
        spacingEnd={2}
        name={name}
        accessibilityHint={name}
        accessibilityLabel={name}
        testID={testID}
      />
    );

    await waitFor(() => getByTestId(testID));

    expect(getByTestId(testID)).toHaveStyle({
      paddingLeft: 8,
      paddingRight: 16,
    });
  });

  it('renders individual', async () => {
    const { getByTestId } = render(
      <IconButton
        spacingTop={1}
        spacingBottom={2}
        spacingStart={3}
        spacingEnd={4}
        name={name}
        accessibilityHint={name}
        accessibilityLabel={name}
        testID={testID}
      />
    );

    await waitFor(() => getByTestId(testID));

    expect(getByTestId(testID)).toHaveStyle({
      paddingTop: 8,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 32,
    });
  });
});

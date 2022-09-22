import React from 'react';
import { Animated, Text, View } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { CarouselItem } from '../CarouselItem';

describe('CarouselItem.test', () => {
  beforeEach(() => jest.clearAllMocks());

  it('triggers onMount', () => {
    const onMount = jest.fn();
    const { getByTestId } = render(
      <CarouselItem
        id="item1"
        index={0}
        spacingEnd={2}
        xOffset={new Animated.Value(10)}
        totalItems={3}
        width={50}
        onMount={onMount}
      >
        <Text>test</Text>
      </CarouselItem>,
    );

    fireEvent(getByTestId('CarouselItemWrapper-item1'), 'layout', {
      nativeEvent: { layout: { height: 100 } },
    });

    expect(onMount).toHaveBeenCalledTimes(1);
  });

  it('triggers onDismiss', async () => {
    const mockMeasureInWindow = jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation((cb) => cb(0, 0, 1, 1));

    const onDismiss = jest.fn();
    const onDismissLastItem = jest.fn();

    const { getByTestId } = render(
      <CarouselItem
        id="item1"
        index={0}
        spacingEnd={2}
        xOffset={new Animated.Value(10)}
        progressOpacity={new Animated.Value(0.5)}
        totalItems={2}
        width={50}
        onMount={jest.fn()}
        showDismiss
        onDismiss={onDismiss}
        onDismissLastItem={onDismissLastItem}
      >
        <Text>test</Text>
      </CarouselItem>,
    );

    fireEvent.press(getByTestId('CarouselItemDismiss-item1'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
      expect(onDismissLastItem).toHaveBeenCalledTimes(0);
    });
  });

  it('triggers onDismissLastItem', async () => {
    const mockMeasureInWindow = jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation((cb) => cb(0, 0, 1, 1));

    const onDismiss = jest.fn();
    const onDismissLastItem = jest.fn();

    const { getByTestId } = render(
      <CarouselItem
        id="item1"
        index={0}
        spacingEnd={2}
        xOffset={new Animated.Value(10)}
        progressOpacity={new Animated.Value(0)}
        totalItems={1}
        width={50}
        onMount={jest.fn()}
        showDismiss
        onDismiss={onDismiss}
        onDismissLastItem={onDismissLastItem}
      >
        <Text>test</Text>
      </CarouselItem>,
    );

    fireEvent.press(getByTestId('CarouselItemDismiss-item1'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
      expect(onDismissLastItem).toHaveBeenCalledTimes(1);
    });
  });
});

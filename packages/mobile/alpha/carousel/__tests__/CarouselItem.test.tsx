import React from 'react';
import { Animated, Text, View } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { CarouselItem } from '../CarouselItem';

describe('CarouselItem.test', () => {
  beforeEach(() => jest.clearAllMocks());

  it('triggers onMount', () => {
    const onMount = jest.fn();
    render(
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

    fireEvent(screen.getByTestId('CarouselItemWrapper-item1'), 'layout', {
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

    render(
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

    fireEvent.press(screen.getByTestId('CarouselItemDismiss-item1'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(onDismissLastItem).toHaveBeenCalledTimes(0);
    });
  });

  it('triggers onDismissLastItem', async () => {
    const mockMeasureInWindow = jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation((cb) => cb(0, 0, 1, 1));

    const onDismiss = jest.fn();
    const onDismissLastItem = jest.fn();

    render(
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

    fireEvent.press(screen.getByTestId('CarouselItemDismiss-item1'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(onDismissLastItem).toHaveBeenCalledTimes(1);
    });
  });

  it('passes a11y', () => {
    render(
      <CarouselItem
        id="item1"
        index={0}
        spacingEnd={2}
        xOffset={new Animated.Value(10)}
        totalItems={3}
        width={50}
        onMount={jest.fn()}
        showDismiss
        dismissButtonAccessibilityLabel="Dismiss"
        dismissButtonAccessibilityHint="Dismiss this item"
      >
        <Text>test</Text>
      </CarouselItem>,
    );

    const carouselItem = screen.getByTestId('CarouselItemWrapper-item1');
    expect(carouselItem).toBeTruthy();
    expect(carouselItem).toBeAccessible();

    const dismissBtn = screen.getByTestId('CarouselItemDismiss-item1');
    expect(dismissBtn).toBeTruthy();
    expect(dismissBtn).toBeAccessible();
    expect(screen.getByLabelText('Dismiss')).toBeTruthy();
    expect(screen.getByHintText('Dismiss this item')).toBeTruthy();
  });
});

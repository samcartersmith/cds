/* eslint-disable react-native/no-raw-text */

import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { Animated, Pressable } from 'react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('renders an animated view', () => {
    const result = render(<Button>Child</Button>);

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    const result = render(<Button>Child</Button>);

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders children text', () => {
    const result = render(<Button>Child</Button>);

    expect(result.queryByText('Child')).not.toBeNull();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    const result = render(<Button onPress={spy}>Child</Button>);

    fireEvent.press(result.getByText('Child'));

    expect(spy).toHaveBeenCalled();
  });
});

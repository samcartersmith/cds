import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { TestAssets } from '../assets';

const NonAccessibleButton = () => (
  <TouchableOpacity accessible={false}>
    {}
    <Image accessibilityIgnoresInvertColors source={TestAssets.filledHeart['32px']} />
  </TouchableOpacity>
);

const Button = () => (
  <TouchableOpacity
    accessible
    accessibilityRole="button"
    accessibilityLabel="Like"
    accessibilityHint="Like"
  >
    {}
    <Image accessibilityIgnoresInvertColors source={TestAssets.filledHeart['32px']} />
  </TouchableOpacity>
);

describe('toBeAccessible tests', () => {
  it('should contain accessibility errors', () => {
    expect(<NonAccessibleButton />).not.toBeAccessible();
  });

  it('should not contain accessibility errors', () => {
    expect(<Button />).toBeAccessible();
  });

  it('should report error if component is not accessible', () => {
    expect(() => expect(<NonAccessibleButton />).toBeAccessible()).toThrow('');
  });

  it('should not report error if component is accessible', () => {
    expect(() => expect(<Button />).not.toBeAccessible()).toThrow('');
  });
});

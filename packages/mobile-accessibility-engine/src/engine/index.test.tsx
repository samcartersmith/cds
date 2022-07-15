import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { render } from '@testing-library/react-native';

import { TestAssets } from '../__tests__/assets';

import check from '.';

const Button = () => (
  <TouchableOpacity accessible={false}>
    <Image accessibilityIgnoresInvertColors source={TestAssets.filledHeart['32px']} />
  </TouchableOpacity>
);

describe('engine tests', () => {
  it('should contain accessibility errors', () => {
    expect(<Button />).not.toBeAccessible();
  });

  it('should support test instances', () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { UNSAFE_getByType } = render(<Button />);
    const button = UNSAFE_getByType(TouchableOpacity);

    // eslint-disable-next-line jest/require-to-throw-message
    expect(() => check(button)).toThrow();
  });
});

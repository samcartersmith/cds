import React from 'react';
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react-native';

import isReactTestInstance from '../isReactTestInstance';

describe('isReactTestInstance tests', () => {
  it('should return false when passed a React element', () => {
    expect(isReactTestInstance(React.createElement(View))).toBe(false);
  });

  it('should return true when passed a ReactTestInstance from react-test-renderer', () => {
    expect(isReactTestInstance(TestRenderer.create(React.createElement(View)).root)).toBe(true);
  });

  it('should return true when passed a ReactTestInstance from @testing-library/react-native', () => {
    render(React.createElement(View, { testID: 'view' }));
    expect(isReactTestInstance(screen.getByTestId('view'))).toBe(true);
  });
});

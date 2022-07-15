import React from 'react';
import { TouchableOpacity } from 'react-native';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import Slider from '@react-native-community/slider';

import canBeDisabled from './canBeDisabled';

describe('canBeDisabled tests', () => {
  it('should identify buttons', () => {
    const Button = () => <TouchableOpacity accessibilityRole="button" disabled />;

    const renderedTree = TestRenderer.create(<Button />);

    const matcher = (node: ReactTestInstance) => canBeDisabled(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(1);
  });

  it('should identify sliders', () => {
    const SliderWrapper = () => <Slider disabled />;

    const renderedTree = TestRenderer.create(<SliderWrapper />);

    const matcher = (node: ReactTestInstance) => canBeDisabled(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(1);
  });
});

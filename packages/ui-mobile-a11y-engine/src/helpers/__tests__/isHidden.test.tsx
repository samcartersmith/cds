import React from 'react';
import { View } from 'react-native';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';

import isHidden from '../isHidden';

describe('isHidden tests', () => {
  it('should identify a node with accessibilityElementsHidden prop', () => {
    const renderedTree = TestRenderer.create(<View accessibilityElementsHidden />);

    const matcher = (node: ReactTestInstance) => isHidden(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched.length).toBeTruthy();
  });

  it('should identify a node with importantForAccessibility prop set to "no-hide-descendants"', () => {
    const renderedTree = TestRenderer.create(
      <View importantForAccessibility="no-hide-descendants" />,
    );

    const matcher = (node: ReactTestInstance) => isHidden(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched.length).toBeTruthy();
  });

  it('should not identify a node with importantForAccessibility prop set to val other than "no-hide-descendants"', () => {
    const renderedTree = TestRenderer.create(<View importantForAccessibility="yes" />);

    const matcher = (node: ReactTestInstance) => isHidden(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched.length).toBeFalsy();
  });

  it('should not identify a node without accessibilityElementsHidden or importantForAccessibility props', () => {
    const renderedTree = TestRenderer.create(<View />);

    const matcher = (node: ReactTestInstance) => isHidden(node);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched.length).toBeFalsy();
  });
});

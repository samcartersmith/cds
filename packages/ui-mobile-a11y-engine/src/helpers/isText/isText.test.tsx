import React from 'react';
import { Text, View } from 'react-native';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';

import isText from './isText';

describe('isText tests', () => {
  it('should identify an empty text node', () => {
    const renderedTree = TestRenderer.create(<Text />);

    const matcher = (node: ReactTestInstance) => isText(node.type);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(1);
  });

  it('should identify a non-empty text node', () => {
    const renderedTree = TestRenderer.create(<Text>I am not empty!</Text>);

    const matcher = (node: ReactTestInstance) => isText(node.type);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(1);
  });

  it('should identify a text node wrapped in a view', () => {
    const renderedTree = TestRenderer.create(
      <View>
        <Text>I am not empty!</Text>
      </View>,
    );

    const matcher = (node: ReactTestInstance) => isText(node.type);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(1);
  });

  it('should identify a text node wrapped in another text node', () => {
    const renderedTree = TestRenderer.create(
      <Text>
        <Text>I am not empty!</Text>
      </Text>,
    );

    const matcher = (node: ReactTestInstance) => isText(node.type);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(2);
  });

  it('should identify multiple text nodes', () => {
    const renderedTree = TestRenderer.create(
      <View>
        <Text>Node 1</Text>
        <Text>Node 2</Text>
      </View>,
    );

    const matcher = (node: ReactTestInstance) => isText(node.type);
    const matched = renderedTree.root.findAll(matcher);

    expect(matched).toHaveLength(2);
  });
});

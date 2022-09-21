import { PropsWithChildren } from 'react';
import { Pressable, SafeAreaView, Text, View, ViewProps } from 'react-native';
import TestRenderer from 'react-test-renderer';

import getPathToComponent from './getPathToComponent';

describe('getPathToComponent tests', () => {
  it('should handle a View node with no parents', () => {
    const tree = TestRenderer.create(<View testID="test" />);
    const node = tree.root.findByProps({ testID: 'test' });

    expect(getPathToComponent(node)).toEqual(['View']);
  });

  it('should handle a Text node with no parents', () => {
    const tree = TestRenderer.create(<Text testID="test" />);
    const node = tree.root.findByProps({ testID: 'test' });

    expect(getPathToComponent(node)).toEqual(['Text']);
  });

  it('should handle a custom node with no parents', () => {
    const Tree = () => null;

    const tree = TestRenderer.create(<Tree data-testid="test" />);
    const node = tree.root.findByProps({ 'data-testid': 'test' });

    expect(getPathToComponent(node)).toEqual(['Tree']);
  });

  it('should handle a custom node with parents', () => {
    const Custom = (props: PropsWithChildren<ViewProps>) => <View {...props} />;

    const tree = TestRenderer.create(
      <SafeAreaView>
        <Pressable accessibilityRole="button">
          <Custom>
            <Text testID="test" />
          </Custom>
        </Pressable>
      </SafeAreaView>,
    );

    const node = tree.root.findByProps({ testID: 'test' });

    expect(getPathToComponent(node)).toEqual([
      'RCTSafeAreaView',
      'Pressable',
      'View', // Most touchables have an internal 'View'
      'Custom',
      'View',
      'Text',
    ]);
  });

  it('should handle a View node with a custom parent', () => {
    const Tree = () => <View testID="test" />;

    const tree = TestRenderer.create(<Tree />);
    const node = tree.root.findByProps({ testID: 'test' });

    expect(getPathToComponent(node)).toEqual(['Tree', 'View']);
  });

  it('should handle a View within a View', () => {
    const tree = TestRenderer.create(
      <View>
        <View testID="test" />
      </View>,
    );

    const node = tree.root.findByProps({ testID: 'test' });
    expect(getPathToComponent(node)).toEqual(['View', 'View']);
  });

  it('should disconsider fragments in component path', () => {
    const Tree = () => {
      return (
        <View>
          {/* this eslint is ensuring fragments are ignored and is therefore required */}
          {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
          <>
            <Text testID="test">Test</Text>
          </>
        </View>
      );
    };

    const tree = TestRenderer.create(<Tree />);
    const node = tree.root.findByProps({ testID: 'test' });
    expect(getPathToComponent(node)).toEqual(['Tree', 'View', 'Text']);
  });
});

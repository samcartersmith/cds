import React from 'react';
import { Text, View } from 'react-native';

import check from '../../engine';

import rule from '.';

const run = (component: React.ReactElement<unknown>) => {
  return check(component, { rules: [rule] });
};
describe('no-empty-text tests', () => {
  it('throws if text node has no content', () => {
    const TestText = () => <Text />;
    expect(() => run(<TestText />)).toThrow(rule.help.problem);
  });

  it('throws if text node within a View has no content', () => {
    const TestText = () => (
      <View>
        <Text />
      </View>
    );
    expect(() => run(<TestText />)).toThrow(rule.help.problem);
  });

  it('throws if text has an empty text node as child', () => {
    const TestText = () => (
      <Text>
        <Text />
      </Text>
    );

    expect(() => run(<TestText />)).toThrow(rule.help.problem);
  });

  it('does not throw if text node has content', () => {
    const TestText = () => <Text>Testing</Text>;
    expect(() => run(<TestText />)).not.toThrow(rule.help.problem);
  });

  it('does not throw if text node has a child text node with content', () => {
    const TestText = () => (
      <Text>
        <Text>Testing</Text>
      </Text>
    );
    expect(() => run(<TestText />)).not.toThrow(rule.help.problem);
  });
});

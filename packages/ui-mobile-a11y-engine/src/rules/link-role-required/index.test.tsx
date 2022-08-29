import React from 'react';
import { Text } from 'react-native';

import check from '../../engine';

import rule from '.';

const run = (component: React.ReactElement<unknown>) => {
  return check(component, { rules: [rule] });
};

// To inspect these components, run the example app under "Rules -> Adjustable Role"

describe('text component without an onPress prop', () => {
  it("doesn't throw if 'accessibilityRole' prop not defined", () => {
    const TestText = () => <Text>This is a test.</Text>;
    expect(() => run(<TestText />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessibilityRole' prop has a value other than 'link'", () => {
    const TestText = () => <Text accessibilityRole="text">This is a test.</Text>;
    expect(() => run(<TestText />)).not.toThrow(rule.help.problem);
  });

  // This is a misuse of the 'link' role and is captured by another rule
  it("doesn't throw if 'accessibilityRole' prop has the value 'link'", () => {
    const TestText = () => <Text accessibilityRole="link">This is a test.</Text>;

    expect(() => run(<TestText />)).not.toThrow(rule.help.problem);
  });
});

const noop = () => {};
describe('text component with an onPress prop', () => {
  it("throws if 'accessibilityRole' prop not defined", () => {
    const TestText = () => <Text onPress={noop}>This is a test.</Text>;
    expect(() => run(<TestText />)).toThrow(rule.help.problem);
  });

  it("throws if 'accessibilityRole' prop has a value other than 'link'", () => {
    const TestText = () => (
      <Text onPress={noop} accessibilityRole="text">
        This is a test.
      </Text>
    );
    expect(() => run(<TestText />)).toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessibilityRole' prop has the value 'link'", () => {
    const TestText = () => (
      <Text onPress={noop} accessibilityRole="link">
        This is a test.
      </Text>
    );

    expect(() => run(<TestText />)).not.toThrow(rule.help.problem);
  });
});

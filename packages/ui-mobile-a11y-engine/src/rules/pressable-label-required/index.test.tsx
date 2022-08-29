import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import { TestAssets } from '../../assets';
import check from '../../engine';

import rule from '.';

const run = (component: React.ReactElement) => {
  return check(component, { rules: [rule] });
};

// To inspect these components, run the example app under "Rules -> Button Label"
describe('if element is not hidden', () => {
  it('throws in the case of empty button', () => {
    expect(() => run(<TouchableOpacity accessibilityRole={undefined} />)).toThrow(
      rule.help.problem,
    );
  });

  it('throws if the button has empty text content', () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="button">
        <Text />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).toThrow(rule.help.problem);
  });

  it('throws if the button only has non-text content', () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="button">
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).toThrow(rule.help.problem);
  });

  it("doesn't throw if the button has text content", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="button">
        <Text>Test</Text>
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).not.toThrow();
  });

  it("doesn't throw if the button has text + non-text content", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="button">
        <Text>Test</Text>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).not.toThrow();
  });

  it("doesn't throw if the button has accessibilityLabel", () => {
    const Button = () => <TouchableOpacity accessibilityLabel="Test" />;
    expect(() => run(<Button />)).not.toThrow();
  });

  it("doesn't throw if the button only has non-text content but has accessibilityLabel", () => {
    const Button = () => (
      <TouchableOpacity accessibilityLabel="Image button" accessibilityHint="Image button">
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).not.toThrow();
  });
});

describe('if element is hidden', () => {
  const hidden = {
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants' as const,
  };

  it("doesn't throw in the case of empty button", () => {
    expect(() => run(<TouchableOpacity {...hidden} />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if the button has empty text content", () => {
    const Button = () => (
      <TouchableOpacity {...hidden}>
        <Text />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if the button only has non-text content", () => {
    const Button = () => (
      <TouchableOpacity {...hidden}>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if the button has text content", () => {
    const Button = () => (
      <TouchableOpacity {...hidden}>
        <Text>Test</Text>
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).not.toThrow();
  });

  it("doesn't throw if the button has text + non-text content", () => {
    const Button = () => (
      <TouchableOpacity {...hidden}>
        <Text>Test</Text>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).not.toThrow();
  });

  it("doesn't throw if the button has accessibilityLabel", () => {
    const Button = () => <TouchableOpacity accessibilityLabel="Test" {...hidden} />;
    expect(() => run(<Button />)).not.toThrow();
  });

  it("doesn't throw if the button only has non-text content but has accessibilityLabel", () => {
    const Button = () => (
      <TouchableOpacity accessibilityLabel="Image button" {...hidden}>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );
    expect(() => run(<Button />)).not.toThrow();
  });
});

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { TestAssets } from '../../__tests__/assets';
import check from '../../engine';

import rule from '.';

const run = (component: React.ReactElement<unknown>) => {
  return check(component, { rules: [rule] });
};

// To inspect these components, run the example app under "Rules -> Button Accessible"

describe('if element is not hidden', () => {
  it("doesn't throw if 'accessible' prop not defined (buttons are accessible by default)", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="button">
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessible' prop is defined and equal to true", () => {
    const Button = () => (
      <TouchableOpacity accessible>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("throws if 'accessible' prop is defined and equal to false", () => {
    const Button = () => (
      <TouchableOpacity accessible={false}>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).toThrow(rule.help.problem);
  });
});

describe('if element is hidden', () => {
  const hidden = {
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants' as const,
  };

  it("doesn't throw if 'accessible' prop not defined (buttons are accessible by default)", () => {
    const Button = () => (
      <TouchableOpacity {...hidden}>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessible' prop is defined and equal to true", () => {
    const Button = () => (
      <TouchableOpacity accessible {...hidden}>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessible' prop is defined and equal to false", () => {
    const Button = () => (
      <TouchableOpacity accessible={false} {...hidden}>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });
});

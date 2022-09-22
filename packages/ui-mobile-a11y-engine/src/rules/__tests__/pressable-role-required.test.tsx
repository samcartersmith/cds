import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import { TestAssets } from '../../assets';
import check from '../../engine';
import rule from '../pressable-role-required';

const run = (component: React.ReactElement) => {
  return check(component, { rules: [rule] });
};

// To inspect these components, run the example app under "Rules -> Button Role"
describe('pressable role required tests', () => {
  it("throws if 'accessibilityRole' prop not defined", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole={undefined}>
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).toThrow(rule.help.problem);
  });

  it("throws if 'accessibilityRole' prop has a value other than 'button' or 'link' or 'imagebutton'", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="text">
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessibilityRole' prop has the value 'button'", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="button">
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessibilityRole' prop has the value 'link'", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="link">
        <Text>This is a link.</Text>
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessibilityRole' prop has the value 'imagebutton'", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="imagebutton">
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessibilityRole' prop has the value 'radio'", () => {
    const Button = () => (
      <TouchableOpacity accessibilityRole="radio">
        {}
        <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
      </TouchableOpacity>
    );

    expect(() => run(<Button />)).not.toThrow(rule.help.problem);
  });
});

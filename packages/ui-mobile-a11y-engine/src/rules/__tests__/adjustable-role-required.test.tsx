import React from 'react';
import Slider from '@react-native-community/slider';

import check from '../../engine';
import rule from '../adjustable-role-required';

const run = (component: React.ReactElement<unknown>) => {
  return check(component, { rules: [rule] });
};

// To inspect these components, run the example app under "Rules -> Adjustable Role"
describe('adjustable- role-required', () => {
  it("throws if 'accessibilityRole' prop not defined", () => {
    const SliderWrapper = () => <Slider minimumValue={1} maximumValue={10} />;
    expect(() => run(<SliderWrapper />)).toThrow(rule.help.problem);
  });

  it("throws if 'accessibilityRole' prop has a value other than 'adjustable'", () => {
    const SliderWrapper = () => (
      <Slider minimumValue={1} maximumValue={10} accessibilityRole="button" />
    );

    expect(() => run(<SliderWrapper />)).toThrow(rule.help.problem);
  });

  it("doesn't throw if 'accessibilityRole' prop has the value 'adjustable'", () => {
    const SliderWrapper = () => (
      <Slider minimumValue={1} maximumValue={10} accessibilityRole="adjustable" />
    );

    expect(() => run(<SliderWrapper />)).not.toThrow(rule.help.problem);
  });
});

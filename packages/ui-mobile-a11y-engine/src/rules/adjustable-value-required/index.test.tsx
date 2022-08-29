import React from 'react';
import Slider from '@react-native-community/slider';

import check from '../../engine';

import rule from '.';

const run = (component: React.ReactElement<unknown>) => {
  return check(component, { rules: [rule] });
};

it("throws if 'accessibilityValue' prop not defined", () => {
  const SliderWrapper = () => <Slider minimumValue={1} maximumValue={10} />;
  expect(() => run(<SliderWrapper />)).toThrow(rule.help.problem);
});

it("throws if 'accessibilityValue' object doesn't have all three values", () => {
  let SliderWrapper = () => <Slider minimumValue={5} maximumValue={10} accessibilityValue={{}} />;

  expect(() => run(<SliderWrapper />)).toThrow(rule.help.problem);

  SliderWrapper = () => (
    <Slider minimumValue={5} maximumValue={10} accessibilityValue={{ min: 5, max: 10 }} />
  );

  expect(() => run(<SliderWrapper />)).toThrow(rule.help.problem);

  SliderWrapper = () => (
    <Slider minimumValue={5} maximumValue={10} accessibilityValue={{ now: 5, max: 10 }} />
  );

  expect(() => run(<SliderWrapper />)).toThrow(rule.help.problem);

  SliderWrapper = () => (
    <Slider minimumValue={5} maximumValue={10} accessibilityValue={{ now: 5, min: 5 }} />
  );

  expect(() => run(<SliderWrapper />)).toThrow(rule.help.problem);
});

it("doesn't throw if 'accessibilityValue' object has all three values", () => {
  const SliderWrapper = () => (
    <Slider minimumValue={1} maximumValue={10} accessibilityValue={{ min: 1, max: 10, now: 6 }} />
  );

  expect(() => run(<SliderWrapper />)).not.toThrow(rule.help.problem);
});

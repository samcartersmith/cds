import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

import { TestAssets } from '../../__tests__/assets';
import check from '../../engine';

import rule from '.';

const run = (component: React.ReactElement<unknown>) => {
  return check(component, { rules: [rule] });
};

describe('buttons', () => {
  describe('if the disabled prop is not defined', () => {
    it("throws if 'accessibilityState' prop not defined", () => {
      const Button = () => (
        <TouchableOpacity accessibilityRole="button">
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).not.toThrow(rule.help.problem);
    });

    it("throws if 'accessibilityState' prop equals empty object'", () => {
      const Button = () => (
        <TouchableOpacity accessibilityRole="button" accessibilityState={{}}>
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).not.toThrow(rule.help.problem);
    });

    it("throws if 'accessibilityState' prop equals an object that doesn't contain 'disabled' key", () => {
      const Button = () => (
        <TouchableOpacity accessibilityRole="button" accessibilityState={{ expanded: true }}>
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).not.toThrow(rule.help.problem);
    });
  });

  describe('if the disabled prop is defined', () => {
    it("throws if 'accessibilityState' prop not defined", () => {
      const Button = () => (
        <TouchableOpacity accessibilityRole="button" disabled={false}>
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).toThrow(rule.help.problem);
    });

    it("throws if 'accessibilityState' prop equals empty object'", () => {
      const Button = () => (
        <TouchableOpacity accessibilityRole="button" disabled={false} accessibilityState={{}}>
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).toThrow(rule.help.problem);
    });

    it("throws if 'accessibilityState' prop equals an object that doesn't contain 'disabled' key", () => {
      const Button = () => (
        <TouchableOpacity
          accessibilityRole="button"
          disabled={false}
          accessibilityState={{ expanded: true }}
        >
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).toThrow(rule.help.problem);
    });

    it("doesn't throw if 'accessibilityState' equals an object that contains the 'disabled = true' key-value pair", () => {
      const Button = () => (
        <TouchableOpacity
          accessibilityRole="button"
          disabled={false}
          accessibilityState={{ disabled: true }}
        >
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).not.toThrow(rule.help.problem);
    });

    it("doesn't throw if 'accessibilityState' equals an object that contains the 'disabled = false' key-value pair", () => {
      const Button = () => (
        <TouchableOpacity
          accessibilityRole="button"
          disabled={false}
          accessibilityState={{ disabled: false }}
        >
          {}
          <Image accessibilityIgnoresInvertColors source={TestAssets.heart['32px']} />
        </TouchableOpacity>
      );

      expect(() => run(<Button />)).not.toThrow(rule.help.problem);
    });
  });
});

describe('sliders', () => {
  describe('if disabeld prop is defined', () => {
    it("throws if 'accessibilityState' prop not defined", () => {
      const Wrapper = () => <Slider disabled={false} />;
      expect(() => run(<Wrapper />)).toThrow(rule.help.problem);
    });

    it("throws if 'accessibilityState' prop equals empty object'", () => {
      const Wrapper = () => <Slider disabled={false} accessibilityState={{}} />;
      expect(() => run(<Wrapper />)).toThrow(rule.help.problem);
    });

    it("throws if 'accessibilityState' prop equals an object that doesn't contain 'disabled' key", () => {
      const Wrapper = () => <Slider disabled={false} accessibilityState={{ expanded: true }} />;

      expect(() => run(<Wrapper />)).toThrow(rule.help.problem);
    });

    it("doesn't throw if 'accessibilityState' equals an object that contains the 'disabled = true' key-value pair", () => {
      const Wrapper = () => <Slider disabled accessibilityState={{ disabled: true }} />;

      expect(() => run(<Wrapper />)).not.toThrow(rule.help.problem);
    });

    it("doesn't throw if 'accessibilityState' equals an object that contains the 'disabled = false' key-value pair", () => {
      const Wrapper = () => <Slider disabled={false} accessibilityState={{ disabled: false }} />;
      expect(() => run(<Wrapper />)).not.toThrow(rule.help.problem);
    });
  });
});

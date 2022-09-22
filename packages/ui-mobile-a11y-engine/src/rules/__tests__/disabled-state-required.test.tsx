import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { TestAssets } from '../../assets';
import check from '../../engine';
import rule from '../disabled-state-required';

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

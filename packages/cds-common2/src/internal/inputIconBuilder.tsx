import React from 'react';

import { ThemeVars } from '../core/theme';
import type {
  BoxBaseProps,
  IconBaseProps,
  IconName,
  InputVariant,
  TextInputBaseProps,
} from '../types';

const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

/** @deprecated don't use creator pattern in v8 */
export function inputIconBuilder(
  TextInput: React.ComponentType<React.PropsWithChildren<TextInputBaseProps>>,
  InputIcon: React.ComponentType<
    React.PropsWithChildren<
      {
        disableInheritFocusStyle?: boolean;
        name: IconName;
        color?: ThemeVars.Color;
        accessibilityLabel?: string;
      } & Omit<IconBaseProps, 'name' | 'size'>
    >
  >,
  Box: React.ComponentType<React.PropsWithChildren<BoxBaseProps>>,
) {
  const Basic = () => {
    return (
      <>
        {variants.map((variant) => (
          <TextInput
            key={`${variant}-inputicon`}
            label={variant}
            start={<InputIcon color={variantColorMap[variant]} name="add" />}
            variant={variant}
          />
        ))}
      </>
    );
  };

  const AccessibleInputIcon = () => {
    return (
      <TextInput
        accessibilityLabel="Search add an item"
        label="Add"
        start={<InputIcon name="add" />}
      />
    );
  };

  const DefaultsToForeground = () => {
    return (
      <TextInput label="Search" start={<InputIcon name="search" />} variant="foregroundMuted" />
    );
  };

  const SetColorAndInheritFocusStyle = () => {
    return (
      <TextInput
        label="Search"
        start={<InputIcon color="fgPositive" name="search" />}
        variant="foregroundMuted"
      />
    );
  };

  const BasicEnd = () => {
    return <TextInput end={<InputIcon name="add" />} label="Label" />;
  };

  const AddCustomColor = () => {
    return (
      <TextInput
        label="Label"
        start={<InputIcon disableInheritFocusStyle color="fg" name="add" />}
      />
    );
  };

  const AddCustomColorEnd = () => {
    return (
      <TextInput end={<InputIcon disableInheritFocusStyle color="fg" name="add" />} label="Label" />
    );
  };

  /** Testing that nothing breaks when you use it out of context */
  const InvalidPlacement = () => {
    return (
      <Box>
        <InputIcon name="add" />
      </Box>
    );
  };

  return {
    Basic,
    AccessibleInputIcon,
    DefaultsToForeground,
    SetColorAndInheritFocusStyle,
    BasicEnd,
    AddCustomColor,
    AddCustomColorEnd,
    InvalidPlacement,
  };
}

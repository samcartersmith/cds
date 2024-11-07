import React from 'react';

import type {
  BoxBaseProps,
  IconBaseProps,
  IconName,
  PaletteForeground,
  TextInputBaseProps,
} from '../types';

export function inputIconBuilder(
  TextInput: React.ComponentType<React.PropsWithChildren<TextInputBaseProps>>,
  InputIcon: React.ComponentType<
    React.PropsWithChildren<
      {
        disableInheritFocusStyle?: boolean;
        name: IconName;
        color?: PaletteForeground;
        accessibilityLabel?: string;
      } & Omit<IconBaseProps, 'name' | 'size'>
    >
  >,
  Box: React.ComponentType<React.PropsWithChildren<BoxBaseProps>>,
) {
  const Basic = () => {
    const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

    return (
      <>
        {variants.map((variant) => (
          <TextInput
            key={`${variant}-inputicon`}
            label={variant}
            start={<InputIcon color={variant} name="add" />}
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
        start={<InputIcon color="positive" name="search" />}
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
        start={<InputIcon disableInheritFocusStyle color="foreground" name="add" />}
      />
    );
  };

  const AddCustomColorEnd = () => {
    return (
      <TextInput
        end={<InputIcon disableInheritFocusStyle color="foreground" name="add" />}
        label="Label"
      />
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

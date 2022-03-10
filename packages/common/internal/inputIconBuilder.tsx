import React, { ComponentType } from 'react';

import type {
  BoxBaseProps,
  IconBaseProps,
  IconName,
  PaletteForeground,
  TextInputBaseProps,
} from '../types';

export function inputIconBuilder(
  TextInput: ComponentType<TextInputBaseProps>,
  InputIcon: ComponentType<
    {
      disableInheritFocusStyle?: boolean;
      name: IconName;
      color?: PaletteForeground;
    } & Omit<IconBaseProps, 'name' | 'size'>
  >,
  Box: ComponentType<BoxBaseProps>,
) {
  const Basic = () => {
    const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

    return (
      <>
        {variants.map((variant) => (
          <TextInput
            key={`${variant}-inputicon`}
            label="Label"
            variant={variant}
            start={<InputIcon color={variant} name="add" />}
          />
        ))}
      </>
    );
  };

  const DefaultsToForeground = () => {
    return (
      <TextInput label="Search" variant="foregroundMuted" start={<InputIcon name="search" />} />
    );
  };

  const SetColorAndInheritFocusStyle = () => {
    return (
      <TextInput
        label="Search"
        variant="foregroundMuted"
        start={<InputIcon color="positive" name="search" />}
      />
    );
  };

  const BasicEnd = () => {
    return <TextInput label="Label" end={<InputIcon name="add" />} />;
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
        label="Label"
        end={<InputIcon disableInheritFocusStyle color="foreground" name="add" />}
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
    DefaultsToForeground,
    SetColorAndInheritFocusStyle,
    BasicEnd,
    AddCustomColor,
    AddCustomColorEnd,
    InvalidPlacement,
  };
}

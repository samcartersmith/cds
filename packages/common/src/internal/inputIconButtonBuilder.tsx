import React, { ComponentType } from 'react';

import type { BoxBaseProps, IconButtonBaseProps, TextInputBaseProps } from '../types';

export function inputIconButtonBuilder(
  TextInput: ComponentType<TextInputBaseProps>,
  InputIconButton: ComponentType<
    {
      disableInheritFocusStyle?: boolean;
    } & IconButtonBaseProps
  >,
  Box: ComponentType<BoxBaseProps>,
) {
  const Basic = () => {
    const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

    return (
      <>
        {variants.map((variant) => (
          <TextInput
            label="Label"
            key={`${variant}-input-iconbutton`}
            variant={variant}
            start={<InputIconButton variant="foregroundMuted" name="add" />}
          />
        ))}
      </>
    );
  };

  const DefaultsToPrimary = () => {
    return (
      <TextInput
        label="Label"
        variant="foregroundMuted"
        start={<InputIconButton name="search" />}
      />
    );
  };

  const SetColorAndInheritFocusStyle = () => {
    return (
      <TextInput
        label="Search"
        variant="foregroundMuted"
        start={<InputIconButton variant="secondary" name="search" />}
      />
    );
  };

  const BasicEnd = () => {
    return <TextInput label="Label" end={<InputIconButton name="add" />} />;
  };

  const AddCustomColor = () => {
    return (
      <TextInput
        label="Label"
        start={<InputIconButton disableInheritFocusStyle variant="foregroundMuted" name="add" />}
      />
    );
  };

  const AddCustomColorEnd = () => {
    return (
      <TextInput
        label="Label"
        end={
          <InputIconButton
            transparent
            disableInheritFocusStyle
            variant="foregroundMuted"
            name="add"
          />
        }
      />
    );
  };

  /** Testing that nothing breaks when you use it out of context */
  const InvalidPlacement = () => {
    return (
      <Box>
        <InputIconButton name="add" variant="foregroundMuted" />
      </Box>
    );
  };

  return {
    Basic,
    SetColorAndInheritFocusStyle,
    BasicEnd,
    AddCustomColor,
    AddCustomColorEnd,
    DefaultsToPrimary,
    InvalidPlacement,
  };
}

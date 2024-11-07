import React from 'react';

import type { BoxBaseProps, IconButtonBaseProps, TextInputBaseProps } from '../types';

export function inputIconButtonBuilder(
  TextInput: React.ComponentType<React.PropsWithChildren<TextInputBaseProps>>,
  InputIconButton: React.ComponentType<
    React.PropsWithChildren<
      {
        disableInheritFocusStyle?: boolean;
      } & IconButtonBaseProps
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
            key={`${variant}-input-iconbutton`}
            label={variant}
            start={
              <InputIconButton accessibilityLabel="Add" name="add" variant="foregroundMuted" />
            }
            variant={variant}
          />
        ))}
      </>
    );
  };

  const DefaultsToPrimary = () => {
    return (
      <TextInput
        label="Label"
        start={<InputIconButton accessibilityLabel="Search" name="search" />}
        variant="foregroundMuted"
      />
    );
  };

  const SetColorAndInheritFocusStyle = () => {
    return (
      <TextInput
        label="Search"
        start={<InputIconButton accessibilityLabel="Search" name="search" variant="secondary" />}
        variant="foregroundMuted"
      />
    );
  };

  const BasicEnd = () => {
    return (
      <TextInput end={<InputIconButton accessibilityLabel="Add" name="add" />} label="Label" />
    );
  };

  const AddCustomColor = () => {
    return (
      <TextInput
        label="Label"
        start={
          <InputIconButton
            disableInheritFocusStyle
            accessibilityLabel="Add"
            name="add"
            variant="foregroundMuted"
          />
        }
      />
    );
  };

  const AddCustomColorEnd = () => {
    return (
      <TextInput
        end={
          <InputIconButton
            disableInheritFocusStyle
            transparent
            accessibilityLabel="Add"
            name="add"
            variant="foregroundMuted"
          />
        }
        label="Label"
      />
    );
  };

  /** Testing that nothing breaks when you use it out of context */
  const InvalidPlacement = () => {
    return (
      <Box>
        <InputIconButton accessibilityLabel="Add" name="add" variant="foregroundMuted" />
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

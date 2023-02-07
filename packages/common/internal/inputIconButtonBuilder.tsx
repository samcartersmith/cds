import React, { ComponentType } from 'react';

import type { BoxBaseProps, IconButtonBaseProps, TextInputBaseProps } from '../types';

export function inputIconButtonBuilder(
  TextInput: ComponentType<React.PropsWithChildren<TextInputBaseProps>>,
  InputIconButton: ComponentType<
    React.PropsWithChildren<
      {
        disableInheritFocusStyle?: boolean;
      } & IconButtonBaseProps
    >
  >,
  Box: ComponentType<React.PropsWithChildren<BoxBaseProps>>,
) {
  const Basic = () => {
    const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

    return (
      <>
        {variants.map((variant) => (
          <TextInput
            label={variant}
            key={`${variant}-input-iconbutton`}
            variant={variant}
            start={
              <InputIconButton variant="foregroundMuted" name="add" accessibilityLabel="Add" />
            }
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
        start={<InputIconButton name="search" accessibilityLabel="Search" />}
      />
    );
  };

  const SetColorAndInheritFocusStyle = () => {
    return (
      <TextInput
        label="Search"
        variant="foregroundMuted"
        start={<InputIconButton variant="secondary" name="search" accessibilityLabel="Search" />}
      />
    );
  };

  const BasicEnd = () => {
    return (
      <TextInput label="Label" end={<InputIconButton name="add" accessibilityLabel="Add" />} />
    );
  };

  const AddCustomColor = () => {
    return (
      <TextInput
        label="Label"
        start={
          <InputIconButton
            disableInheritFocusStyle
            variant="foregroundMuted"
            name="add"
            accessibilityLabel="Add"
          />
        }
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
            accessibilityLabel="Add"
          />
        }
      />
    );
  };

  /** Testing that nothing breaks when you use it out of context */
  const InvalidPlacement = () => {
    return (
      <Box>
        <InputIconButton name="add" variant="foregroundMuted" accessibilityLabel="Add" />
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

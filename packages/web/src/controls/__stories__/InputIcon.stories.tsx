import React from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { ThemeVars } from '@cbhq/cds-common/core/theme';

import { Box } from '../../layout/Box';
import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/InputIcon',
  component: InputIcon,
};

const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export const AddCustomColor = () => {
  return (
    <TextInput label="Label" start={<InputIcon disableInheritFocusStyle color="fg" name="add" />} />
  );
};

export const AddCustomColorEnd = () => {
  return (
    <TextInput end={<InputIcon disableInheritFocusStyle color="fg" name="add" />} label="Label" />
  );
};

export const Basic = () => {
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

export const BasicEnd = () => {
  return <TextInput end={<InputIcon name="add" />} label="Label" />;
};

export const DefaultsToForeground = () => {
  return <TextInput label="Search" start={<InputIcon name="search" />} variant="foregroundMuted" />;
};

export const InvalidPlacement = () => {
  return (
    <Box background="bgAlternate">
      <InputIcon name="add" />
    </Box>
  );
};

export const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIcon color="fgPositive" name="search" />}
      variant="foregroundMuted"
    />
  );
};

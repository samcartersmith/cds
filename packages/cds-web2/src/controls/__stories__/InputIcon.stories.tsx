import React from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';

import { Box } from '../../layout/Box';
import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/InputIcon',
  component: InputIcon,
};

const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'iconPrimary',
  positive: 'iconPositive',
  negative: 'iconNegative',
  foreground: 'iconForeground',
  foregroundMuted: 'iconForegroundMuted',
  secondary: 'backgroundSecondary',
};

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
  return <TextInput label="Search" start={<InputIcon name="search" />} variant="foregroundMuted" />;
};

const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIcon color="textPositive" name="search" />}
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
      start={<InputIcon disableInheritFocusStyle color="textForeground" name="add" />}
    />
  );
};

const AddCustomColorEnd = () => {
  return (
    <TextInput
      end={<InputIcon disableInheritFocusStyle color="textForeground" name="add" />}
      label="Label"
    />
  );
};

/** Testing that nothing breaks when you use it out of context */
const InvalidPlacement = () => {
  return (
    <Box background="backgroundAlternate">
      <InputIcon name="add" />
    </Box>
  );
};

export {
  AccessibleInputIcon,
  AddCustomColor,
  AddCustomColorEnd,
  Basic,
  BasicEnd,
  DefaultsToForeground,
  InvalidPlacement,
  SetColorAndInheritFocusStyle,
};

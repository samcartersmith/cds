import React from 'react';

import { Box } from '../../layout/Box';
import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/InputIcon',
  component: InputIcon,
};

const variants = [
  'textForeground',
  'textForegroundMuted',
  'textPrimary',
  'textNegative',
  'textPositive',
] as const;

const Basic = () => {
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
    <TextInput label="Search" start={<InputIcon name="search" />} variant="textForegroundMuted" />
  );
};

const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIcon color="textPositive" name="search" />}
      variant="textForegroundMuted"
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

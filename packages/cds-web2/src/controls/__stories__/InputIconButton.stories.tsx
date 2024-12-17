import React from 'react';

import { Box } from '../../layout/Box';
import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/InputIconButton',
  component: InputIconButton,
};

const variants = [
  'textForeground',
  'textForegroundMuted',
  'textPrimary',
  'textNegative',
  'textPositive',
  'backgroundSecondary',
] as const;

const Basic = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          key={`${variant}-input-iconbutton`}
          label={variant}
          start={<InputIconButton accessibilityLabel="Add" name="add" variant="foregroundMuted" />}
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
      variant="textForegroundMuted"
    />
  );
};

const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIconButton accessibilityLabel="Search" name="search" variant="secondary" />}
      variant="textForegroundMuted"
    />
  );
};

const BasicEnd = () => {
  return <TextInput end={<InputIconButton accessibilityLabel="Add" name="add" />} label="Label" />;
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
    <Box background="backgroundAlternate">
      <InputIconButton accessibilityLabel="Add" name="add" variant="foregroundMuted" />
    </Box>
  );
};

export {
  AddCustomColor,
  AddCustomColorEnd,
  Basic,
  BasicEnd,
  DefaultsToPrimary,
  InvalidPlacement,
  SetColorAndInheritFocusStyle,
};

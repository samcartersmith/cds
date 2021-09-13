import React, { useMemo, memo } from 'react';
import { TextInputProps, View, ViewStyle } from 'react-native';
import { SharedProps } from '@cbhq/cds-common';
import { InputLabelProps } from './InputLabel';
import { useSpacingStyles } from '../hooks/useSpacingStyles';

export type CompactInputProps = {
  /** Label indicating what input is for. Needs to be an InputLabel component */
  inputLabel: React.ReactElement<InputLabelProps>;
  /** Custom editable input. Needs to be a React Native TextInput */
  editableInput: React.ReactElement<TextInputProps>;
  /**
   * Width of input
   * @default '100%''
   */
  width?: string | number | 'auto';
} & SharedProps;

export const CompactInput = memo(function CompactInput({
  inputLabel,
  editableInput,
  width = '100%',
  testID,
}: CompactInputProps) {
  const containerPaddingStyle = useSpacingStyles({
    spacing: 1,
  });

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width,
      ...containerPaddingStyle,
    };
  }, [containerPaddingStyle, width]);

  return (
    <View style={containerStyle} testID={testID}>
      <View style={{ flex: 1 }}>{inputLabel}</View>
      <View style={{ flex: 1 }}>{editableInput}</View>
    </View>
  );
});

import React, { useMemo, memo } from 'react';
import { TextInputProps, View, ViewStyle } from 'react-native';
import { SharedProps } from '@cbhq/cds-common';
import { InputLabelProps } from './InputLabel';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box } from '../layout/Box';

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

  const editableInputSpacing = useSpacingStyles({
    spacingStart: 1,
  });

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flexDirection: 'row',
      width,
      ...containerPaddingStyle,
    };
  }, [containerPaddingStyle, width]);

  return (
    <View style={containerStyle} testID={testID}>
      <Box alignSelf="center">{inputLabel}</Box>
      <View style={{ flex: 1, ...editableInputSpacing }}>{editableInput}</View>
    </View>
  );
});

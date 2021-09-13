import { SharedProps } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { TextInputProps, View, ViewStyle } from 'react-native';
import { useSpacingStyles } from '../hooks/useSpacingStyles';

export type DefaultInputProps = {
  /** Content placed on the left side of editable input area. Can be any React Element */
  prefix?: React.ReactNode;
  /** Content placed on the right side of editable input area. Can be any React Element */
  suffix?: React.ReactNode;
  /** Content for input label area. Can be any React Element */
  label?: React.ReactNode;
  /** Content for editable input area. Can be any React Element */
  editableInput: React.ReactElement<TextInputProps>;
} & SharedProps;

export const DefaultInput = memo(function DefaultInput({
  prefix,
  suffix,
  editableInput,
  testID,
}: DefaultInputProps) {
  const containerSpacingStyle = useSpacingStyles({
    spacingHorizontal: 2,
    spacingVertical: 2,
  });

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flex: 2,
      flexDirection: 'row',
      ...containerSpacingStyle,
    };
  }, [containerSpacingStyle]);

  return (
    <View style={containerStyle} testID={testID}>
      {!!prefix && <>{prefix}</>}
      {editableInput}
      {!!suffix && <>{suffix}</>}
    </View>
  );
});

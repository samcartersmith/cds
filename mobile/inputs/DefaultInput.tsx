import { SharedProps } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { TextInputProps, View, ViewStyle } from 'react-native';
import { useSpacingStyles } from '../hooks/useSpacingStyles';

export type DefaultInputProps = {
  /** Content for input label area. Can be any React Element */
  label?: React.ReactNode;
  /** Content for editable input area. Can be any React Element */
  editableInput: React.ReactElement<TextInputProps>;
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: ViewStyle | undefined;
} & SharedProps;

export const DefaultInput = memo(function DefaultInput({
  editableInput,
  containerSpacing,
  testID,
}: DefaultInputProps) {
  const containerSpacingStyle = useSpacingStyles({
    spacingHorizontal: 2,
    spacingVertical: 2,
  });

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flex: 2,
      ...containerSpacingStyle,
    };
  }, [containerSpacingStyle]);

  return (
    <View style={[containerStyle, containerSpacing]} testID={testID}>
      {editableInput}
    </View>
  );
});

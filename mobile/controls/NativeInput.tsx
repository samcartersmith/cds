import { SharedProps, TextBaseProps, useSpectrum } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { TextInputProps, View, ViewStyle, TextInput as RNTextInput } from 'react-native';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { useInputTextStyles } from '../hooks/useInputStyles';
import { useTextAlign } from '../hooks/useTextAlign';
import { usePalette } from '../hooks/usePalette';

export type NativeInputProps = {
  /**
   * Text Align Input
   * @default start
   * */
  align?: TextBaseProps['align'];
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: ViewStyle | undefined;
  /**
   * Disables input
   * @default false
   * */
  disabled?: boolean;
} & SharedProps &
  TextInputProps;

export const NativeInput = memo(function NativeInput({
  containerSpacing,
  testID,
  align = 'start',
  disabled,
  ...editableInputAddonProps
}: NativeInputProps) {
  const textAlignInputTransformed = useTextAlign(align).textAlign;
  const inputTextStyle = useInputTextStyles('foreground');
  const containerSpacingStyle = useSpacingStyles({
    spacingHorizontal: 2,
    spacingVertical: 2,
  });
  const spectrum = useSpectrum();
  const palette = usePalette();

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flex: 2,
      ...containerSpacingStyle,
    };
  }, [containerSpacingStyle]);

  return (
    <View style={[containerStyle, containerSpacing]} testID={testID}>
      <RNTextInput
        style={[inputTextStyle, { flex: 2, textAlign: textAlignInputTransformed }]}
        editable={!disabled}
        placeholderTextColor={palette.foregroundMuted}
        keyboardAppearance={spectrum}
        {...editableInputAddonProps}
      />
    </View>
  );
});

import { SharedProps, TextBaseProps, TextInputBaseProps, useSpectrum } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { TextInputProps, View, ViewStyle, TextInput as RNTextInput } from 'react-native';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
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
  Pick<TextInputBaseProps, 'compact'> &
  SharedAccessibilityProps &
  TextInputProps;

export const NativeInput = memo(function NativeInput({
  containerSpacing,
  testID = '',
  align = 'start',
  disabled,
  accessibilityLabel,
  compact,
  ...editableInputAddonProps
}: NativeInputProps) {
  const textAlignInputTransformed = useTextAlign(align).textAlign;
  const inputTextStyle = useInputTextStyles('foreground');
  const containerSpacingStyle = useSpacingStyles({
    spacing: compact ? 1 : 2,
  });
  const spectrum = useSpectrum();
  const palette = usePalette();

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flex: 2,
      ...containerSpacingStyle,
      ...containerSpacing,
    };
  }, [containerSpacingStyle, containerSpacing]);

  return (
    <View style={containerStyle} testID={testID && `${testID}-container`}>
      <RNTextInput
        testID={testID}
        style={[inputTextStyle, { flex: 2, textAlign: textAlignInputTransformed }]}
        editable={!disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityLabel}
        accessibilityRole="search"
        placeholderTextColor={palette.foregroundMuted}
        keyboardAppearance={spectrum}
        {...editableInputAddonProps}
      />
    </View>
  );
});

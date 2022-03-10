import { SharedProps, TextBaseProps, TextInputBaseProps, useSpectrum } from '@cbhq/cds-common';
import React, { useMemo, memo, ForwardedRef, forwardRef } from 'react';
import { TextInputProps, ViewStyle, TextInput as RNTextInput, TextInput } from 'react-native';
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
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  TextInputProps;

export const NativeInput = memo(
  forwardRef(
    (
      {
        containerSpacing,
        testID = '',
        align = 'start',
        disabled,
        accessibilityLabel,
        compact,
        ...editableInputAddonProps
      }: NativeInputProps,
      ref: ForwardedRef<TextInput>,
    ) => {
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
      }, [containerSpacing, containerSpacingStyle]);

      const inputRootStyles = useMemo(() => {
        return [inputTextStyle, containerStyle, { textAlign: textAlignInputTransformed }];
      }, [containerStyle, inputTextStyle, textAlignInputTransformed]);

      return (
        <RNTextInput
          testID={testID}
          ref={ref}
          style={inputRootStyles}
          editable={!disabled}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityLabel}
          accessibilityRole="search"
          placeholderTextColor={palette.foregroundMuted}
          keyboardAppearance={spectrum}
          {...editableInputAddonProps}
        />
      );
    },
  ),
);

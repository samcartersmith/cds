import React, { forwardRef, memo, useMemo } from 'react';
import { TextInput as RNTextInput, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { SharedProps, TextBaseProps, TextInputBaseProps, useSpectrum } from '@cbhq/cds-common';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { useInputTextStyles } from '../hooks/useInputStyles';
import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { useTextAlign } from '../hooks/useTextAlign';

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
  /**
   * Native TextInput textAlign with the extra unset option to remove the textAlign style.
   * Use this to workaround the issue where long text does not ellipsis in TextInput
   * @warning Setting this to unset will break alignment for RTL languages.
   */
  textAlign?: TextInputProps['textAlign'] | 'unset';
} & SharedProps &
  Pick<TextInputBaseProps, 'compact'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<TextInputProps, 'textAlign'>;

export const NativeInput = memo(
  forwardRef(
    (
      {
        containerSpacing,
        testID = '',
        align = 'start',
        disabled,
        textAlign,
        accessibilityLabel,
        compact,
        style,
        ...editableInputAddonProps
      }: NativeInputProps,
      ref: React.ForwardedRef<TextInput>,
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
          ...(!disabled &&
            editableInputAddonProps.readOnly && { backgroundColor: palette.secondary }),
        };
      }, [
        containerSpacing,
        containerSpacingStyle,
        editableInputAddonProps.readOnly,
        disabled,
        palette.secondary,
      ]);

      const inputRootStyles = useMemo(() => {
        return [
          inputTextStyle,
          containerStyle,
          /**
           * To workaround a known RN bug (link below) where long text does not ellipsis correctly in TextInput
           * @link https://github.com/facebook/react-native/issues/29068
           */
          { textAlign: textAlign === 'unset' ? undefined : textAlignInputTransformed },
          style,
        ];
      }, [inputTextStyle, containerStyle, textAlign, textAlignInputTransformed, style]);

      return (
        <RNTextInput
          ref={ref}
          accessibilityHint={accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="search"
          editable={!disabled}
          keyboardAppearance={spectrum}
          placeholderTextColor={palette.foregroundMuted}
          style={inputRootStyles}
          testID={testID}
          textAlign={textAlign !== 'unset' ? textAlign : undefined}
          {...editableInputAddonProps}
        />
      );
    },
  ),
);

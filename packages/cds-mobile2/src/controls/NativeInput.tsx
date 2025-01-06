import React, { forwardRef, memo, useMemo } from 'react';
import { TextInput as RNTextInput, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { SharedProps, TextBaseProps, TextInputBaseProps } from '@cbhq/cds-common2';
import { SharedAccessibilityProps } from '@cbhq/cds-common2/types/SharedAccessibilityProps';

import { useColorScheme } from '../hooks/useColorScheme';
import { useInputTextStyles } from '../hooks/useInputStyles';
import { useTextAlign } from '../hooks/useTextAlign';
import { useTheme } from '../system';

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
      const theme = useTheme();
      const colorScheme = useColorScheme();
      const textAlignInputTransformed = useTextAlign(align).textAlign;
      const inputTextStyle = useInputTextStyles('foreground');

      const containerStyle: ViewStyle = useMemo(() => {
        return {
          flex: 2,
          padding: theme.space[compact ? 1 : 2],
          ...containerSpacing,
          ...(!disabled &&
            editableInputAddonProps.readOnly && {
              backgroundColor: theme.color.backgroundSecondary,
            }),
        };
      }, [
        containerSpacing,
        theme.space,
        theme.color,
        compact,
        editableInputAddonProps.readOnly,
        disabled,
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
          keyboardAppearance={colorScheme}
          placeholderTextColor={theme.color.textForegroundMuted}
          style={inputRootStyles}
          testID={testID}
          textAlign={textAlign !== 'unset' ? textAlign : undefined}
          {...editableInputAddonProps}
        />
      );
    },
  ),
);

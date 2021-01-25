import * as React from 'react';

import type { TextBaseProps, Typography } from '@cds/core';
import { usePalette, useScale } from '@cds/theme';
import { scales } from '@cds/theme/native';
import { pascalCase } from '@cds/utils';
import { I18nManager, Text, TextProps as RNTextProps, StyleSheet } from 'react-native';

export type { Typography };

const styles = StyleSheet.create({
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
});

export interface TextProps
  extends Readonly<Omit<RNTextProps, 'style' | 'selectable'>>,
    TextBaseProps {}

const createText = (name: Typography) => {
  const TextComponent: React.FC<TextProps> = ({
    color = 'foreground',
    align = 'left',
    tabularNumbers = false,
    // RN doesn't differentiate select behavior between text and all. Default to text to match web default. It behaves as true.
    selectable = 'text',
    ...props
  }) => {
    const scale = useScale();
    const palette = usePalette();

    const textAlign = React.useMemo(() => {
      if (align === 'start') {
        return I18nManager.isRTL ? 'right' : 'left';
      }
      if (align === 'end') {
        return I18nManager.isRTL ? 'left' : 'right';
      }
      return align;
    }, [align]);

    const style = React.useMemo(
      () => [
        scales[scale].typography[name],
        { color: palette[color], textAlign },
        tabularNumbers && styles.tabularNumbers,
      ],
      [scale, palette, color, textAlign, tabularNumbers]
    );

    return (
      <Text
        {...props}
        // TODO (hannah): Add iOS support for selectable. https://awesomeopensource.com/project/Astrocoders/react-native-selectable-text
        selectable={selectable !== 'none'}
        style={style}
      />
    );
  };

  TextComponent.displayName = pascalCase(name);
  return TextComponent;
};

export const TextDisplay1 = createText('display1');
export const TextDisplay2 = createText('display2');
export const TextTitle1 = createText('title1');
export const TextTitle2 = createText('title2');
export const TextTitle3 = createText('title3');
export const TextHeadline = createText('headline');
export const TextBody = createText('body');
export const TextLabel1 = createText('label1');
export const TextLabel2 = createText('label2');
export const TextCaption = createText('caption');
export const TextLegal = createText('legal');

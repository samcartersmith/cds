import { useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { SparklineInteractiveSubHeadIconColor } from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';

import { usePalette } from '../../hooks/usePalette';
import { useSpacingScale } from '../../hooks/useSpacingScale';
import { numberStyles, useTypographyStyles } from '../../typography';
import { getAdjustedFontScale } from '../../utils/getAdjustedFontScale';

// The – character width is larger than the width of the + character.
// To prevent layout jank and jumping around we set a fixed width for
// this component. Because of accessible font scaling we first get the
// active font size and then calculate the character width, which for the –
// character is 0.6em.
const useSubIconWidth = () => {
  const label1FontSize = useTypographyStyles('label1').fontSize;
  return useCallback(
    (color: SparklineInteractiveSubHeadIconColor) => {
      const activeWidth = label1FontSize * 0.6;
      // Hide if color is muted aka 0% change so icon is flushed to far left
      return color === 'foregroundMuted' ? 0 : activeWidth;
    },
    [label1FontSize],
  );
};

export const styles = StyleSheet.create({
  // Inputs need to have these styles to make it appear as Text component
  // eslint-disable-next-line react-native/no-color-literals
  inputReset: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
    lineHeight: undefined,
  },
  fullWidth: {
    width: '100%',
  },
});

/**
 * @deprecated this component will be removed from CDS in v6.0.0. It has been moved to cds-mobile-visualization.
 */
export function useSparklineInteractiveHeaderStyles() {
  const palette = usePalette();
  const spacing = useSpacingScale();
  const typography = {
    title1: useTypographyStyles('title1'),
    label1: useTypographyStyles('label1'),
    label2: useTypographyStyles('label2'),
  };
  const fontSize = {
    title1: typography.title1.fontSize,
  };
  const lineHeight = {
    title1: typography.title1.lineHeight,
    label1: typography.label1.lineHeight,
  };

  const getSubIconWidth = useSubIconWidth();
  return useMemo(() => {
    return {
      // TITLE STYLES - the large price text
      title: (text: string): StyleProp<TextStyle> => {
        const { length } = text;
        // We manually decrease fontSize if length of new value
        // is greater than 12 characters long
        const { fontSize: titleFontSize } = getAdjustedFontScale(
          { fontSize: fontSize.title1 },
          length,
          12,
        );

        return [
          typography.title1,
          numberStyles,
          styles.inputReset,
          styles.fullWidth,
          {
            fontSize: titleFontSize,
            color: palette.foreground,
            height: lineHeight.title1,
          },
        ];
      },
      // LABEL STYLES - the small text above price
      label: [
        typography.label1,
        styles.inputReset,
        styles.fullWidth,
        {
          height: lineHeight.label1,
          color: palette.foregroundMuted,
        },
      ] as StyleProp<TextStyle>,
      // SUBHEAD ICON STYLES - the + or - after price and in front of percent change)
      subHeadIcon: (color: SparklineInteractiveSubHeadIconColor): StyleProp<TextStyle> => [
        typography.label1,
        styles.inputReset,
        {
          color: palette[color],
          width: getSubIconWidth(color),
          marginRight: spacing[0.5] / 2,
          textAlign: 'left',
        },
      ],
      // SUBHEAD STYLES - the percent change text
      subHead: (
        color: SparklineInteractiveSubHeadIconColor,
        useFullWidth = true,
      ): StyleProp<TextStyle> =>
        [
          typography.label1,
          numberStyles,
          ...(useFullWidth ? [styles.fullWidth] : [{ width: 'auto' }]),
          styles.inputReset,
          {
            color: palette[color],
          },
        ] as TextStyle,
      subHeadAccessory: (): StyleProp<TextStyle> => [
        typography.label2,
        styles.inputReset,
        {
          color: palette.foregroundMuted,
          marginLeft: spacing[0.5],
          textAlign: 'left',
        },
      ],
    } as const;
  }, [
    typography.label1,
    typography.title1,
    typography.label2,
    lineHeight.label1,
    lineHeight.title1,
    palette,
    fontSize.title1,
    getSubIconWidth,
    spacing,
  ]);
}

import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';
import { ChartScrubParams, SpacingScale } from '@cbhq/cds-common/types';
import {
  SparklineInteractiveBaseProps,
  SparklineInteractiveHoverDateRefProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { useSpacingScale } from '@cbhq/cds-mobile/hooks/useSpacingScale';
import { useTypographyStyles } from '@cbhq/cds-mobile/typography';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

type Props<Period extends string> = Pick<
  SparklineInteractiveBaseProps<Period>,
  'formatHoverDate'
> & {
  shouldTakeUpHeight: boolean;
};

export function setTransform(
  x: number,
  elWidth: number,
  containerWidth: number,
  transform: Animated.ValueXY,
  gutter: SpacingScale,
) {
  let newX = x - elWidth / 2;
  newX = Math.max(gutter, newX);
  newX = Math.min(newX, containerWidth - elWidth - gutter);

  transform.setValue({ x: newX, y: 0 });
}

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  caption: {
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
  },
});

const MAX_MEASURE_ITERATIONS = 5;
const SparklineInteractiveHoverDateWithGeneric = forwardRef(
  <Period extends string>(
    { formatHoverDate, shouldTakeUpHeight }: Props<Period>,
    ref: React.ForwardedRef<SparklineInteractiveHoverDateRefProps<Period>>,
  ) => {
    const colors = usePalette();
    const { hoverDateOpacity, gutter } = useSparklineInteractiveContext();
    const spacing = useSpacingScale();
    const { SparklineInteractiveMinMaxLabelHeight, chartWidth } = useSparklineInteractiveConstants(
      {},
    );
    const label2Styles = useTypographyStyles('label2');
    const transform = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const textInputRef = useRef<TextInput>(null);

    // period => number mapping
    const measuredWidth = useRef<Record<string, number>>({});
    const measureIterations = useRef<Record<string, number>>({});
    // if we have no gutter the min/max label needs some space so it's not right up against the edge of the screen
    const minGutter = gutter === 0 ? spacing['1'] : 0;

    useImperativeHandle(ref, () => ({
      update: (params: ChartScrubParams<Period>) => {
        const {
          point: { x, date },
          period,
        } = params;

        // the second conditional is to let typescript know x is always defined after this line
        if (!Number.isFinite(x) || x === undefined) {
          return;
        }

        const text = formatHoverDate?.(date, period);
        if (!text) {
          return;
        }

        // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
        // Usage in this component are known making this a high risk component. Contact team for more information.

        textInputRef.current?.setNativeProps({
          text: formatHoverDate?.(date, period),
        });

        measureIterations.current[period] = measureIterations.current[period] ?? 0;
        if (measureIterations.current[period] > MAX_MEASURE_ITERATIONS) {
          const currWidth = measuredWidth.current[period];
          setTransform(x, currWidth, chartWidth, transform, minGutter);
        } else {
          textInputRef.current?.measure((ox, oy, width) => {
            measureIterations.current[period] += 1;
            measuredWidth.current[period] = Math.max(width, measuredWidth.current[period] ?? 0);
            setTransform(x, measuredWidth.current[period], chartWidth, transform, minGutter);
          });
        }
      },
    }));

    const rootStyle = useMemo(() => {
      return {
        position: shouldTakeUpHeight ? 'relative' : 'absolute',
        opacity: hoverDateOpacity,
        backgroundColor: colors.background,
        height: SparklineInteractiveMinMaxLabelHeight,
        ...styles.outer,
      } as const;
    }, [
      SparklineInteractiveMinMaxLabelHeight,
      colors.background,
      hoverDateOpacity,
      shouldTakeUpHeight,
    ]);

    const innerStyle = useMemo(() => {
      return {
        ...styles.caption,
        transform: transform.getTranslateTransform(),
      };
    }, [transform]);

    const textInputStyle = useMemo(() => {
      return {
        ...label2Styles,
        color: colors.foregroundMuted,
      };
    }, [colors.foregroundMuted, label2Styles]);

    return (
      <Animated.View pointerEvents="none" style={rootStyle}>
        <Animated.View style={innerStyle}>
          <TextInput
            ref={textInputRef}
            accessibilityHint="Text input field"
            accessibilityLabel="Text input field"
            style={textInputStyle}
          />
        </Animated.View>
      </Animated.View>
    );
  },
);

type ForwardRefWithPeriod<Period extends string> = React.ForwardRefExoticComponent<
  Props<Period> & { ref?: React.Ref<SparklineInteractiveHoverDateRefProps<Period>> }
>;

export const SparklineInteractiveHoverDate =
  SparklineInteractiveHoverDateWithGeneric as ForwardRefWithPeriod<any>;

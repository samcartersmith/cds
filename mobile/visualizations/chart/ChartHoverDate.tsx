import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';
import { ChartScrubParams } from '@cbhq/cds-common/types';
import {
  ChartHoverDateRefProps,
  SparklineInteractiveBaseProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { usePalette } from '../../hooks/usePalette';
import { useTypographyStyles } from '../../typography';

type Props<Period extends string> = Pick<
  SparklineInteractiveBaseProps<Period>,
  'formatHoverDate'
> & {
  shouldTakeUpHeight: boolean;
};

function setTransform(
  x: number,
  elWidth: number,
  containerWidth: number,
  transform: Animated.ValueXY,
) {
  let newX = x - elWidth / 2;
  newX = Math.max(0, newX);
  newX = Math.min(newX, containerWidth - elWidth);

  transform.setValue({ x: newX, y: 0 });
}

const MAX_MEASURE_ITERATIONS = 5;
const ChartHoverDateWithGeneric = forwardRef(
  <Period extends string>(
    { formatHoverDate, shouldTakeUpHeight }: Props<Period>,
    ref: ForwardedRef<ChartHoverDateRefProps<Period>>,
  ) => {
    const colors = usePalette();
    const { hoverDateOpacity } = useChartContext();
    const { chartMinMaxLabelHeight, chartWidth } = useChartConstants({});
    const label2Styles = useTypographyStyles('label2');
    const transform = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const textInputRef = useRef<TextInput>(null);

    // period => number mapping
    const measuredWidth = useRef<Record<string, number>>({});
    const measureIterations = useRef<Record<string, number>>({});

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

        textInputRef.current?.setNativeProps({
          text: formatHoverDate?.(date, period),
        });

        measureIterations.current[period] = measureIterations.current[period] ?? 0;
        if (measureIterations.current[period] > MAX_MEASURE_ITERATIONS) {
          const currWidth = measuredWidth.current[period];
          setTransform(x, currWidth, chartWidth, transform);
        } else {
          textInputRef.current?.measure((ox, oy, width) => {
            measureIterations.current[period] += 1;
            measuredWidth.current[period] = Math.max(width, measuredWidth.current[period] ?? 0);
            setTransform(x, measuredWidth.current[period], chartWidth, transform);
          });
        }
      },
    }));

    const labelStyles = {
      color: colors.foregroundMuted,
    };

    return (
      <Animated.View
        style={[
          {
            position: shouldTakeUpHeight ? 'relative' : 'absolute',
            opacity: hoverDateOpacity,
            backgroundColor: colors.background,
            height: chartMinMaxLabelHeight,
          },
          styles.outer,
        ]}
        pointerEvents="none"
      >
        <Animated.View
          style={[
            styles.caption,
            {
              transform: transform.getTranslateTransform(),
            },
          ]}
        >
          <TextInput style={[label2Styles, labelStyles]} ref={textInputRef} />
        </Animated.View>
      </Animated.View>
    );
  },
);

type ForwardRefWithPeriod<Period extends string> = React.ForwardRefExoticComponent<
  Props<Period> & React.RefAttributes<ChartHoverDateRefProps<Period>>
>;

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export const ChartHoverDate = ChartHoverDateWithGeneric as ForwardRefWithPeriod<any>;

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

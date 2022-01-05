import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import { ChartScrubParams } from '@cbhq/cds-common/types';
import {
  ChartHoverDateRefProps,
  InteractiveSparklineBaseProps,
} from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { usePalette } from '../../hooks/usePalette';
import { useTypographyStyles } from '../../typography';

type Props<Period extends string> = Pick<
  InteractiveSparklineBaseProps<Period>,
  'formatHoverDate'
> & {
  shouldTakeUpHeight: boolean;
};

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
    const containerRef = useRef<View>();

    useImperativeHandle(ref, () => ({
      update: (params: ChartScrubParams<Period>) => {
        const {
          point: { x, date },
          period,
        } = params;

        textInputRef.current?.setNativeProps({
          text: formatHoverDate?.(date, period),
        });

        textInputRef.current?.measure((ox, oy, width) => {
          if (x) {
            let newX = x - width / 2;
            newX = Math.max(0, newX);
            newX = Math.min(newX, chartWidth - width);
            transform.setValue({ x: newX, y: 0 });
          }
        });
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
            width: '100%',
          },
          {
            opacity: hoverDateOpacity,
            backgroundColor: colors.background,
            height: chartMinMaxLabelHeight,
          },
        ]}
      >
        <Animated.View
          ref={containerRef}
          style={[
            styles.caption,
            {
              height: label2Styles.lineHeight,
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
  caption: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

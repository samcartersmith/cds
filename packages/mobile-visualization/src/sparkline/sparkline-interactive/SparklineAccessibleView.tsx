import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import chunk from 'lodash/chunk';
import { SparklineInteractiveBaseProps } from '@cbhq/cds-common';

type SparklineAccessibleViewProps<Period extends string> = {
  selectedPeriod: Period;
} & Pick<SparklineInteractiveBaseProps<Period>, 'data'>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

// map months to English
const MONTH_IN_EN = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

/**
 * SparklineAccessibleView renders an accessible view for Sparkline Chart.
 *
 * It chunks the sparkline data into 10 (or fewer) pieces, rendering each as a View with
 * flex width proportional to the chunk size. The first data point in each chunk is used
 * to generate an accessibilityLabel with the date and value.
 *
 * @param data - The sparkline data mapped by time period
 * @param selectedPeriod - The currently selected time period
 */
export const SparklineAccessibleView = memo(function SparklineAccessibleView<
  Period extends string,
>({ data, selectedPeriod }: SparklineAccessibleViewProps<Period>) {
  const chunkedData = data ? chunk(data[selectedPeriod], data[selectedPeriod].length / 10) : [];
  // if the data is not evenly divisible by 10, the last chunk will be smaller than the rest
  // so we need to combine it with the previous chunk
  if (chunkedData.length === 11) {
    const lastChunk = chunkedData.pop();
    chunkedData[chunkedData.length - 1] = chunkedData[chunkedData.length - 1].concat(
      lastChunk ?? [],
    );
  }

  const getStyleByLength = useCallback(
    (length: number) => ({
      flex: length,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {chunkedData.map((dataChunk) => {
        // use the first data point in chunk for accessibility label
        const item = dataChunk[0];

        // only announce time for hour and day
        const shouldAnnounceTime = selectedPeriod === 'hour' || selectedPeriod === 'day';

        const hours = new Date(item.date).getHours();
        const minutes = new Date(item.date).getMinutes();
        const month = new Date(item.date).getMonth() as keyof typeof MONTH_IN_EN;
        const date = new Date(item.date).getDate();
        const year = new Date(item.date).getFullYear();
        const price = item.value.toFixed(2);

        // TODO: localize date and time
        const a11yLabelWithDate = `${MONTH_IN_EN[month]} ${date}, ${year}, $${price}`;
        const a11yLabelWithTime = `${hours} ${minutes} , $${price}`;

        return (
          <View
            key={String(item.date)}
            accessible
            accessibilityLabel={shouldAnnounceTime ? a11yLabelWithTime : a11yLabelWithDate}
            // variable width base on chunk length
            style={getStyleByLength(dataChunk.length)}
          />
        );
      })}
    </View>
  );
});

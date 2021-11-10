import React, { useMemo } from 'react';

import { StyleSheet, View } from 'react-native';
import { useCounter } from '@cbhq/cds-common/visualizations/useCounter';
import { CounterBaseProps } from '@cbhq/cds-common/types/CounterBaseProps';
import { Box } from '../layout';

export const Counter: React.FC<CounterBaseProps> = ({
  startNum,
  endNum,
  renderNum,
  durationInMillis,
}) => {
  const count = useCounter(startNum, endNum, durationInMillis);
  const renderFunction = useMemo(() => {
    return (num: number) => {
      return renderNum ? renderNum(num) : num;
    };
  }, [renderNum]);

  return (
    <Box justifyContent="center" alignSelf="flex-start">
      <View style={styles.hidden}>{renderFunction(Math.max(endNum, startNum))}</View>
      <View style={styles.visible}>{renderFunction(count)}</View>
    </Box>
  );
};

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
  },
  visible: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
  },
});

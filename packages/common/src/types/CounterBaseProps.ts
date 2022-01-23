import React from 'react';

export type CounterBaseProps = {
  startNum: number;
  endNum: number;
  durationInMillis: number;
  renderNum?: (num: number) => string | React.ReactNode;
};

import React, { useMemo } from 'react';
import { css } from '@linaria/core';
import { CounterBaseProps } from '@cbhq/cds-common2/types/CounterBaseProps';
import { useCounter } from '@cbhq/cds-common2/visualizations/useCounter';

const containerClassName = css`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const hiddenClassName = css`
  visibility: hidden;
`;

const visibleClassName = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  /* allows text to take full space so it can be aligned correctly (start or end) */
  & > * {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
  }
`;

export const Counter = ({ startNum, endNum, renderNum, durationInMillis }: CounterBaseProps) => {
  const count = useCounter({ startNum, endNum, durationInMillis });

  const renderFunction = useMemo(() => {
    return (num: number) => {
      return renderNum ? renderNum(num) : num;
    };
  }, [renderNum]);

  return (
    <div className={containerClassName}>
      <span className={hiddenClassName}>{renderFunction(endNum)}</span>
      <span className={visibleClassName}>{renderFunction(count)}</span>
    </div>
  );
};

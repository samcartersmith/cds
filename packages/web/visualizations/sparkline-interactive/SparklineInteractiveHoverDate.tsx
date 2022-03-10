import React, { memo, useCallback } from 'react';
import { css } from 'linaria';

import { TextLabel2 } from '../../typography/TextLabel2';
import { cx } from '../../utils/linaria';

import { resetFadeClassName } from './fade';
import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

const textClassName = css`
  display: inline-flex;
  align-items: center;
`;

export const SparklineInteractiveHoverDate = memo(() => {
  const { setHoverDateDOMNode } = useSparklineInteractiveScrubContext();

  const setupTextRef = useCallback(
    (ref: HTMLSpanElement) => {
      setHoverDateDOMNode(ref ?? null);
    },
    [setHoverDateDOMNode],
  );

  return (
    <TextLabel2 tabularNumbers as="div">
      <span ref={setupTextRef} className={cx(resetFadeClassName, textClassName)}>
        {/* prevent the container vertical jump by stubbing out a date with no opacity */}
        {new Date().toLocaleString()}
      </span>
    </TextLabel2>
  );
});

import React, { memo, useCallback } from 'react';
import { css, cx } from '@linaria/core';
import { TextLabel2 } from '@cbhq/cds-web/typography/TextLabel2';

import { resetFadeClassName } from './fade';
import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

const textClassName = css`
  display: inline-flex;
  align-items: center;
`;

export const SparklineInteractiveHoverDate = memo(() => {
  const { setHoverDateDOMNode } = useSparklineInteractiveScrubContext();
  const dateString = new Date().toLocaleString();

  const setupDateRef = useCallback(
    (ref: HTMLSpanElement) => {
      setHoverDateDOMNode(ref ?? null);
    },
    [setHoverDateDOMNode],
  );

  return (
    <TextLabel2 tabularNumbers as="div">
      <span ref={setupDateRef} className={cx(resetFadeClassName, textClassName)}>
        {/* prevent the container vertical jump by stubbing out a date with no opacity */}
        {dateString}
      </span>
    </TextLabel2>
  );
});

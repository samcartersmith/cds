import React, { memo, useCallback } from 'react';
import { css } from 'linaria';
import { TextLabel2 } from '@cbhq/cds-web/typography/TextLabel2';
import { cx } from '@cbhq/cds-web/utils/linaria';

import { resetFadeClassName } from './fade';
import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

const textClassName = css`
  display: inline-flex;
  align-items: center;
`;

export const SparklineInteractiveHoverPrice = memo(() => {
  const { setHoverPriceDOMNode } = useSparklineInteractiveScrubContext();

  const setupPriceRef = useCallback(
    (ref: HTMLSpanElement) => {
      setHoverPriceDOMNode(ref ?? null);
    },
    [setHoverPriceDOMNode],
  );

  return (
    <TextLabel2 tabularNumbers as="div">
      <span ref={setupPriceRef} className={cx(resetFadeClassName, textClassName)}>
        {/* prevent the container vertical jump by stubbing out a price with no opacity */}
      </span>
    </TextLabel2>
  );
});

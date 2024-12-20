import React, { Fragment } from 'react';

/**
 * Util for adding a separator element between react components excluding the last item
 */
export const join = (arr: unknown[], node: React.ReactNode) =>
  (arr as React.ReactNode[]).map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Fragment key={index}>
      <>
        {item}
        {index !== arr.length - 1 && node}
      </>
    </Fragment>
  ));

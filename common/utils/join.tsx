import React from 'react';

/**
 * Util for adding a separator element between react components excluding the last item
 */
export const join = (arr: unknown[], node: React.ReactNode) =>
  arr.map((item, index) => (
    <React.Fragment key={index}>
      {item}
      {index !== arr.length - 1 && node}
    </React.Fragment>
  ));

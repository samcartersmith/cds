import React, { cloneElement } from 'react';

import { ElementChildren, SparklineAreaBaseProps } from '../types';

export function generateSparklineAreaWithId(
  id: string,
  children: ElementChildren<SparklineAreaBaseProps>,
) {
  return children
    ? cloneElement(children as React.ReactElement<SparklineAreaBaseProps>, {
        patternId: id,
      })
    : undefined;
}

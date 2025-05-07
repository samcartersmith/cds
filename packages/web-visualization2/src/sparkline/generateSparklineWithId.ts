import React, { cloneElement } from 'react';
import type { ElementChildren } from '@cbhq/cds-common2/types';

import type { SparklineAreaBaseProps } from './SparklineArea';

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

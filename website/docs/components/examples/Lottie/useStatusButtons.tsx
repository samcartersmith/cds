import React, { useMemo } from 'react';

import { join, LottieStatusAnimationType } from '@cbhq/cds-common';
import { Button, Spacer } from '@cbhq/cds-web';

const statuses = [
  'loading',
  'success',
  'failure',
  'pending',
  'cardSuccess',
] as LottieStatusAnimationType[];

export const useStatusButtons = (
  setStatus: React.Dispatch<React.SetStateAction<LottieStatusAnimationType>>
) => {
  return useMemo(() => {
    // join is a util for adding a separator element
    // between an array of React components
    return join(
      statuses.map(item => (
        <Button key={item} onPress={() => setStatus(item)}>
          {item}
        </Button>
      )),
      <Spacer />
    );
  }, [setStatus]);
};

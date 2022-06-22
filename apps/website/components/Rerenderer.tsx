import React, { ReactNode, useCallback, useState } from 'react';
import { Button } from '@cbhq/cds-web/buttons';
import { VStack } from '@cbhq/cds-web/layout';

export const Rerenderer = ({ children }: { children: ReactNode }) => {
  const [num, setNum] = useState(0);

  const reRender = useCallback(() => {
    setNum((prevNum) => prevNum + 1);
  }, [setNum]);

  return (
    <VStack gap={3} key={num}>
      <Button compact onPress={reRender}>
        Re-render
      </Button>
      {children}
    </VStack>
  );
};

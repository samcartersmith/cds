import React from 'react';

import { HStack, HStackProps } from '../layout/HStack';
import { Box } from '../layout/Box';

export const CardHeader = ({
  media,
  children,
  ...props
}: HStackProps<'div'> & { avatar?: React.ReactNode; media?: React.ReactNode }) => {
  let content = children;
  if (media) {
    content = (
      <>
        {children}
        <Box offsetHorizontal={3} offsetTop={3}>
          {media}
        </Box>
      </>
    );
  }

  return (
    <HStack spacingBottom={3} justifyContent="space-between" alignItems="center" gap={2} {...props}>
      {content}
    </HStack>
  );
};

import React from 'react';

import { Placement } from '@popperjs/core';

import { Button } from '../../buttons/Button';
import { Tooltip } from '../Tooltip';

export const StoryExample = ({
  disabled,
  placement,
}: {
  disabled?: boolean;
  placement?: Placement;
}) => {
  return (
    <Tooltip
      content="This is the content in the tooltip!"
      placement={placement}
      disabled={disabled}
    >
      {(props, ref) => (
        <Button {...props} ref={ref}>
          Button
        </Button>
      )}
    </Tooltip>
  );
};

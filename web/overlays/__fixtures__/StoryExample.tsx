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
      disabled={disabled}
      placement={placement}
    >
      {props => (
        <Button {...props} disabled={disabled}>
          Button
        </Button>
      )}
    </Tooltip>
  );
};

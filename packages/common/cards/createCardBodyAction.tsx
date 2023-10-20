import React, { memo } from 'react';

import type { ButtonBaseProps } from '../types/alpha';

type CreateCardBodyParams<OnPressFn> = {
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps<OnPressFn>>>;
};

export function createCardBodyAction<OnPressFn>({ Button }: CreateCardBodyParams<OnPressFn>) {
  const CardBodyAction = memo(function CardBodyAction({
    children,
    compact = true,
    flush = 'start',
    transparent = true,
    variant = 'primary',
    numberOfLines = 3,
    ...props
  }: ButtonBaseProps<OnPressFn>) {
    return (
      <Button
        noScaleOnPress
        compact={compact}
        flush={flush}
        numberOfLines={numberOfLines}
        transparent={transparent}
        variant={variant}
        {...props}
      >
        {children}
      </Button>
    );
  });

  CardBodyAction.displayName = 'CardBodyAction';
  return CardBodyAction;
}

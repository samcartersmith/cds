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
        compact={compact}
        flush={flush}
        transparent={transparent}
        variant={variant}
        noScaleOnPress
        numberOfLines={numberOfLines}
        {...props}
      >
        {children}
      </Button>
    );
  });

  CardBodyAction.displayName = 'CardBodyAction';
  return CardBodyAction;
}

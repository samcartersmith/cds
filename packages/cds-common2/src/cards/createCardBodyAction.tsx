import React, { memo } from 'react';

import type { ButtonBaseProps } from '../types';

type CreateCardBodyParams<OnPressFn> = {
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps & { onPress?: OnPressFn }>>;
};

/**
 * @deprecated do not use creator patterns in CDS components
 */
export function createCardBodyAction<OnPressFn>({ Button }: CreateCardBodyParams<OnPressFn>) {
  const CardBodyAction = memo(function CardBodyAction({
    children,
    compact = true,
    flush = 'start',
    transparent = true,
    variant = 'primary',
    numberOfLines = 3,
    ...props
  }: ButtonBaseProps) {
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

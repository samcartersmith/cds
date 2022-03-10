import React, { memo } from 'react';

import type { ButtonBaseProps, CdsPlatform } from '../types/alpha';

type CreateCardBodyParams<OnPressFn> = {
  Button: React.ComponentType<ButtonBaseProps<OnPressFn>>;
  platform: CdsPlatform;
};

export function createCardBodyAction<OnPressFn>({
  Button,
  platform,
}: CreateCardBodyParams<OnPressFn>) {
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
        numberOfLines={platform === 'mobile' ? numberOfLines : undefined}
        {...props}
      >
        {children}
      </Button>
    );
  });

  CardBodyAction.displayName = 'CardBodyAction';
  return CardBodyAction;
}

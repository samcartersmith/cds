import React, { memo, useMemo } from 'react';
import type { ButtonBaseProps, SharedProps } from '../types';

export type CardBodyActionBaseProps<T> = ButtonBaseProps &
  SharedProps & { onPress?: T; numberOfLines?: number };

type CreateCardBodyParams<OnPressFn> = {
  Button: React.ComponentType<CardBodyActionBaseProps<OnPressFn>>;
  platform: 'mobile' | 'web';
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
  }: CardBodyActionBaseProps<OnPressFn>) {
    const otherProps = useMemo(() => {
      if (platform === 'mobile') {
        return {
          numberOfLines,
          ...props,
        };
      }
      return props;
    }, [props, numberOfLines]);

    return (
      <Button
        compact={compact}
        flush={flush}
        transparent={transparent}
        variant={variant}
        noScaleOnPress
        {...otherProps}
      >
        {children}
      </Button>
    );
  });

  CardBodyAction.displayName = 'CardBodyAction';
  return CardBodyAction;
}

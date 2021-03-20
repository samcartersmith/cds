import React, { forwardRef, memo } from 'react';

import { InteractableProps, useInteractable } from '../buttons/useInteractable';
import { TextLabel1 } from '../typography/TextLabel1';

export interface TabItemBaseProps {
  label: string;
  value?: string | number;
}

export interface TabItemProps extends TabItemBaseProps, InteractableProps<HTMLButtonElement> {
  active?: boolean;
}

export const TabItem = memo(
  forwardRef<HTMLButtonElement, TabItemProps>(({ label, active, onPress, onHover }, ref) => {
    const colorAlias = active ? 'primaryWash' : 'secondary';
    const { props, className, style } = useInteractable({
      elementType: 'button',
      buttonType: 'button',
      backgroundColor: colorAlias,
      borderColor: colorAlias,
      borderRadius: 'pill',
      scaleOnPress: true,
      onHover,
      onPress,
      ref,
    });

    return (
      <button role="tab" {...props} className={className} style={style}>
        <TextLabel1 spacing={1} as="p" color={active ? 'primary' : 'foreground'}>
          {label}
        </TextLabel1>
      </button>
    );
  })
);

TabItem.displayName = 'TabItem';

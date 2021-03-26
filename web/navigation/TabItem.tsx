import React, { memo } from 'react';

import { InteractableProps, useInteractable } from '../buttons/useInteractable';
import { TextLabel1 } from '../typography/TextLabel1';

export interface TabItemBaseProps {
  label: string;
  value?: string | number;
}

export interface TabItemProps extends TabItemBaseProps, InteractableProps<HTMLButtonElement> {
  active?: boolean;
}

export const TabItem = memo(({ label, active, onPress }: TabItemProps) => {
  const colorAlias = active ? 'primaryWash' : 'secondary';
  const { className, style } = useInteractable({
    backgroundColor: colorAlias,
    borderColor: colorAlias,
    borderRadius: 'pill',
  });

  return (
    <button role="tab" type="button" className={className} style={style} onClick={onPress}>
      <TextLabel1 spacing={1} as="p" color={active ? 'primary' : 'foreground'}>
        {label}
      </TextLabel1>
    </button>
  );
});

TabItem.displayName = 'TabItem';

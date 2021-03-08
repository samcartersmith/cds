import React from 'react';

import { IconName } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { useInteractable, InteractableProps } from '../hooks/useInteractable';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Icon } from '../icons/Icon';
import { getFlexStyles } from '../styles/flexStyles';
import { TextHeadline } from '../typography/Text';
import { sidebarItemStyles } from './navigationStyles';

interface SidebarItemProps<T extends unknown = unknown>
  extends InteractableProps<HTMLAnchorElement> {
  active?: boolean;
  icon?: IconName;
  label?: string;
  renderContainer?: (props: T) => JSX.Element;
}

export const SidebarItem = ({
  renderContainer,
  active,
  icon,
  label,
  onHover,
  onPress,
}: SidebarItemProps) => {
  const color = active ? 'primary' : 'foreground';
  // TODO: Replace with context
  const layout = 'expanded';
  const flexStyles = getFlexStyles({
    flexDirection: 'row',
    alignItems: 'center',
  });
  const spacingStyles = useSpacingStyles({
    spacingHorizontal: 3,
    spacingVertical: 2,
  });

  const { props, className, style } = useInteractable({
    backgroundColor: 'secondary',
    elementType: 'a',
    onHover,
    onPress,
  });

  const sidebarContent = (
    <>
      {icon ? <Icon name={icon} size="m" color={color} /> : null}
      {layout === 'expanded' && (
        <TextHeadline as="p" color={color} spacingStart={3}>
          {label}
        </TextHeadline>
      )}
    </>
  );

  const enhancedProps = {
    ...props,
    style,
    className: cx(flexStyles, spacingStyles, sidebarItemStyles, className),
    children: sidebarContent,
  } as const;

  if (renderContainer) {
    return renderContainer(enhancedProps);
  } else {
    return React.createElement('a', enhancedProps);
  }
};

import React, { forwardRef } from 'react';
import { IconButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useButtonIconSize } from '@cbhq/cds-common/hooks/useButtonIconSize';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';

import { Icon } from '../icons/Icon';
import { getFlexStyles } from '../layout/getFlexStyles';
import { Pressable, PressableProps } from '../system/Pressable';
import { cx } from '../utils/linaria';

import { iconButton } from './buttonStyles';
import { useIconButtonStyles } from './useIconButtonStyles';

export type IconButtonProps = {
  as?: React.ComponentType<React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>>;
} & IconButtonBaseProps &
  PressableProps &
  SharedProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'dangerouslySetInnerHTML'>;

const flexStyles = getFlexStyles({
  alignItems: 'center',
  justifyContent: 'center',
});

export const IconButton = forwardRef(
  (
    {
      as,
      compact = true,
      disabled = false,
      name,
      onPress,
      to,
      transparent,
      variant = 'secondary',
      ...props
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const styles = useIconButtonStyles(compact);
    const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
    const iconSize = useButtonIconSize(compact);

    return (
      <Pressable
        {...props}
        ref={ref}
        as={as}
        background={backgroundColor}
        borderColor={borderColor}
        borderRadius="roundedFull"
        borderWidth="button"
        className={cx(flexStyles, iconButton)}
        disabled={disabled}
        onPress={onPress}
        style={styles}
        to={to}
        transparentWhileInactive={transparent}
      >
        <Icon color={color} name={name} size={iconSize} />
      </Pressable>
    );
  },
);

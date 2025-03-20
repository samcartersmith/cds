import React, { memo } from 'react';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common2';
import { interactableHeight } from '@cbhq/cds-common2/tokens/interactableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common2/types/AvatarBaseProps';

import { Avatar } from '../media';
import { Pressable, type PressableProps } from '../system/Pressable';

export type AvatarButtonProps = PressableProps &
  SharedProps &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'compact'> &
  Pick<AvatarBaseProps, 'alt' | 'src' | 'shape' | 'colorScheme' | 'borderColor' | 'name'>;

export const AvatarButton = memo(function AvatarButton({
  accessibilityLabel,
  feedback = 'light',
  alt,
  src,
  compact,
  shape,
  colorScheme,
  borderColor,
  name,
  ...props
}: AvatarButtonProps) {
  const height = compact ? interactableHeight.compact : interactableHeight.regular;

  return (
    <Pressable
      accessibilityHint={accessibilityLabel ?? alt}
      accessibilityLabel={accessibilityLabel ?? alt}
      background="transparent"
      feedback={feedback}
      {...props}
    >
      <Avatar
        alt={alt}
        borderColor={borderColor}
        colorScheme={colorScheme}
        dangerouslySetSize={height}
        name={name}
        shape={shape}
        src={src}
      />
    </Pressable>
  );
});

import React, { memo } from 'react';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common2';
import { interactableHeight } from '@cbhq/cds-common2/tokens/interactableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common2/types/AvatarBaseProps';

import { Avatar } from '../media';
import { PressableOpacity, PressableProps } from '../system';

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
    <PressableOpacity
      accessibilityHint={accessibilityLabel ?? alt}
      accessibilityLabel={accessibilityLabel ?? alt}
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
    </PressableOpacity>
  );
});

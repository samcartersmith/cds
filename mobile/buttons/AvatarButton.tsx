import React, { memo } from 'react';

import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';

import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';
import { Avatar } from '../media';
import { Pressable, PressableProps } from '../system/Pressable';

type AvatarButtonProps = PressableProps &
  SharedProps &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'disabled' | 'compact'> &
  Pick<AvatarBaseProps, 'alt' | 'src'>;

export const AvatarButton = memo(function AvatarButton({
  accessibilityLabel,
  disabled = false,
  feedback = 'light',
  alt,
  src,
  compact,
  ...props
}: AvatarButtonProps) {
  const { backgroundColor, borderColor } = useButtonVariant('foregroundMuted', true);
  const height = useInteractableHeight(compact);

  return (
    <Pressable
      aria-label={accessibilityLabel}
      transparentWhileInactive
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius="round"
      borderWidth="button"
      feedback={feedback}
      disabled={disabled}
      {...props}
    >
      <Avatar src={src} alt={alt} dangerouslySetSize={height} />
    </Pressable>
  );
});

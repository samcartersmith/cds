import React, { memo } from 'react';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { AvatarBaseProps } from '@cbhq/cds-common/types/AvatarBaseProps';

import { Avatar } from '../media';
import { PressableOpacity, PressableProps } from '../system';

type AvatarButtonProps = PressableProps &
  SharedProps &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'compact'> &
  Pick<AvatarBaseProps, 'alt' | 'src'>;

export const AvatarButton = memo(function AvatarButton({
  accessibilityLabel,
  feedback = 'light',
  alt,
  src,
  compact,
  ...props
}: AvatarButtonProps) {
  const height = useInteractableHeight(compact);

  return (
    <PressableOpacity aria-label={accessibilityLabel} feedback={feedback} {...props}>
      <Avatar src={src} alt={alt} dangerouslySetSize={height} />
    </PressableOpacity>
  );
});

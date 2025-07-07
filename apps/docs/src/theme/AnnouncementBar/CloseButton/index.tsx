import { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/AnnouncementBar/CloseButton';
import { IconButton } from '@cbhq/cds-web/buttons';

export default function AnnouncementBarCloseButton({ onClick }: Props): ReactNode {
  return (
    <IconButton
      compact
      transparent
      aria-label={translate({
        id: 'theme.AnnouncementBar.closeButtonAriaLabel',
        message: 'Close',
        description: 'The ARIA label for close button of announcement bar',
      })}
      name="close"
      onClick={onClick}
    />
  );
}

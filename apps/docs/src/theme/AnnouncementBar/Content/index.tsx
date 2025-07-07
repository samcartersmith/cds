import { type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { Text } from '@cbhq/cds-web/typography';

import styles from './styles.module.css';

export default function AnnouncementBarContent(): ReactNode {
  const { announcementBar } = useThemeConfig();
  const { content } = announcementBar!;
  return (
    <Text
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
      flexGrow={1}
      font="headline"
    />
  );
}

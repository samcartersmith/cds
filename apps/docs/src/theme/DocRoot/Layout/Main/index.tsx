import React from 'react';
import type { Props } from '@theme/DocRoot/Layout/Main';

import styles from './styles.module.css';

export default function DocRootLayoutMain({ children }: Props): JSX.Element {
  return <main className={styles.docMainContainer}>{children}</main>;
}

import React from 'react';
import { VStack } from '@cbhq/cds-web2/layout';

import styles from './style.module.css';

export function MDXSection({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      as="section"
      background="bgAlternate"
      borderRadius={500}
      className={styles.sectionContainer}
      overflow="hidden"
    >
      {children}
    </VStack>
  );
}

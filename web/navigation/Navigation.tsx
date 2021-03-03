import React, { memo } from 'react';

import { cx } from 'linaria';

import * as styles from './navigationStyles';

export type NavigationProps = {
  sidebar?: React.ReactNode;
  navbar?: React.ReactNode;
};

export const Navigation: React.FC<NavigationProps> = memo(({ navbar, sidebar, children }) => {
  return (
    <div className={styles.app}>
      <aside className={cx(styles.sidebar)}>{sidebar}</aside>
      <main className={cx(styles.content)}>
        {navbar}
        {children}
      </main>
    </div>
  );
});

Navigation.displayName = 'Navigation';

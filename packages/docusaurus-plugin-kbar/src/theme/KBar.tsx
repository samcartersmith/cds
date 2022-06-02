import React, { useMemo } from 'react';
import { useHistory } from '@docusaurus/router';
import { KBarAction, KBarProps } from '@theme/KBar';
import defaultActions from '@theme/KBarActions';
import KBarModal from '@theme/KBarModal';
import { KBarProvider } from 'kbar';

export function useFormatKBarActions(actions: KBarAction[]) {
  const history = useHistory();
  return useMemo(() => {
    return actions.map(({ slug, ...item }) => {
      const perform = slug
        ? () => {
            history.push(slug);
          }
        : undefined;

      return {
        ...item,
        perform,
      };
    });
  }, [history, actions]);
}

const KBar = ({ actions = defaultActions, children }: KBarProps) => {
  const formattedActions = useFormatKBarActions(actions);
  return (
    <KBarProvider actions={formattedActions}>
      <KBarModal />
      {children}
    </KBarProvider>
  );
};

export default KBar;

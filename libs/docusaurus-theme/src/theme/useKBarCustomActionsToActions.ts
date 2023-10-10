import { useMemo } from 'react';
import { useHistory } from '@docusaurus/router';
import type { KBarCustomAction } from '@cbhq/docusaurus-plugin-kbar';

import decreasePriorityIfCategory from '../utils/decreasePriorityIfCategory';
import goToLink from '../utils/goToLink';

export default function useKBarCustomActionsToActions(
  actions: KBarCustomAction[],
): Omit<KBarCustomAction, 'slug'>[] {
  const history = useHistory();
  return useMemo(() => {
    return actions.map(decreasePriorityIfCategory).map(({ slug, url, ...item }) => {
      const hasLink = Boolean(slug ?? url);
      const perform = hasLink
        ? () => {
            if (slug) {
              history.push(slug);
            }
            if (url) {
              goToLink(url);
            }
          }
        : undefined;

      return {
        ...item,
        perform,
      };
    });
  }, [history, actions]);
}

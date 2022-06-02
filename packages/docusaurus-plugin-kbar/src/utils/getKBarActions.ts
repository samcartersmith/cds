import type { SidebarItem } from '@docusaurus/plugin-content-docs/lib/sidebars/types';
import type { LoadedVersion } from '@docusaurus/plugin-content-docs/lib/types';
import { Action, createAction } from 'kbar';
import kebabCase from 'lodash/kebabCase';
import uniqBy from 'lodash/uniqBy';
import path from 'path';

type KBarAction = Action & {
  slug?: string;
  illustration?: string;
};

export function getKBarActions(currentVersion: LoadedVersion): KBarAction[] {
  function getDocInfo(id: string) {
    return currentVersion.docs.find((doc) => doc.id === id);
  }

  function getNameForDoc(id: string) {
    return getDocInfo(id)?.title ?? 'Could not match name';
  }

  function getSlugForDoc(id: string) {
    return getDocInfo(id)?.slug;
  }

  function flatten(item: SidebarItem, parent?: string): KBarAction[] {
    if (item.type === 'category') {
      const name = item.label;
      const kebabCaseId = kebabCase(name);
      const id = parent ? path.join(parent, kebabCaseId) : kebabCaseId;
      return item.items.flatMap((next) => {
        return [
          {
            parent,
            name,
            id,
            illustration: item.customProps?.illustration as string,
            subtitle: item.customProps?.description as string,
            priority: item.customProps?.priority as number,
          },
          ...flatten(next, id),
        ];
      });
    }

    if (item.type === 'doc') {
      const name = getNameForDoc(item.id);
      const subtitle = item.customProps?.description as string;
      const priority = item.customProps?.priority as number;
      return [{ parent, id: item.id, name, subtitle, priority }];
    }

    if (item.type === 'ref') {
      const name = getNameForDoc(item.id);
      const subtitle = item.customProps?.description as string;
      const priority = item.customProps?.priority as number;
      return [
        createAction({
          name,
          parent,
          subtitle,
          priority,
        }),
      ];
    }

    if (item.type === 'link') {
      const name = getNameForDoc(item.label);
      const subtitle = item.customProps?.description as string;
      const priority = item.customProps?.priority as number;
      return [
        {
          ...createAction({
            name,
            parent,
            subtitle,
            priority,
          }),
          slug: item.href,
        },
      ];
    }

    const name = '';
    return [
      createAction({
        name,
        parent,
      }),
    ];
  }

  return uniqBy(
    currentVersion.sidebars.docs
      .filter((item) => item.type === 'category')
      .flatMap((item) => flatten(item)),
    'id',
  ).map((item) => {
    const slug = getSlugForDoc(item.id);
    const frontmatter = getDocInfo(item.id)?.frontMatter;
    return {
      section: 'Documentation',
      slug,
      subtitle: frontmatter?.description,
      ...item,
    };
  });
}

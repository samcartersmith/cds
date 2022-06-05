import type { LoadedVersion } from '@docusaurus/plugin-content-docs/lib/types';
import { createAction } from 'kbar';
import kebabCase from 'lodash/kebabCase';
import uniqBy from 'lodash/uniqBy';
import path from 'path';
import type { KBarCustomAction, SidebarItem } from '@cbhq/docusaurus-plugin-kbar';

export function getKBarActions(currentVersion: LoadedVersion): KBarCustomAction[] {
  function getDocInfo(id: string) {
    return currentVersion.docs.find((doc) => doc.id === id);
  }

  function getNameForDoc(id: string) {
    return getDocInfo(id)?.title ?? 'Could not match name';
  }

  function getSlugForDoc(id: string) {
    return getDocInfo(id)?.slug;
  }

  function flatten(item: SidebarItem, parent?: string): KBarCustomAction[] {
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
            illustration: item.customProps?.kbar?.illustration,
            subtitle: item.customProps?.kbar?.description,
            priority: item.customProps?.kbar?.priority,
          },
          ...flatten(next, id),
        ];
      });
    }

    if (item.type === 'doc') {
      const name = getNameForDoc(item.id);
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
      return [{ parent, id: item.id, name, subtitle, priority }];
    }

    if (item.type === 'ref') {
      const name = getNameForDoc(item.id);
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
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
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
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

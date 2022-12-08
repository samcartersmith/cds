import camelCase from 'lodash/camelCase';
import groupBy from 'lodash/groupBy';
import startCase from 'lodash/startCase';
import { Task } from '@cbhq/mono-tasks';
import { writePrettyFile } from '@cbhq/script-utils';

import { ItemShape, Manifest } from './Manifest';

type ChangelogOptions = {
  content: string;
  filePath: string;
};

type UpdateChangelogParams = {
  task: Task;
  manifest: Manifest;
  groupByType?: boolean;
};

function alphabeticalList(prev: string, next: string) {
  return prev.localeCompare(next);
}

function getName(item: ItemShape) {
  return item.name;
}

function mdListItem(item: string) {
  return `- ${item}`;
}

function formatMarkdownItems(items: ItemShape[]) {
  return items.map(getName).sort(alphabeticalList).map(mdListItem);
}

function titleCase(str: string) {
  return startCase(camelCase(str));
}

function getMarkdownForItems(
  itemsSet: Set<ItemShape>,
  params: {
    groupByType?: boolean;
  },
) {
  let markdownItems: string[] = [];
  const items = [...itemsSet];

  if (params.groupByType) {
    Object.entries(groupBy(items, 'type')).forEach(([key, itemsForGroup]) => {
      const markdown = formatMarkdownItems(itemsForGroup);
      markdownItems.push(`#### ${titleCase(key)}`);
      markdownItems = [...markdownItems, ...markdown];
    });
  } else {
    const markdown = formatMarkdownItems(items);
    markdownItems = [...markdown];
  }

  return markdownItems.join(`\n`);
}

const TEMPLATE_START = `<!-- template-start -->`;

export class Changelog {
  private content: string;

  private readonly filePath: string;

  constructor({ content, filePath }: ChangelogOptions) {
    this.content = content;
    this.filePath = filePath;
  }

  public async generateFile({ task, manifest, groupByType }: UpdateChangelogParams) {
    const newContent = [];
    const commandDescription = `Generated with \`yarn nx run ${task.projectName}:${task.targetName}\`\n`;
    const mdParams = { groupByType };

    if (manifest.additions.size > 0) {
      const addedContent = getMarkdownForItems(manifest.additions, mdParams);
      newContent.push(`### 🚀 Added\n ${commandDescription} ${addedContent}`);
    }

    if (manifest.updates.size > 0) {
      const updatedContent = getMarkdownForItems(manifest.updates, mdParams);
      newContent.push(`### 🐞 Updated\n ${commandDescription} ${updatedContent}`);
    }

    if (manifest.deletions.size > 0) {
      const deletedContent = getMarkdownForItems(manifest.deletions, mdParams);
      newContent.push(`### 💥 Deleted\n ${commandDescription} ${deletedContent}`);
    }

    if (newContent.length > 0) {
      this.content = this.content.replaceAll(TEMPLATE_START, '');
      newContent.unshift(TEMPLATE_START);
      newContent.push(this.content);

      await writePrettyFile(this.filePath, newContent.join(`\n`));
    }
  }
}

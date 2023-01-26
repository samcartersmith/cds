import camelCase from 'lodash/camelCase';
import groupBy from 'lodash/groupBy';
import startCase from 'lodash/startCase';
import fs from 'node:fs';
import { logInfo, Task } from '@cbhq/mono-tasks';
import { getAbsolutePath, writePrettyFile } from '@cbhq/script-utils';

import type { ItemShape, Manifest } from './Manifest';

type ChangelogOptions = {
  content: string;
  filePath: string;
};

type UpdateChangelogParams = {
  task: Task;
  manifest: Manifest;
  groupByType?: boolean;
};

type ChangelogTaskOptions = {
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
};

function alphabeticalList(prev: string, next: string) {
  return prev.localeCompare(next);
}

function getName(item: { name: string }) {
  return item.name;
}

function mdListItem(item: string) {
  return `- ${item}`;
}

function formatMarkdownItems(items: { name: string }[]) {
  return items.map(getName).sort(alphabeticalList).map(mdListItem);
}

function titleCase(str: string) {
  return startCase(camelCase(str));
}

function getMarkdownForItems(
  itemsProp: Set<ItemShape> | Map<ItemShape, ItemShape>,
  params: {
    groupByType?: boolean;
  },
) {
  let markdownItems: string[] = [];
  const isMap = itemsProp instanceof Map;
  const items = isMap
    ? [...itemsProp.entries()].map(([prev, next]) => ({
        type: next.type,
        name: `${prev.name} -> ${next.name}`,
      }))
    : [...itemsProp];

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

    if (manifest.renames.size > 0) {
      const updatedContent = getMarkdownForItems(manifest.renames, mdParams);
      newContent.push(`### 🐞 Renames\n ${commandDescription} ${updatedContent}`);
    }

    if (manifest.deletions.size > 0) {
      const deletedContent = getMarkdownForItems(manifest.deletions, mdParams);
      newContent.push(`### 💥 Deleted\n ${commandDescription} ${deletedContent}`);
    }

    if (newContent.length > 0) {
      this.content = this.content.replace(
        `${TEMPLATE_START}`,
        `${TEMPLATE_START}\n\n${newContent.join(`\n`)}`,
      );

      await writePrettyFile(this.filePath, this.content);
    }
  }

  static async loadFromDisk(task: Task<ChangelogTaskOptions>) {
    if (task.options?.changelogFile) {
      const filePath = getAbsolutePath(task, task.options.changelogFile);
      let previousContent = '';
      const exists = fs.existsSync(filePath);

      if (exists) {
        previousContent = await fs.promises.readFile(filePath, 'utf-8');
      } else {
        logInfo('Creating changelog');
        previousContent = ``;
        await writePrettyFile(filePath, previousContent);
      }

      return new Changelog({ filePath, content: previousContent });
    }
    return undefined;
  }
}

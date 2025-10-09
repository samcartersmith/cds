import camelCase from 'lodash/camelCase';
import groupBy from 'lodash/groupBy';
import startCase from 'lodash/startCase';
import fs from 'node:fs';
import { logInfo, Task } from '@cbhq/mono-tasks';
import { getAbsolutePath, writePrettyFile } from '@cbhq/script-utils';

import { generateChangelog } from './generateChangelog';
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
const UNRELEASED_HEADER = `## Unreleased`;

export class Changelog {
  private content: string;

  private readonly filePath: string;

  constructor({ content, filePath }: ChangelogOptions) {
    this.content = content;
    this.filePath = filePath;
  }

  public async generateFile({ task, manifest, groupByType }: UpdateChangelogParams) {
    const insertionPoint = this.content.includes(UNRELEASED_HEADER)
      ? UNRELEASED_HEADER
      : TEMPLATE_START;

    const newContent = generateChangelog({
      newIllustrationSets: [...manifest.additions],
      deletedIllustrationSets: [...manifest.deletions],
      renamedIllustrationSets: [...manifest.renames].map(([previous, next]) => ({
        ...next,
        oldName: previous.name,
      })),
      updatedIllustrationSets: [...manifest.updates],
    });

    if (newContent.length > 0) {
      this.content = this.content.replace(
        `${insertionPoint}`,
        `${insertionPoint}\n\n${newContent}`,
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
        previousContent = `${TEMPLATE_START}`;
        await writePrettyFile(filePath, previousContent);
      }

      return new Changelog({ filePath, content: previousContent });
    }
    return undefined;
  }
}

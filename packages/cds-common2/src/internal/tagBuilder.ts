import startCase from 'lodash/startCase';

import { TagBaseProps } from '../types/TagBaseProps';

type TagPropConfig = {
  intent: TagBaseProps['intent'][];
  colorScheme: TagBaseProps['colorScheme'][];
};
const tagProps: TagPropConfig = {
  intent: ['informational', 'promotional'],
  colorScheme: ['green', 'purple', 'blue', 'yellow', 'red', 'gray'],
};

export const tagMap = tagProps.intent
  .map((intent) => {
    return tagProps.colorScheme.map((colorScheme) => ({
      intent,
      colorScheme,
      children: `${startCase(intent)} ${colorScheme}`,
    }));
  })
  .flat();

export const tagStories = {
  default: [{ children: 'Default tag', colorScheme: 'blue' }],
  all: tagMap,
  wildcard: [
    {
      children: 'Atlanta',
      background: 'blue100',
      color: 'red10',
    },
    {
      children: 'Los Angeles',
      intent: 'promotional',
      background: 'yellow30',
      color: 'purple80',
    },
  ],
  truncated: [
    {
      children: 'Truncate this long long tag',
      colorScheme: 'green',
      maxWidth: 150,
    },
    {
      children: "Don't truncate this long long tag",
      colorScheme: 'green',
    },
  ],
} as const;

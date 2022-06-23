import startCase from 'lodash/startCase';
import { getFigmaAccessToken } from '@cbhq/cds-utils/env';

import { TagBaseProps } from '../types/TagBaseProps';

import { storyBuilder } from './utils/storyBuilder';

const accessToken = getFigmaAccessToken();

const config = {
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    frontier: true,
    scale: 'large',
    spectrum: 'light',
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/9TCCKTO5uxbuJsnrircede/CDS-Design-Intent-Library?node-id=2436%3A34236',
      accessToken,
    },
  },
} as const;

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
      dangerouslySetBackground: 'blue100',
      dangerouslySetColor: 'red10',
    },
    {
      children: 'Los Angeles',
      intent: 'promotional',
      dangerouslySetBackground: 'yellow30',
      dangerouslySetColor: 'purple80',
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

// @ts-expect-error children are dynamic, so I'm not setting them
export const tagBuilder = storyBuilder(config);

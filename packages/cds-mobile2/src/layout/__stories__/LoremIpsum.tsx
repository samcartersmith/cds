import React from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';

import { Text } from '../../typography/Text';

export type LoremIpsumProps = {
  title?: string;
  color?: ThemeVars.Color;
  concise?: boolean;
  repeat?: number;
};

export const LoremIpsum = ({ color, concise, title, repeat }: LoremIpsumProps) => {
  return (
    <>
      <Text font="label1" color={color} paddingBottom={1}>
        {title}
      </Text>
      {concise ? null : (
        <Text color={color} paddingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </Text>
      )}
    </>
  );
};

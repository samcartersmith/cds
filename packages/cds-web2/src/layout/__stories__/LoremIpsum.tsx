import React from 'react';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';

import { type TextBaseProps, Text } from '../../typography/Text';

export type LoremIpsumProps = {
  title?: string;
  color?: TextBaseProps['color'];
  concise?: boolean;
  repeat?: number;
};

export const LoremIpsum = ({ color, concise, title, repeat }: LoremIpsumProps) => {
  return (
    <>
      <Text as="p" color={color} font="label1" paddingBottom={1}>
        {title}
      </Text>
      {concise ? null : (
        <Text as="p" color={color} font="body" paddingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </Text>
      )}
    </>
  );
};

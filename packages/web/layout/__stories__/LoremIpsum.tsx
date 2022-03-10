import React from 'react';
import { PaletteForeground } from '@cbhq/cds-common/types';

import { TextBody, TextLabel1 } from '../../typography';

export type LoremIpsumProps = {
  title?: string;
  color?: PaletteForeground;
  concise?: boolean;
  repeat?: number;
};

export const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla. Nam eu blandit dui, a dignissim mi.';

export const LoremIpsum = ({ color, concise, title, repeat }: LoremIpsumProps) => {
  return (
    <>
      <TextLabel1 as="p" color={color} spacingBottom={1}>
        {title}
      </TextLabel1>
      {concise ? null : (
        <TextBody as="p" color={color} spacingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </TextBody>
      )}
    </>
  );
};

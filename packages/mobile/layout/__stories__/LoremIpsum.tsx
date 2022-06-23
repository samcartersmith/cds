import React from 'react';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { PaletteForeground } from '@cbhq/cds-common/types';

import { TextBody, TextLabel1 } from '../../typography';

export type LoremIpsumProps = {
  title?: string;
  color?: PaletteForeground;
  concise?: boolean;
  repeat?: number;
};

export const LoremIpsum = ({ color, concise, title, repeat }: LoremIpsumProps) => {
  return (
    <>
      <TextLabel1 color={color} spacingBottom={1}>
        {title}
      </TextLabel1>
      {concise ? null : (
        <TextBody color={color} spacingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </TextBody>
      )}
    </>
  );
};

import React from 'react';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';

import { TextBody, TextLabel1 } from '../../typography';

export type LoremIpsumProps = {
  title?: string;
  color?: ThemeVars.Color;
  concise?: boolean;
  repeat?: number;
};

export const LoremIpsum = ({ color, concise, title, repeat }: LoremIpsumProps) => {
  return (
    <>
      <TextLabel1 color={color} paddingBottom={1}>
        {title}
      </TextLabel1>
      {concise ? null : (
        <TextBody color={color} paddingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </TextBody>
      )}
    </>
  );
};

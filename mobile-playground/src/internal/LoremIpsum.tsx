import React from 'react';
import { PaletteForeground } from '@cbhq/cds-common/types';
import { TextLabel1, TextBody } from '@cbhq/cds-mobile/typography';

export type LoremIpsumProps = {
  title: string;
  color?: PaletteForeground;
  concise?: boolean;
};

export const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla. Nam eu blandit dui, a dignissim mi.';

export const LoremIpsum = ({ title, color, concise }: LoremIpsumProps) => {
  return (
    <>
      <TextLabel1 color={color} spacingBottom={1}>
        {title}
      </TextLabel1>
      {concise ? null : (
        <TextBody color={color} spacingBottom={3}>
          {loremIpsum}
        </TextBody>
      )}
    </>
  );
};

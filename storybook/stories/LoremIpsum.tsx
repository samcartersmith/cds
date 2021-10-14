import React from 'react';
import type { TextBaseProps } from '@cbhq/cds-common/types';

export type LoremIpsumProps = {
  title?: string;
  concise?: boolean;
  repeat?: number;
};

export type CreateLoremIpsumProps = {
  TextLabel1: React.ComponentType<TextBaseProps & { as?: string }>;
  TextBody: React.ComponentType<TextBaseProps & { as?: string }>;
};

export const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla. Nam eu blandit dui, a dignissim mi.';

export function createLoremIpsum({ TextLabel1, TextBody }: CreateLoremIpsumProps) {
  const LoremIpsum = ({ title, concise, repeat }: LoremIpsumProps) => {
    return (
      <>
        <TextLabel1 spacingBottom={1} as="p">
          {title}
        </TextLabel1>
        {concise ? null : (
          <TextBody spacingBottom={3} as="p">
            {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
          </TextBody>
        )}
      </>
    );
  };

  return LoremIpsum;
}

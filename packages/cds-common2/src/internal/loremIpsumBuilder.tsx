import React from 'react';

import type { TextBaseProps } from '../types';

export type LoremIpsumProps = {
  title?: string;
  concise?: boolean;
  repeat?: number;
};

export type CreateLoremIpsumProps = {
  TextLabel1: React.ComponentType<React.PropsWithChildren<TextBaseProps & { as?: string }>>;
  TextBody: React.ComponentType<React.PropsWithChildren<TextBaseProps & { as?: string }>>;
};

export const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla. Nam eu blandit dui, a dignissim mi.';

/** @deprecated don't use creator pattern in v8 */
export function loremIpsumBuilder({ TextLabel1, TextBody }: CreateLoremIpsumProps) {
  const LoremIpsum = ({ title, concise, repeat }: LoremIpsumProps) => {
    return (
      <>
        <TextLabel1 as="p" paddingBottom={1} renderEmptyNode={false}>
          {title}
        </TextLabel1>
        {concise ? null : (
          <TextBody as="p" paddingBottom={3}>
            {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
          </TextBody>
        )}
      </>
    );
  };

  return LoremIpsum;
}

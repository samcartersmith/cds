import React, { memo } from 'react';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, Inline, INLINES, MARKS, Text } from '@contentful/rich-text-types';
import { RichText as CBRichText } from '@cb/cms';
import { TextBody, TextDisplay3, TextHeadline } from '@cbhq/cds-web/typography';

import { Link } from '../misc/Link';

import { Divider } from './Divider';

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <TextHeadline as="span">{text}</TextHeadline>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <TextBody as="span" color="foregroundMuted" spacingBottom={2}>
        {children}
      </TextBody>
    ),
    [BLOCKS.HEADING_1]: (_node, children) => (
      <TextDisplay3 as="h3" spacingBottom={4}>
        {children}
      </TextDisplay3>
    ),
    [BLOCKS.HR]: () => <Divider />,
    [INLINES.HYPERLINK]: (node) => {
      const { content, data } = node as Inline;
      const contentCopy = content as Text[];

      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link label={contentCopy?.[0].value} url={data.uri as string} />
      );
    },
  },
};

export const RichText = memo(function RichText({ content }: { content?: Document }) {
  if (!content) return null;

  return <CBRichText content={content} renderOptions={options} />;
});

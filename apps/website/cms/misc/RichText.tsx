import React, { memo, useMemo } from 'react';
import { Options } from '@contentful/rich-text-react-renderer';
import { Block, BLOCKS, Document, Inline, INLINES, MARKS, Text } from '@contentful/rich-text-types';
import CodeBlock from '@theme/CodeBlock';
import { Entry } from 'contentful';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { CMSContent, RichText as CBRichText } from '@cb/cms';
import { VStack } from '@cbhq/cds-web/layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { TextBody, TextHeadline } from '@cbhq/cds-web/typography';
import Heading from '@cbhq/docusaurus-theme/theme/Heading';

import { Divider } from '../components/Divider';

import { Link } from './Link';

export type RichTextProps = {
  content?: Document;
  options?: Partial<Options>;
};

const defaultOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <TextHeadline as="span">{text}</TextHeadline>,
    [MARKS.CODE]: (text) => !!text && <CodeBlock>{text as string | React.ReactElement}</CodeBlock>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <TextBody as="span" color="foregroundMuted">
        {children}
      </TextBody>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <Heading as="h2" spacingBottom={2}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => <Heading as="h3">{children}</Heading>,
    [BLOCKS.HR]: () => <Divider />,
    [INLINES.HYPERLINK]: (node) => {
      const { content, data } = node as Inline;
      const contentCopy = content as Text[];

      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link label={contentCopy?.[0].value} url={data.uri as string} />
      );
    },
    table: (_node, children) => {
      const [tableHeaderRow, ...tableBodyRows] = children as React.ReactElement[];

      return (
        <Table bordered variant="ruled">
          <TableHeader>{tableHeaderRow}</TableHeader>
          <TableBody>{tableBodyRows}</TableBody>
        </Table>
      );
    },
    'table-row': (node, children) => {
      const isHeaderRow =
        (node.content[0].nodeType as 'table-cell' | 'table-header-cell') === 'table-header-cell';

      return (
        <TableRow backgroundColor={isHeaderRow ? 'backgroundAlternate' : undefined}>
          {children as React.ReactElement[]}
        </TableRow>
      );
    },
    'table-header-cell': (_node, children) => {
      return <TableCell>{children as React.ReactElement[]}</TableCell>;
    },
    'table-cell': (_node, children) => {
      return <TableCell>{children as React.ReactElement[]}</TableCell>;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const castedNode = node as Block & { data: { target: Entry<unknown> } };

      return <CMSContent content={castedNode.data.target} />;
    },
  },
};

export const RichText = memo(function RichText({ content, options }: RichTextProps) {
  const renderOptions = useMemo(() => {
    if (options) {
      // clone to avoid mutating original object
      const defaultOptionsCopy = cloneDeep(defaultOptions);
      return merge(defaultOptionsCopy, options);
    }

    return defaultOptions;
  }, [options]);

  if (!content) return null;

  return (
    <VStack gap={3}>
      <CBRichText content={content} renderOptions={renderOptions} />
    </VStack>
  );
});

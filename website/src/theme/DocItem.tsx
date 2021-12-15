import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import { TextDisplay3 } from '@cbhq/cds-web/typography';
import { MDXProvider } from ':cds-website/components/MDXProvider';

// This file forces our right sidebar to render by tricking
// Docusaurus into thinking we have a TOC.
export default function DocItem({
  content,
  ...props
}: {
  content: {
    frontMatter: { title?: string; hide_title?: boolean };
    toc: { id: string; value: string; children: unknown[] }[];
  };
}) {
  // eslint-disable-next-line no-param-reassign
  content.frontMatter.hide_title = true;
  content.toc.push({ id: '', value: '', children: [] });

  return (
    <MDXProvider>
      <TextDisplay3 as="h1" spacingBottom={2}>
        {content.frontMatter.title}
      </TextDisplay3>
      <OriginalDocItem {...props} content={content} />
    </MDXProvider>
  );
}

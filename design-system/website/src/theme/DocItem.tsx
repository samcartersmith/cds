import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';

// This file forces our right sidebar to render by tricking
// Docusaurus into thinking we have a TOC.

export default function DocItem({
  content,
  ...props
}: {
  content: { toc: { id: string; value: string; children: unknown[] }[] };
}) {
  content.toc.push({
    id: '',
    value: '',
    children: [],
  });

  return <OriginalDocItem {...props} content={content} />;
}

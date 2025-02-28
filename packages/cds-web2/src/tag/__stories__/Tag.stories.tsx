import React from 'react';
import { tagBuilder, tagStories } from '@cbhq/cds-common2/internal/tagBuilder';

import { Tag } from '../Tag';

const { build, buildSheet } = tagBuilder(Tag);

export const Default = build(tagStories.default[0]);
export const All = buildSheet(tagStories.all);
export const Wildcard = buildSheet(tagStories.wildcard);
export const Truncated = buildSheet(tagStories.truncated);

// Let's ensure CDS Tag is as performant as the raw HTML setup
const textStyles = {
  padding: 0,
  margin: 0,
  fontSize: 'var(--label1-font-size)',
  lineHeight: 'var(--label1-line-height)',
  fontWeight: 'var(--label1-font-weight)',
  fontFamily: 'var(--label1-font-family)',
};
const TagBaseline = (props: React.ReactElement<HTMLDivElement>) => (
  <div
    {...props}
    style={{
      background: 'rgb(var(--blue0))',
      color: 'rgb(var(--blue60))',
      borderRadius: 4,
      padding: '2px 4px',
    }}
  >
    <span style={textStyles}>HTML tag</span>
  </div>
);
export const HtmlTag = tagBuilder(TagBaseline).build();

export default {
  title: 'Core Components/Tag',
  component: Tag,
};

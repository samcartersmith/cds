
<%
  const hasExample = data.doc.tags.example
%>
import ImportBlock from '@cbhq/docusaurus-plugin-docgen/components/ImportBlock';

import Api from './api.mdx'
<% if (hasExample) { _%>
import Example from './example.mdx'
<% } _%>

### Installation

<ImportBlock name="<%- data.importBlock.name %>" from="<%- data.importBlock.from %>" />

<% if (hasExample) { _%>
<Example />
<% } _%>

### API 

<Api />
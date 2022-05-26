---
title: <%- h.pascalCase(data.doc) %>
hide_title: true
hide_table_of_contents: true
---

<% data.imports.map((mdxImport) => { _%>
import  <%- mdxImport.name %> from '<%- mdxImport.from %>';
<% }) %>

<% data.docsWithSameName.map(({ name, docs }) => { _%>
<% 
const docWithDescription = docs.find(({ doc }) => doc.description)
const description = docWithDescription ? docWithDescription.description : undefined;
%>

## <%- name %>

<% if (description) { _%>
<%- description %>
<% } %>

<Tabs groupId="package">
<% docs.map(({ mdxImport, tab }) => { _%>
<TabItem value="<%- tab.value %>" label="<%- tab.label %>">
<<%- mdxImport.name %> />
</TabItem>
<% }) _%>
</Tabs>
<% }) %>
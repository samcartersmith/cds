---
title: <%- data.title %>
---
<%
 function getTemplates() {
  const items = [];
  if (data.hasIntro) {
    items.push('intro')
  }
   
  if (data.hasDesign) {
    items.push('design');
  }
   
  if (data.hasUsage) {
    items.push('usage')
  }
  if (data.hasA11y) {
    items.push('a11y')
  }
  if (data.hasImplementation) {
    items.push('implementation')
  }
  
  return items;
 };
 const templates = getTemplates().map(item => {
   const pascalCaseName = h.pascalCase(item);
   return { template: item, component: pascalCaseName, toc: `${item}Toc` }
 });
 const engTemplates = templates.filter(item => item.template !== 'design');
%>

<% templates.map((item) => { _%>
import <%- item.component %>, { toc as <%- item.toc %>  } from './_<%- item.template %>.mdx';
<% }) _%>

<Tabs groupId="page" gap={3}>
<% if (data.hasDesign){ _%>
  <TabItem value="guidelines" label="Guidelines" toc={designToc}>
    <Design />
  </TabItem>
<% } _%>
  <TabItem value="implementation" label="Implementation" toc={[
  <% engTemplates.map((item) => { _%>
    ...<%- item.toc %>,
  <% }) _%>
  ]}>
  <% if (data.docs.length === 2){ _%>
  <Tabs groupId="platform" variant="secondary">
    <% data.docs.map(({ importBlock, tab }) => { _%>
      <TabItem value="<%- tab.value %>" label="<%- tab.label %>">
        <ImportBlock name="<%- importBlock.name %>" from="<%- importBlock.path %>" />
      </TabItem>
  <% }) _%>
  </Tabs>
  <% } else { _%>
    <% data.docs.map(({ importBlock }) => { _%>
      <ImportBlock name="<%- importBlock.name %>" from="<%- importBlock.path %>" />
    <% }) _%>
  <% } _%>
  <% engTemplates.map((item) => { _%>
    <<%- item.component %> />
  <% }) _%>
  </TabItem>
</Tabs>

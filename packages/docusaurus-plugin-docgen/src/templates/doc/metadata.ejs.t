<% if (data.docs.length > 1){ _%>
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
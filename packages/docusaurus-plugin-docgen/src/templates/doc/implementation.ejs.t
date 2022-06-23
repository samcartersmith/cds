<% data.docs.map(({partial}) => { _%>
import <%- partial.name %> from '<%- partial.path %>';
<% }) _%>

## Props

<% if (data.docs.length > 1){ _%>
<Tabs groupId="platform" variant="secondary">
<% data.docs.map(({ partial, tab }) => { _%>
<TabItem value="<%- tab.value %>" label="<%- tab.label %>">
<<%- partial.name %> />
</TabItem>
<% }) _%>
</Tabs>
<% } else { _%>
<% data.docs.map(({ partial }) => { _%>
<<%- partial.name %> />
<% }) _%>
<% } _%>

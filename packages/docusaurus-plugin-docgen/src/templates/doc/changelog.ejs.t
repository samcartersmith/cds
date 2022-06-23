<% data.changelogPartials.map(({changelogPartial}) => { _%>
import <%- changelogPartial.name %> from '<%- changelogPartial.path %>';
<% }) _%>

## Changelog

<% if (data.changelogPartials.length > 1){ _%>
<Tabs groupId="platform" variant="secondary">
<% data.changelogPartials.map(({ changelogPartial, tab }) => { _%>
<TabItem value="<%- tab.value %>" label="<%- tab.label %>">
<<%- changelogPartial.name %> />
</TabItem>
<% }) _%>
</Tabs>
<% } else { _%>
<% data.changelogPartials.map(({ changelogPartial }) => { _%>
<<%- changelogPartial.name %> />
<% }) _%>
<% } _%>

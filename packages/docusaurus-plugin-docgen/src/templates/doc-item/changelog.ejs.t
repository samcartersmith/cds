import { ChangelogTOCUpdater } from '@theme/ChangelogTOCManager';
import ChangelogList from '@theme/ChangelogList';
import ChangelogListCell from '@theme/ChangelogListCell';

<ChangelogList>
<% data.map((item) => { _%>
<ChangelogListCell id="<%- item.tocDate %>" title="<%- item.commit %>" description="<%- item.author %>" detail="<%- item.sha %>" subdetail="<%- item.date %>" to="<%- item.commitUrl %>" />
<% }) _%>
</ChangelogList>

<ChangelogTOCUpdater toc={require('./toc-changelog')} />
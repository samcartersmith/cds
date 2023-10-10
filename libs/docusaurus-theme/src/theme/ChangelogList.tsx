import React, { memo } from 'react';
import type { ChangelogListProps } from '@theme/ChangelogList';
import { VStack } from '@cbhq/cds-web/layout';

const ChangelogList = memo(function ChangelogList(props: ChangelogListProps) {
  return <VStack offsetHorizontal={3} dangerouslySetClassName="changelog-list" {...props} />;
});

ChangelogList.displayName = 'ChangelogList';

export default ChangelogList;

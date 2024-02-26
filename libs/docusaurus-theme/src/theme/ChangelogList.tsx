import React, { memo } from 'react';
import type { ChangelogListProps } from '@theme/ChangelogList';
import { VStack } from '@cbhq/cds-web/layout';

const ChangelogList = memo(function ChangelogList(props: ChangelogListProps) {
  return <VStack className="changelog-list" offsetHorizontal={3} {...props} />;
});

ChangelogList.displayName = 'ChangelogList';

export default ChangelogList;

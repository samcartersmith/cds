import React, { memo, useContext } from 'react';
import { HStack } from '@cbhq/cds-web/layout';
import { TextLabel1 } from '@cbhq/cds-web/typography';

import DocgenProjectContext from './DocgenProjectContext';

const DocgenActiveProjectVersion = memo(function DocgenActiveProjectVersion() {
  const { project } = useContext(DocgenProjectContext);

  return project?.version ? (
    <HStack gap={1}>
      <TextLabel1 as="span" transform="none">
        Version:
      </TextLabel1>
      <TextLabel1 as="span" mono>
        {project.version}
      </TextLabel1>
    </HStack>
  ) : null;
});

export default DocgenActiveProjectVersion;

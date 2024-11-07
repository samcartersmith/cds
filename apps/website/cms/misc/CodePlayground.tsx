import React, { memo } from 'react';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from '@contentful/rich-text-types';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import Playground from '@cbhq/docusaurus-theme/theme/Playground';

import { usePageContext } from '../pages/PageContext';

type CodePlaygroundProps = {
  code: Document;
  readOnly?: boolean;
  editorStartsExpanded?: boolean;
};

export const CodePlayground = memo(
  ({ code, readOnly, editorStartsExpanded }: CodePlaygroundProps) => {
    const { scope } = usePageContext();
    return (
      // <Playground /> has spacing bottom 3 + gap 1, offset it to have consistent spacing
      <VStack offsetBottom={4}>
        <Playground
          disabled={readOnly}
          editorStartsExpanded={editorStartsExpanded}
          hidePreview={readOnly}
          scope={scope}
        >
          {documentToPlainTextString(code, '\n')}
        </Playground>
      </VStack>
    );
  },
);

CodePlayground.displayName = 'CodePlayground';

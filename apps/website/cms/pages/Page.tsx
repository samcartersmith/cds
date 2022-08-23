import React, { memo, ReactElement } from 'react';
import { TOCItems } from '@theme/createTOCManager';
import { CMSProvider, ComponentMapValue } from '@cb/cms';
import { Box } from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders';

import { RichText } from '../components/RichText';
import { Link } from '../misc/Link';
import { MediaAsset } from '../misc/MediaAsset';
import { TextBlock } from '../misc/TextBlock';
import { CodeExample } from '../modules/CodeExample';
import { DoDont } from '../modules/DoDont';
import { MediaContent } from '../modules/MediaContent';
import { Overview } from '../modules/Overview';
import { useComposePage } from '../useComposePage';

import { ComponentPage, ComponentPageFields } from './ComponentPage';
import { FlexPage, FlexPageFields } from './FlexPage';

type DocgenProps = {
  element: ReactElement;
  toc?: TOCItems;
};

export type CMSProps = {
  changelog?: DocgenProps;
  propsTable?: DocgenProps;
  metadata?: DocgenProps;
  /**
   * Fallback component when CMS response is not available
   */
  fallback?: ReactElement;
};

// keys are content IDs from contentful
const componentsMap = {
  miscLink: Link,
  miscMediaAsset: MediaAsset,
  miscTextBlock: TextBlock,
  moduleCodeExample: CodeExample,
  moduleDoDont: DoDont,
  moduleMediaContent: MediaContent,
  moduleOverview: Overview,
  miscRichText: RichText,
} as unknown as Record<string, ComponentMapValue>;

export const Page = memo(function CMS({ fallback, ...props }: CMSProps) {
  const { pageData, isLoading, space, handleError } = useComposePage();

  if (isLoading) {
    return (
      <Box alignItems="center" justifyContent="center">
        <Spinner size={5} color="primary" />
      </Box>
    );
  }

  // no API response
  if (!pageData?.content?.fields) {
    if (fallback) {
      return fallback;
    }

    return null;
  }

  const renderPage = () => {
    switch (pageData.content.sys.contentType.sys.id) {
      case 'pageFlexDocumentation':
        return <FlexPage content={pageData.content.fields as FlexPageFields} />;
      case 'pageDesignDocumentation':
        return (
          <ComponentPage content={pageData.content.fields as ComponentPageFields} {...props} />
        );
      default:
        return null;
    }
  };

  return (
    <CMSProvider spaceId={space} locale="en" onError={handleError} components={componentsMap}>
      {renderPage()}
    </CMSProvider>
  );
});

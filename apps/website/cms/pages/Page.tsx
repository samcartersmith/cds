import React, { memo, ReactElement } from 'react';
import { TOCItems } from '@theme/createTOCManager';
import { CMSProvider } from '@cb/cms';
import { Box } from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders';
import { TextTitle2 } from '@cbhq/cds-web/typography';

import { componentsMap } from '../componentsMap';
import { useComposePage } from '../useComposePage';

import { ComponentPage, ComponentPageFields } from './ComponentPage';
import { FlexPage, FlexPageFields } from './FlexPage';

type DocgenProps = {
  element: ReactElement;
  toc?: TOCItems;
};

export type CMSProps = {
  propsTable?: DocgenProps;
  metadata?: DocgenProps;
  intro?: DocgenProps;
  /**
   * Fallback component when CMS response is not available
   */
  fallback?: ReactElement;
};

export const Page = memo(function CMS({ fallback, ...props }: CMSProps) {
  const { pageData, isLoading, space, handleError } = useComposePage();

  if (isLoading) {
    return (
      <Box alignItems="center" justifyContent="center">
        <Spinner color="primary" size={5} />
      </Box>
    );
  }

  // no API response
  if (!pageData?.content?.fields) {
    if (fallback) {
      return fallback;
    }

    return <TextTitle2 as="h2">Nothing here yet, please check back later.</TextTitle2>;
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
    <CMSProvider components={componentsMap} locale="en" onError={handleError} spaceId={space}>
      {renderPage()}
    </CMSProvider>
  );
});

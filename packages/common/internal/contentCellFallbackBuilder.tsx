import React from 'react';

import type { ContentCellFallbackProps } from '../types';

export function contentCellFallbackBuilder(
  ContentCellFallback: React.ComponentType<ContentCellFallbackProps>,
) {
  const Fallbacks = () => {
    return (
      <>
        <ContentCellFallback title disableRandomRectWidth />
        <ContentCellFallback title description disableRandomRectWidth />
        <ContentCellFallback title meta disableRandomRectWidth />
        <ContentCellFallback title subtitle disableRandomRectWidth />
        <ContentCellFallback title meta description disableRandomRectWidth />
        <ContentCellFallback title description meta subtitle disableRandomRectWidth />
        <ContentCellFallback title media="icon" disableRandomRectWidth />
        <ContentCellFallback title description media="asset" disableRandomRectWidth />
        <ContentCellFallback title meta media="image" disableRandomRectWidth />
        <ContentCellFallback title subtitle media="avatar" disableRandomRectWidth />
        <ContentCellFallback title meta description media="icon" disableRandomRectWidth />
        <ContentCellFallback title description meta subtitle media="asset" disableRandomRectWidth />
        <ContentCellFallback title description meta subtitle media="asset" rectWidthVariant={0} />
        <ContentCellFallback title description meta subtitle media="asset" rectWidthVariant={1} />
        <ContentCellFallback title description meta subtitle media="asset" rectWidthVariant={2} />
      </>
    );
  };

  return {
    Fallbacks,
  };
}

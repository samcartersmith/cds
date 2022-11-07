import React from 'react';

import type { ContentCellFallbackProps } from '../types';

export function contentCellFallbackBuilder(
  ContentCellFallback: React.ComponentType<
    ContentCellFallbackProps & { dangerouslySetIterations?: number }
  >,
) {
  /** This tests that the title field can load for longer than 10s */
  const DangerouslySetIterationsTitle = () => {
    return <ContentCellFallback disableRandomRectWidth title dangerouslySetIterations={15} />;
  };

  /** This tests that the media field can load for longer than 10s */
  const DangerouslySetIterationsMedia = () => {
    return (
      <ContentCellFallback disableRandomRectWidth media="avatar" dangerouslySetIterations={15} />
    );
  };

  /**
   * This tests that the meta and title field can load for longer than 10s.
   * Meta field cannot be by itself. That is why it is paired with the title
   * */
  const DangerouslySetIterationsMetaTitle = () => {
    return <ContentCellFallback disableRandomRectWidth title meta dangerouslySetIterations={15} />;
  };

  /** This tests that the description field can load for longer than 10s */
  const DangerouslySetIterationsDescription = () => {
    return <ContentCellFallback disableRandomRectWidth description dangerouslySetIterations={15} />;
  };

  /** A test case to ensure that all combinations of fallback props works  */
  const DangerouslySetIterationsAll = () => {
    return (
      <ContentCellFallback
        disableRandomRectWidth
        media="icon"
        title
        meta
        description
        dangerouslySetIterations={15}
      />
    );
  };

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
    DangerouslySetIterationsTitle,
    DangerouslySetIterationsMedia,
    DangerouslySetIterationsMetaTitle,
    DangerouslySetIterationsDescription,
    DangerouslySetIterationsAll,
  };
}

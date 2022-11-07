import React from 'react';

import type { ListCellFallbackProps } from '../types';

export function listCellFallbackBuilder(
  ListCellFallback: React.ComponentType<
    ListCellFallbackProps & { dangerouslySetIterations?: number }
  >,
) {
  /** This tests that the title field can load for longer than 10s */
  const DangerouslySetIterationsTitle = () => {
    return <ListCellFallback title disableRandomRectWidth dangerouslySetIterations={15} />;
  };

  /** This tests that the media field can load for longer than 10s */
  const DangerouslySetIterationsMedia = () => {
    return <ListCellFallback media="icon" disableRandomRectWidth dangerouslySetIterations={15} />;
  };

  /** This tests that the description field can load for longer than 10s */
  const DangerouslySetIterationsDescription = () => {
    return <ListCellFallback description disableRandomRectWidth dangerouslySetIterations={15} />;
  };

  /** This tests that the subdetails field can load for longer than 10s */
  const DangerouslySetIterationsSubdetail = () => {
    return <ListCellFallback subdetail disableRandomRectWidth dangerouslySetIterations={15} />;
  };

  /** This tests that the details field can load for longer than 10s */
  const DangerouslySetIterationsDetail = () => {
    return <ListCellFallback detail disableRandomRectWidth dangerouslySetIterations={15} />;
  };

  /** A test case to ensure that all fields have dangerouslySetIterations applied  */
  const DangerouslySetIterationsAll = () => {
    return (
      <ListCellFallback
        disableRandomRectWidth
        title
        description
        subdetail
        detail
        dangerouslySetIterations={15}
      />
    );
  };

  const Fallbacks = () => {
    return (
      <>
        <ListCellFallback title disableRandomRectWidth />
        <ListCellFallback title description disableRandomRectWidth />
        <ListCellFallback title detail disableRandomRectWidth />
        <ListCellFallback title subdetail disableRandomRectWidth />
        <ListCellFallback title detail description disableRandomRectWidth />
        <ListCellFallback title description detail subdetail disableRandomRectWidth />
        <ListCellFallback title media="icon" disableRandomRectWidth />
        <ListCellFallback title description media="asset" disableRandomRectWidth />
        <ListCellFallback title detail media="image" disableRandomRectWidth />
        <ListCellFallback title subdetail media="avatar" disableRandomRectWidth />
        <ListCellFallback title detail description media="icon" disableRandomRectWidth />
        <ListCellFallback title description detail subdetail media="asset" disableRandomRectWidth />
        <ListCellFallback title description detail subdetail media="asset" rectWidthVariant={0} />
        <ListCellFallback title description detail subdetail media="asset" rectWidthVariant={1} />
        <ListCellFallback title description detail subdetail media="asset" rectWidthVariant={2} />
        <ListCellFallback compact title disableRandomRectWidth />
        <ListCellFallback compact title description disableRandomRectWidth />
        <ListCellFallback compact title detail disableRandomRectWidth />
        <ListCellFallback compact title subdetail disableRandomRectWidth />
        <ListCellFallback compact title detail description disableRandomRectWidth />
        <ListCellFallback compact title description detail subdetail disableRandomRectWidth />
        <ListCellFallback compact title media="icon" disableRandomRectWidth />
        <ListCellFallback compact title description media="asset" disableRandomRectWidth />
        <ListCellFallback compact title detail media="image" disableRandomRectWidth />
        <ListCellFallback compact title subdetail media="avatar" disableRandomRectWidth />
        <ListCellFallback compact title detail description media="icon" disableRandomRectWidth />
        <ListCellFallback
          compact
          title
          description
          detail
          subdetail
          media="asset"
          disableRandomRectWidth
        />
        <ListCellFallback
          compact
          title
          description
          detail
          subdetail
          media="asset"
          rectWidthVariant={0}
        />
        <ListCellFallback
          compact
          title
          description
          detail
          subdetail
          media="asset"
          rectWidthVariant={1}
        />
        <ListCellFallback
          compact
          title
          description
          detail
          subdetail
          media="asset"
          rectWidthVariant={2}
        />
      </>
    );
  };

  return {
    Fallbacks,
    DangerouslySetIterationsTitle,
    DangerouslySetIterationsMedia,
    DangerouslySetIterationsDescription,
    DangerouslySetIterationsSubdetail,
    DangerouslySetIterationsDetail,
    DangerouslySetIterationsAll,
  };
}

import React from 'react';

import type { ListCellFallbackProps } from '../types';

export function listCellFallbackBuilder(
  ListCellFallback: React.ComponentType<ListCellFallbackProps>,
) {
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
  };
}

import React, { memo } from 'react';

export type EmbeddedFields = {
  title: string;
  link: string;
  width?: string;
  height: string;
};

export const Embedded = memo(function Embedded({
  link,
  title,
  width = '100%',
  height,
}: EmbeddedFields) {
  return <iframe width={width} height={height} src={link} allowFullScreen title={title} />;
});

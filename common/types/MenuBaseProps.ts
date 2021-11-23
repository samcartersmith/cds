import React from 'react';

type OffsetConfigProps = {
  label: boolean;
  compact: boolean;
};

export type MenuBaseProps = {
  children: React.ReactElement[] | React.ReactElement;
  parentRef?: React.RefObject<HTMLElement | null>;
  offsetConfig?: OffsetConfigProps;
};

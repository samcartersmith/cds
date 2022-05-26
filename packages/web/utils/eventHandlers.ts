import { MouseEvent } from 'react';

export const handlePreventPropagation = (event: MouseEvent<HTMLDivElement>) =>
  event.stopPropagation();

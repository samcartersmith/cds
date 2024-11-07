import { useMemo, useState } from 'react';
import { usePopper as useExternalPopper } from 'react-popper';
import { Options as PopperOptions } from '@popperjs/core';

import { useSpacingValue } from '../../hooks/useSpacingValue';

import { PopoverContentPositionConfig } from './PopoverProps';

export const usePopper = ({
  placement,
  skid,
  gap,
  offsetGap,
  strategy,
}: PopoverContentPositionConfig) => {
  const [subject, setSubject] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const calculatedSkid = useSpacingValue(skid ?? 0);
  const calculatedGap = useSpacingValue(gap ?? 0);
  const getOffsetGap = offsetGap && calculatedGap - offsetGap;

  const popperOptions: Partial<PopperOptions> = useMemo(
    () => ({
      placement,
      strategy,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [calculatedSkid, getOffsetGap ?? calculatedGap],
          },
        },
      ],
    }),
    [placement, strategy, calculatedSkid, getOffsetGap, calculatedGap],
  );

  const { styles: popperStyles, attributes: popperAttributes } = useExternalPopper(
    subject,
    popper,
    popperOptions,
  );

  return {
    popper,
    subject,
    setSubject,
    setPopper,
    popperStyles,
    popperAttributes,
  };
};

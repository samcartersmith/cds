import { useMemo, useState } from 'react';
import { usePopper as useExternalPopper } from 'react-popper';
import { Options as PopperOptions } from '@popperjs/core';

import { PositionedOverlayPlacement } from './PositionedOverlayProps';

const DEFAULT_POPPER_GAP = 0;
const DEFAULT_POPPER_SKID = 0;

type UsePopperParams = {
  placement: PositionedOverlayPlacement;
  skid?: number;
  gap?: number;
};

export const usePopper = ({
  placement,
  skid = DEFAULT_POPPER_GAP,
  gap = DEFAULT_POPPER_SKID,
}: UsePopperParams) => {
  const [subject, setSubject] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  const popperOptions: Partial<PopperOptions> = useMemo(() => {
    return {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [skid, gap],
          },
        },
      ],
    };
  }, [gap, placement, skid]);

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

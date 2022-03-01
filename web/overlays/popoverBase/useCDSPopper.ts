import { Options as PopperOptions } from '@popperjs/core';
import { useLayoutEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { PopoverBasePlacement } from './PopoverBaseProps';

const DEFAULT_POPPER_GAP = 0;
const DEFAULT_POPPER_SKID = 0;

type UseCDSPopperParams = {
  placement: PopoverBasePlacement;
  skid?: number;
  gap?: number;
};

export const useCDSPopper = ({
  placement,
  skid = DEFAULT_POPPER_GAP,
  gap = DEFAULT_POPPER_SKID,
}: UseCDSPopperParams) => {
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

  const {
    styles: popperStyles,
    attributes: popperAttributes,
    update,
  } = usePopper(subject, popper, popperOptions);

  useLayoutEffect(() => {
    void update?.();
  }, [update]);

  return {
    popper,
    subject,
    setSubject,
    setPopper,
    popperStyles,
    popperAttributes,
  };
};

import { useMemo, useState } from 'react';
import { usePopper as useExternalPopper } from 'react-popper';
import { Options as PopperOptions, Placement } from '@popperjs/core';
import { SpacingScale } from '@cbhq/cds-common/types';

import { useSpacingValue } from '../../hooks/useSpacingValue';

const DEFAULT_POPPER_GAP = 0;
const DEFAULT_POPPER_SKID = 0;

type UsePopperParams = {
  placement: Placement;
  skid?: SpacingScale;
  gap?: SpacingScale;
};

export const usePopper = ({
  placement,
  skid = DEFAULT_POPPER_GAP,
  gap = DEFAULT_POPPER_SKID,
}: UsePopperParams) => {
  const [subject, setSubject] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const calculatedSkid = useSpacingValue(skid);
  const calculatedGap = useSpacingValue(gap);

  const popperOptions: Partial<PopperOptions> = useMemo(() => {
    return {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [calculatedSkid, calculatedGap],
          },
        },
      ],
    };
  }, [calculatedGap, placement, calculatedSkid]);

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

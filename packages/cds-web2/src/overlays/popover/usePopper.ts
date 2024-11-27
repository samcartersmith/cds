import { useMemo, useState } from 'react';
import { usePopper as useExternalPopper } from 'react-popper';
import { Options as PopperOptions } from '@popperjs/core';

import * as vars from '../../styles/vars';

import { PopoverContentPositionConfig } from './PopoverProps';
// import { getComputedStyleForSelector } from '../../utils/getComputedStyleForSelector'

// const THEME_SELECTOR = '[class^="cds-theme-"]'

export const usePopper = ({
  placement,
  skid = 0,
  gap = 0,
  offsetGap,
  strategy,
}: PopoverContentPositionConfig) => {
  const [subject, setSubject] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  // const [computedSkid, setComputedSkid] = useState<number>(0)
  // const [computedGap, setComputedGap] = useState<number>(0)

  // hardcoded to default space values for now
  const computedSkid = parseInt(vars.space[skid.toString() as keyof typeof vars.space]);
  const computedGap = parseInt(vars.space[gap.toString() as keyof typeof vars.space]);
  const getOffsetGap = offsetGap && gap - offsetGap;

  const popperOptions: Partial<PopperOptions> = useMemo(
    () => ({
      placement,
      strategy,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [computedSkid, getOffsetGap ?? computedGap],
          },
        },
      ],
    }),
    [placement, strategy, computedSkid, getOffsetGap, computedGap],
  );

  const { styles: popperStyles, attributes: popperAttributes } = useExternalPopper(
    subject,
    popper,
    popperOptions,
  );

  // useEffect(() => {
  //   const themedDiv = document.querySelector(THEME_SELECTOR)
  //   if (themedDiv) {
  //     const skidValue = getComputedStyleForSelector({
  //       selector: THEME_SELECTOR,
  //       property: `--space-${skid}`,
  //       fallback: vars.space[skid.toString() as keyof typeof vars.space],
  //     })
  //     const gapValue = getComputedStyleForSelector({
  //       selector: THEME_SELECTOR,
  //       property: `--space-${gap}`,
  //       fallback: vars.space[gap.toString() as keyof typeof vars.space],
  //     })
  //     setComputedSkid(parseInt(skidValue))
  //     setComputedGap(parseInt(gapValue))
  //   }
  // }, [gap, skid])

  return {
    popper,
    subject,
    setSubject,
    setPopper,
    popperStyles,
    popperAttributes,
  };
};

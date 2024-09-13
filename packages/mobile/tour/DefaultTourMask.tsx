import React, { memo, useEffect, useMemo, useState } from 'react';
import { Defs, Mask, Rect as NativeRect, Svg } from 'react-native-svg';
import { usePaletteConfig } from '@cbhq/cds-common';
import { type Rect, defaultRect } from '@cbhq/cds-common/types/Rect';

import { usePaletteValueToRgbaString } from '../color/usePaletteValueToRgbaString';
import { useSpacingValue } from '../hooks/useSpacingValue';
import { Box } from '../layout';

import { type TourMaskComponentProps } from './Tour';

export const DefaultTourMask = memo(
  ({ activeTourStepTarget, padding, borderRadius = 12 }: TourMaskComponentProps) => {
    const [rect, setRect] = useState<Rect>(defaultRect);
    const paletteConfig = usePaletteConfig();
    const overlayFillRgba = usePaletteValueToRgbaString(paletteConfig.backgroundOverlay);
    const defaultPadding = useSpacingValue(2);

    // Convert string padding to number and fallback to default padding value
    const paddingValue = Number.isNaN(Number(padding)) ? defaultPadding : Number(padding);
    const maskStyle = useMemo(
      () => ({
        width: rect.width + paddingValue,
        height: rect.height + paddingValue,
        x: rect.x - 0.5 * paddingValue,
        y: rect.y - 0.5 * paddingValue,
      }),
      [rect, paddingValue],
    );

    useEffect(() => {
      activeTourStepTarget?.measureInWindow((x, y, width, height) =>
        setRect({ x, y, width, height }),
      );
    }, [activeTourStepTarget]);

    return (
      <Box height="100%" width="100%">
        <Svg renderToHardwareTextureAndroid shouldRasterizeIOS height="100%" width="100%">
          <Defs>
            <Mask id="tourOverlayMask">
              <NativeRect fill="#fff" height="100%" width="100%" />
              <NativeRect rx={borderRadius} ry={borderRadius} {...maskStyle} />
            </Mask>
          </Defs>
          <NativeRect
            fill={overlayFillRgba}
            height="100%"
            mask="url(#tourOverlayMask)"
            width="100%"
          />
        </Svg>
      </Box>
    );
  },
);

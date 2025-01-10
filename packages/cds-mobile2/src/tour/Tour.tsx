import React, { useCallback, useEffect, useRef } from 'react';
import { Modal, View } from 'react-native';
import {
  type AutoPlacementOptions,
  type OffsetOptions,
  type ShiftOptions,
} from '@floating-ui/core';
import {
  arrow as arrowMiddleware,
  autoPlacement,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-native';
import { animated, config as springConfig, useSpring } from '@react-spring/native';
import { SharedProps } from '@cbhq/cds-common2';
import { useRefMap } from '@cbhq/cds-common2/hooks/useRefMap';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common2/overlays/OverlayContentContext';
import { RefMapContext } from '@cbhq/cds-common2/system/RefMapContext';
import { TourContext } from '@cbhq/cds-common2/tour/TourContext';
import {
  TourOptions,
  TourStepArrowComponent,
  TourStepValue,
  useTour,
} from '@cbhq/cds-common2/tour/useTour';
import { SharedAccessibilityProps } from '@cbhq/cds-common2/types/SharedAccessibilityProps';

import { useTheme } from '../hooks/useTheme';

import { DefaultTourMask } from './DefaultTourMask';
import { DefaultTourStepArrow } from './DefaultTourStepArrow';

const overlayContentContextValue: OverlayContentContextValue = {
  isTour: true,
};

export type TourMaskComponentProps = {
  /**
   * The active TourStep's target element.
   */
  activeTourStepTarget: View;
  /**
   * Padding to add around the edges of the TourOverlay's content mask.
   */
  padding?: string | number;
  /**
   * Corner radius for the TourOverlay's content mask. Uses SVG rect element's `rx` and `ry`
   * attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  borderRadius?: string | number;
};

export type TourMaskComponent = React.FC<TourMaskComponentProps>;

export type TourProps = TourOptions & {
  children?: React.ReactNode;
  /**
   * The Component to render as a tour overlay and mask.
   * @default DefaultTourMask
   */
  TourMaskComponent?: TourMaskComponent;
  /**
   * The default Component to render for each TourStep arrow element.
   * @default DefaultTourStepArrow
   */
  TourStepArrowComponent?: TourStepArrowComponent;
  /**
   * Hide overlay when tour is active
   * @default false
   */
  hideOverlay?: boolean;
  /**
   * Configures `@floating-ui` offset options for Tour Step component. See https://floating-ui.com/docs/offset.
   */
  tourStepOffset?: OffsetOptions;
  /**
   * Configures `@floating-ui` autoPlacement options for Tour Step component. See https://floating-ui.com/docs/autoplacement.
   * @default 24
   */
  tourStepAutoPlacement?: AutoPlacementOptions;
  /**
   * Configures `@floating-ui` shift options for Tour Step component. See https://floating-ui.com/docs/shift.
   */
  tourStepShift?: ShiftOptions;
  /**
   * Padding to add around the edges of the TourMask's content mask.
   */
  tourMaskPadding?: string | number;
  /**
   * Corner radius for the TourMask's content mask. Uses SVG rect element's `rx` and `ry`
   * attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  tourMaskBorderRadius?: string | number;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy' | 'id'> &
  SharedProps;

export const Tour = ({
  steps,
  activeTourStep,
  tourStepOffset = 24,
  tourStepShift,
  onChange,
  TourMaskComponent = DefaultTourMask,
  TourStepArrowComponent = DefaultTourStepArrow,
  children,
  hideOverlay,
  tourMaskPadding,
  tourMaskBorderRadius,
  accessibilityLabel,
  accessibilityLabelledBy,
  id,
  testID,
}: TourProps) => {
  const theme = useTheme();
  const refMap = useRefMap<View>();
  const tourStepArrowRef = useRef<View>(null);
  const RenderedTourStep = activeTourStep?.Component;
  const RenderedTourStepArrow = activeTourStep?.ArrowComponent ?? TourStepArrowComponent;
  const activeTourStepTarget = activeTourStep ? refMap.getRef(activeTourStep.id) : null;
  const defaultTourStepOffset = theme.space[3];
  const defaultTourStepShiftPadding = theme.space[4];

  const {
    refs,
    floatingStyles,
    placement,
    middlewareData: { arrow },
  } = useFloating({
    middleware: [
      autoPlacement(),
      offset(tourStepOffset ?? defaultTourStepOffset),
      shift(tourStepShift ?? { padding: defaultTourStepShiftPadding }),
      arrowMiddleware({ element: tourStepArrowRef }),
    ],
  });

  const [animation, animationApi] = useSpring(
    () => ({ from: { opacity: 0 }, config: springConfig.slow }),
    [],
  );

  const handleChange = useCallback(
    (tourStep: TourStepValue | null) => {
      // If the opacity is already 0, animating it to 0 does not trigger `onRest`
      if (animation.opacity.get() === 0) return onChange(tourStep);
      void animationApi.start({
        to: { opacity: 0 },
        config: springConfig.stiff,
        onRest: () => onChange(tourStep),
      });
    },
    [animation.opacity, animationApi, onChange],
  );

  const revealTourStep = useCallback(() => {
    activeTourStepTarget?.measureInWindow((x, y, width, height) => {
      refs.setReference({
        measure: (callback: (x: number, y: number, width: number, height: number) => void) => {
          callback(x, y, width, height);
          void animationApi.start({ to: { opacity: 1 }, config: springConfig.slow });
        },
      });
    });
  }, [activeTourStepTarget, animationApi, refs]);

  const api = useTour({ steps, activeTourStep, onChange: handleChange });

  useEffect(() => {
    if (!activeTourStep) return;
    revealTourStep();
  }, [activeTourStep, revealTourStep]);

  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <RefMapContext.Provider value={refMap}>
        <TourContext.Provider value={api}>
          {children}
          {!!RenderedTourStep && (
            <Modal
              transparent
              accessibilityLabel={accessibilityLabel}
              accessibilityLabelledBy={accessibilityLabelledBy}
              animationType="none"
              id={id}
              presentationStyle="overFullScreen"
              testID={testID}
            >
              {!(activeTourStep.hideOverlay ?? hideOverlay) && !!activeTourStepTarget && (
                <animated.View style={animation}>
                  <TourMaskComponent
                    activeTourStepTarget={activeTourStepTarget}
                    borderRadius={activeTourStep.tourMaskBorderRadius ?? tourMaskBorderRadius}
                    padding={activeTourStep.tourMaskPadding ?? tourMaskPadding}
                  />
                </animated.View>
              )}
              <View ref={refs.setFloating} collapsable={false} style={floatingStyles}>
                <animated.View style={animation}>
                  <RenderedTourStepArrow
                    ref={tourStepArrowRef}
                    arrow={arrow}
                    placement={placement}
                    style={activeTourStep?.arrowStyle}
                  />
                  <RenderedTourStep {...activeTourStep} />
                </animated.View>
              </View>
            </Modal>
          )}
        </TourContext.Provider>
      </RefMapContext.Provider>
    </OverlayContentContext.Provider>
  );
};

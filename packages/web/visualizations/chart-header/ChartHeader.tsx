import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import {
  ChartHeaderProps,
  ChartHeaderRef,
  ChartHeaderValues,
  ChartSubHead,
} from '@cbhq/cds-common/types/ChartHeaderBaseProps';
import { interpolateSubHeadText } from '@cbhq/cds-common/visualizations/interpolateSubHeadText';

import { useDimensions } from '../../hooks/useDimensions';
import { usePalette } from '../../hooks/usePalette';
import { HStack } from '../../layout';
import { TextDisplay3, TextHeadline, TextTitle4 } from '../../typography';

const mobileLayoutBreakpoint = 650;

const ChartHeaderStable = memo(
  forwardRef<ChartHeaderRef, ChartHeaderProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID }, forwardedRef) => {
      const labelRef = useRef<HTMLSpanElement>(null);
      const titleRef = useRef<HTMLSpanElement>(null);
      const subHeadIconRef = useRef<HTMLSpanElement>(null);
      const subHeadRef = useRef<HTMLSpanElement>(null);
      const subHeadAccessoryRef = useRef<HTMLSpanElement>(null);
      const palette = usePalette();
      const { observe: containerRef, width: containerWidth } = useDimensions();

      const isMobileLayout = containerWidth > 0 && containerWidth < mobileLayoutBreakpoint;

      const valuesRef = useRef<ChartHeaderValues>({
        title: defaultTitle,
        label: defaultLabel,
        subHead: defaultSubHead,
      });

      const updateLabel = useCallback((label: string) => {
        const prevLabel = valuesRef.current?.label;

        if (prevLabel !== label) {
          if (labelRef.current) {
            labelRef.current.innerText = label;
          }
          valuesRef.current = { ...valuesRef.current, label };
        }
      }, []);

      const updateTitle = useCallback((title: string) => {
        const prevTitle = valuesRef.current?.title;

        if (prevTitle !== title) {
          if (titleRef.current) {
            titleRef.current.innerText = title;
          }
          valuesRef.current = { ...valuesRef.current, title };
        }
      }, []);

      const updateSubHead = useCallback(
        (subHead: ChartSubHead) => {
          const prevSubHead = valuesRef.current?.subHead;

          if (prevSubHead !== subHead) {
            if (subHeadIconRef.current) {
              subHeadIconRef.current.innerText = subHead.sign;
              subHeadIconRef.current.style.color = palette[subHead.variant];
            }

            if (subHeadRef.current) {
              subHeadRef.current.innerText = interpolateSubHeadText(subHead);
              subHeadRef.current.style.color = palette[subHead.variant];
            }

            if (subHeadAccessoryRef.current) {
              subHeadAccessoryRef.current.innerText = subHead.accessoryText ?? '';
            }

            valuesRef.current = { ...valuesRef.current, subHead };
          }
        },
        [palette],
      );

      // update is triggered from a parent component.
      // We track the values of each input in a valuesRef object
      // so that we can avoid updating unnecessarily if previous
      // value is the same as the new value
      const update = useCallback(
        ({ label, title, subHead }: ChartHeaderValues) => {
          if (label) {
            updateLabel(label);
          }
          if (title) {
            updateTitle(title);
          }
          if (subHead) {
            updateSubHead(subHead);
          }
        },
        [updateLabel, updateSubHead, updateTitle],
      );

      useImperativeHandle(
        forwardedRef,
        () => {
          return {
            update,
          };
        },
        [update],
      );

      const label = !!defaultLabel && (
        <TextHeadline as="div" color="foregroundMuted">
          <span ref={labelRef}>{defaultLabel}</span>
        </TextHeadline>
      );

      const subHeadColorStyles: React.CSSProperties = defaultSubHead
        ? { color: palette[defaultSubHead.variant] }
        : {};

      const subHead = !!defaultSubHead && (
        <div>
          <TextTitle4 tabularNumbers as="span">
            <span ref={subHeadIconRef} style={subHeadColorStyles}>
              {defaultSubHead.sign}
            </span>
            <span ref={subHeadRef} style={subHeadColorStyles}>
              {interpolateSubHeadText(defaultSubHead)}
            </span>
          </TextTitle4>
          {!!defaultSubHead.accessoryText && (
            <TextTitle4 tabularNumbers as="span" color="foregroundMuted" spacingStart={1}>
              <span ref={subHeadAccessoryRef}>{defaultSubHead.accessoryText}</span>
            </TextTitle4>
          )}
        </div>
      );

      const title = (
        <>
          <HStack spacing={0} alignItems="baseline">
            <TextDisplay3 tabularNumbers as="div" color="foreground" spacingEnd={1}>
              <span ref={titleRef}>{defaultTitle}</span>
            </TextDisplay3>
            {!isMobileLayout && subHead}
          </HStack>
          {isMobileLayout && subHead}
        </>
      );

      return (
        <div data-testid={testID} ref={containerRef} style={{ width: '100%' }}>
          {label}
          {title}
        </div>
      );
    },
  ),
);
export const ChartHeader = memo(
  forwardRef<ChartHeaderRef, ChartHeaderProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID }, ref) => {
      return (
        <ChartHeaderStable
          ref={ref}
          // All updates after initial load should be handled imperatively
          // via update function in forwarded ref to prevent overriding
          // values unexpectedly. This is why we use ref here so that the
          // default value is stable and never updates on re-renders
          defaultLabel={useRef(defaultLabel).current}
          defaultTitle={useRef(defaultTitle).current}
          defaultSubHead={useRef(defaultSubHead).current}
          testID={testID}
        />
      );
    },
  ),
);

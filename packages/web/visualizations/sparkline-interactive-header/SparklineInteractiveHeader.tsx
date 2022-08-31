import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import {
  SparklineInteractiveHeaderProps,
  SparklineInteractiveHeaderRef,
  SparklineInteractiveHeaderValues,
  SparklineInteractiveSubHead,
} from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';
import { interpolateSubHeadText } from '@cbhq/cds-common/visualizations/interpolateSubHeadText';

import { usePalette } from '../../hooks/usePalette';
import { VStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { createText } from '../../typography/createText';

export * from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';

const SparklineInteractiveHeaderStable = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, labelNode, compact }, forwardedRef) => {
      const labelRef = useRef<HTMLSpanElement>(null);
      const titleRef = useRef<HTMLSpanElement>(null);
      const subHeadIconRef = useRef<HTMLSpanElement>(null);
      const subHeadA11yRef = useRef<HTMLDivElement>(null);
      const subHeadRef = useRef<HTMLSpanElement>(null);
      const subHeadAccessoryRef = useRef<HTMLSpanElement>(null);
      const palette = usePalette();

      const valuesRef = useRef<SparklineInteractiveHeaderValues>({
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
        (subHead: SparklineInteractiveSubHead) => {
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

            if (subHeadA11yRef.current) {
              subHeadA11yRef.current.ariaLabel = `${
                subHead.accessibilityLabel
              } ${interpolateSubHeadText(subHead)}`;
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
        ({ label, title, subHead }: SparklineInteractiveHeaderValues) => {
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

      const TextSubHead = createText(compact ? 'label1' : 'title4');
      const subHead = !!defaultSubHead && (
        <div ref={subHeadA11yRef}>
          <TextSubHead tabularNumbers as="span">
            <span ref={subHeadIconRef} style={subHeadColorStyles}>
              {defaultSubHead.sign}
            </span>
            <span ref={subHeadRef} style={subHeadColorStyles}>
              {interpolateSubHeadText(defaultSubHead)}
            </span>
          </TextSubHead>
          {!!defaultSubHead.accessoryText && (
            <TextSubHead tabularNumbers as="span" color="foregroundMuted" spacingStart={1}>
              <span ref={subHeadAccessoryRef}>{defaultSubHead.accessoryText}</span>
            </TextSubHead>
          )}
        </div>
      );

      const TextTitle = createText(compact ? 'title1' : 'display3');
      const title = (
        <VStack spacing={0} alignItems="baseline">
          <TextTitle tabularNumbers as="div" color="foreground" spacingEnd={1}>
            <span ref={titleRef}>{defaultTitle}</span>
          </TextTitle>
          {subHead}
        </VStack>
      );

      return (
        <div
          data-testid={testID}
          style={{ width: '100%' }}
          aria-live="polite"
          role="region"
          aria-label="Asset summary"
        >
          {labelNode ?? label}
          {title}
        </div>
      );
    },
  ),
);
export const SparklineInteractiveHeader = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, labelNode, compact }, ref) => {
      return (
        <SparklineInteractiveHeaderStable
          ref={ref}
          // All updates after initial load should be handled imperatively
          // via update function in forwarded ref to prevent overriding
          // values unexpectedly. This is why we use ref here so that the
          // default value is stable and never updates on re-renders
          defaultLabel={useRef(defaultLabel).current}
          defaultTitle={useRef(defaultTitle).current}
          defaultSubHead={useRef(defaultSubHead).current}
          testID={testID}
          labelNode={labelNode}
          compact={compact}
        />
      );
    },
  ),
);

import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { subheadIconSignMap } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractiveHeaderProps,
  SparklineInteractiveHeaderRef,
  SparklineInteractiveHeaderValues,
  SparklineInteractiveSubHead,
} from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';
import { debounce } from '@cbhq/cds-common/utils/debounce';
import { interpolateSubHeadText } from '@cbhq/cds-common/visualizations/interpolateSubHeadText';

import { AccessibilityAnnouncer } from '../../AccessibilityAnnouncer/AccessibilityAnnouncer';
import { usePalette } from '../../hooks/usePalette';
import { useSpacingScale } from '../../hooks/useSpacingScale';
import { VStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { createText } from '../../typography/createText';

export * from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-web-sparkline.
 */
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
      const subHeadIconMarginRight = useSpacingScale(0.5);

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

      // To make sure we don't spam the screen reader, we debounce this update
      const debouncedUpdateMessage = useMemo(
        () =>
          debounce((subHead: SparklineInteractiveSubHead) => {
            if (subHeadA11yRef.current) {
              const message = `${valuesRef.current.label} was ${valuesRef.current.title} ${
                subHead.accessibilityLabel
              } ${interpolateSubHeadText(subHead)}`;
              subHeadA11yRef.current.innerText = message;
            }
          }, 500),
        [],
      );
      const safelyUpdateSubHeadA11yRef = useCallback(debouncedUpdateMessage, [
        debouncedUpdateMessage,
      ]);

      const updateSubHead = useCallback(
        (subHead: SparklineInteractiveSubHead) => {
          const prevSubHead = valuesRef.current?.subHead;

          if (prevSubHead !== subHead) {
            if (subHeadIconRef.current) {
              subHeadIconRef.current.innerText = subheadIconSignMap[subHead.sign];
              subHeadIconRef.current.style.color = palette[subHead.variant];
            }

            if (subHeadRef.current) {
              subHeadRef.current.innerText = interpolateSubHeadText(subHead);
              subHeadRef.current.style.color = palette[subHead.variant];
            }

            if (subHeadAccessoryRef.current) {
              subHeadAccessoryRef.current.innerText = subHead.accessoryText ?? '';
            }

            // Update a11y message
            if (subHeadA11yRef.current) {
              safelyUpdateSubHeadA11yRef(subHead);
            }

            valuesRef.current = { ...valuesRef.current, subHead };
          }
        },
        [palette, safelyUpdateSubHeadA11yRef],
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
        ? { color: palette[defaultSubHead.variant], marginRight: subHeadIconMarginRight }
        : { marginRight: subHeadIconMarginRight };

      const TextSubHead = createText(compact ? 'label1' : 'title4');
      const subHead = !!defaultSubHead && (
        <>
          <TextSubHead tabularNumbers as="span">
            <span ref={subHeadIconRef} style={subHeadColorStyles}>
              {subheadIconSignMap[defaultSubHead.sign]}
            </span>
            <span ref={subHeadRef} style={subHeadColorStyles}>
              {interpolateSubHeadText(defaultSubHead)}
            </span>
          </TextSubHead>
          {!!defaultSubHead.accessoryText && (
            <TextSubHead
              aria-hidden
              tabularNumbers
              as="span"
              color="foregroundMuted"
              spacingStart={1}
            >
              <span ref={subHeadAccessoryRef}>{defaultSubHead.accessoryText}</span>
            </TextSubHead>
          )}
        </>
      );

      const TextTitle = createText(compact ? 'title1' : 'display3');
      const title = (
        <VStack alignItems="baseline" spacing={0}>
          <TextTitle tabularNumbers as="div" color="foreground" spacingEnd={1}>
            <span ref={titleRef}>{defaultTitle}</span>
          </TextTitle>
          {subHead}
        </VStack>
      );

      return (
        <>
          <div aria-hidden data-testid={testID} style={{ width: '100%' }}>
            {labelNode ?? label}
            {title}
          </div>
          <AccessibilityAnnouncer ref={subHeadA11yRef} />
        </>
      );
    },
  ),
);
export const SparklineInteractiveHeader = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, labelNode, compact }, ref) => {
      return (
        <SparklineInteractiveHeaderStable
          // All updates after initial load should be handled imperatively
          // via update function in forwarded ref to prevent overriding
          // values unexpectedly. This is why we use ref here so that the
          // default value is stable and never updates on re-renders
          ref={ref}
          compact={compact}
          defaultLabel={useRef(defaultLabel).current}
          defaultSubHead={useRef(defaultSubHead).current}
          defaultTitle={useRef(defaultTitle).current}
          labelNode={labelNode}
          testID={testID}
        />
      );
    },
  ),
);

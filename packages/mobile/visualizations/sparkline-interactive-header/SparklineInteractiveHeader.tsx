import React, {
  forwardRef,
  FunctionComponent,
  memo,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { TextInput, View } from 'react-native';
import {
  SparklineInteractiveHeaderProps,
  SparklineInteractiveHeaderRef,
  SparklineInteractiveHeaderValues,
  SparklineInteractiveSubHead,
} from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';
import { interpolateSubHeadText } from '@cbhq/cds-common/visualizations/interpolateSubHeadText';

import { fontScaleProps } from '../../hooks/useDeviceScaleToCdsScale';
import { HStack, VStack } from '../../layout';

import { useSparklineInteractiveHeaderStyles } from './useSparklineInteractiveHeaderStyles';

export * from '@cbhq/cds-common/types/SparklineInteractiveHeaderBaseProps';

type SparklineInteractiveHeaderMobileProps = {
  /**
   * Adds content next to the header. This is useful for interactive buttons
   */
  trailing?: ReactNode;
} & SparklineInteractiveHeaderProps;

export const SparklineInteractiveHeader = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderMobileProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, trailing }, ref) => {
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
          trailing={trailing}
        />
      );
    },
  ),
);

const SparklineInteractiveHeaderStable = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderMobileProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, trailing }, forwardedRef) => {
      const labelRef = useRef<TextInput>(null);
      const titleRef = useRef<TextInput>(null);
      const subHeadRef = useRef<TextInput>(null);
      const subHeadIconRef = useRef<TextInput>(null);
      const subHeadAccessoryRef = useRef<TextInput>(null);

      const valuesRef = useRef<SparklineInteractiveHeaderValues>({
        title: defaultTitle,
        label: defaultLabel,
        subHead: defaultSubHead,
      });

      const styles = useSparklineInteractiveHeaderStyles();

      const updateLabel = useCallback((label: string) => {
        const prevLabel = valuesRef.current?.label;

        if (prevLabel !== label) {
          labelRef.current?.setNativeProps({
            text: label,
          });
          valuesRef.current = { ...valuesRef.current, label };
        }
      }, []);

      const updateTitle = useCallback(
        (title: string) => {
          const prevTitle = valuesRef.current?.title;

          if (prevTitle !== title) {
            titleRef.current?.setNativeProps({
              text: title,
              style: styles.title(title),
            });
            valuesRef.current = { ...valuesRef.current, title };
          }
        },
        [styles],
      );

      const updateSubHead = useCallback(
        (subHead: SparklineInteractiveSubHead) => {
          const prevSubHead = valuesRef.current?.subHead;

          if (prevSubHead !== subHead) {
            subHeadIconRef.current?.setNativeProps({
              text: subHead.sign,
              style: styles.subHeadIcon(subHead.variant),
            });
            subHeadRef.current?.setNativeProps({
              text: interpolateSubHeadText(subHead),
              style: styles.subHead(subHead.variant, subHead.accessoryText === undefined),
            });
            subHeadAccessoryRef.current?.setNativeProps({
              text: subHead.accessoryText ?? '',
              style: styles.subHeadAccessory(),
            });
            valuesRef.current = { ...valuesRef.current, subHead };
          }
        },
        [styles],
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
        <TextInput
          ref={labelRef}
          editable={false}
          style={styles.label}
          defaultValue={defaultLabel}
          pointerEvents="none"
          {...fontScaleProps}
        />
      );

      const title = (
        <>
          <View>
            <TextInput
              ref={titleRef}
              editable={false}
              style={styles.title(defaultTitle)}
              defaultValue={defaultTitle}
              pointerEvents="none"
              testID="SparklineInteractiveHeaderTitle"
              {...fontScaleProps}
            />
          </View>
          {!!defaultSubHead && (
            <HStack spacing={0} alignItems="center">
              <TextInput
                ref={subHeadIconRef}
                editable={false}
                style={styles.subHeadIcon(defaultSubHead.variant)}
                defaultValue={defaultSubHead.sign}
                pointerEvents="none"
                testID="SparklineInteractiveHeaderSubHeadIcon"
                {...fontScaleProps}
              />
              <TextInput
                ref={subHeadRef}
                editable={false}
                style={styles.subHead(
                  defaultSubHead.variant,
                  defaultSubHead.accessoryText === undefined,
                )}
                defaultValue={interpolateSubHeadText(defaultSubHead)}
                pointerEvents="none"
                testID="SparklineInteractiveHeaderSubHead"
                {...fontScaleProps}
              />
              {!!defaultSubHead.accessoryText && (
                <TextInput
                  ref={subHeadAccessoryRef}
                  editable={false}
                  style={styles.subHeadAccessory()}
                  defaultValue={defaultSubHead.accessoryText}
                  pointerEvents="none"
                  testID="SparklineInteractiveHeaderSubHead"
                  {...fontScaleProps}
                />
              )}
            </HStack>
          )}
        </>
      );

      return (
        <HStack testID={testID} spacing={0} justifyContent="space-between">
          <VStack spacing={0} flexShrink={1}>
            {label}
            {title}
          </VStack>
          <Trailing>{trailing}</Trailing>
        </HStack>
      );
    },
  ),
);

const Trailing: FunctionComponent = ({ children }) => {
  if (children) {
    return (
      <VStack spacingStart={2} flexShrink={0} justifyContent="center" alignItems="center">
        {children}
      </VStack>
    );
  }
  return null;
};

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
import { subheadIconSignMap } from '@cbhq/cds-common/tokens/sparkline';
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

/**
 * @deprecated this component will be removed from CDS in v6.0.0. It has been moved to cds-mobile-visualization.
 */
export const SparklineInteractiveHeader = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderMobileProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, trailing, labelNode }, ref) => {
      return (
        <SparklineInteractiveHeaderStable
          // All updates after initial load should be handled imperatively
          // via update function in forwarded ref to prevent overriding
          // values unexpectedly. This is why we use ref here so that the
          // default value is stable and never updates on re-renders
          ref={ref}
          defaultLabel={useRef(defaultLabel).current}
          defaultSubHead={useRef(defaultSubHead).current}
          defaultTitle={useRef(defaultTitle).current}
          labelNode={labelNode}
          testID={testID}
          trailing={trailing}
        />
      );
    },
  ),
);

const SparklineInteractiveHeaderStable = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderMobileProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, trailing, labelNode }, forwardedRef) => {
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
          // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
          // Usage in this component are known making this a high risk component. Contact team for more information.
          // eslint-disable-next-line @cbhq/react-native-no-fabric-incompatible-apis
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
            // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
            // Usage in this component are known making this a high risk component. Contact team for more information.
            // eslint-disable-next-line @cbhq/react-native-no-fabric-incompatible-apis
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
            // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
            // Usage in this component are known making this a high risk component. Contact team for more information.
            // eslint-disable-next-line @cbhq/react-native-no-fabric-incompatible-apis
            subHeadIconRef.current?.setNativeProps({
              text: subheadIconSignMap[subHead.sign],
              style: styles.subHeadIcon(subHead.variant),
            });
            // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
            // Usage in this component are known making this a high risk component. Contact team for more information.
            // eslint-disable-next-line @cbhq/react-native-no-fabric-incompatible-apis
            subHeadRef.current?.setNativeProps({
              text: interpolateSubHeadText(subHead),
              style: styles.subHead(subHead.variant, subHead.accessoryText === undefined),
            });
            // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
            // Usage in this component are known making this a high risk component. Contact team for more information.
            // eslint-disable-next-line @cbhq/react-native-no-fabric-incompatible-apis
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
          defaultValue={defaultLabel}
          editable={false}
          pointerEvents="none"
          style={styles.label}
          testID="SparklineInteractiveHeaderLabel"
          {...fontScaleProps}
        />
      );

      const title = (
        <>
          <View>
            <TextInput
              ref={titleRef}
              defaultValue={defaultTitle}
              editable={false}
              pointerEvents="none"
              style={styles.title(defaultTitle)}
              testID="SparklineInteractiveHeaderTitle"
              {...fontScaleProps}
            />
          </View>
          {!!defaultSubHead && (
            <HStack alignItems="center" spacing={0}>
              <TextInput
                ref={subHeadIconRef}
                defaultValue={subheadIconSignMap[defaultSubHead.sign]}
                editable={false}
                pointerEvents="none"
                style={styles.subHeadIcon(defaultSubHead.variant)}
                testID="SparklineInteractiveHeaderSubHeadIcon"
                {...fontScaleProps}
              />
              <TextInput
                ref={subHeadRef}
                defaultValue={interpolateSubHeadText(defaultSubHead)}
                editable={false}
                pointerEvents="none"
                style={styles.subHead(
                  defaultSubHead.variant,
                  defaultSubHead.accessoryText === undefined,
                )}
                testID="SparklineInteractiveHeaderSubHead"
                {...fontScaleProps}
              />
              {!!defaultSubHead.accessoryText && (
                <TextInput
                  ref={subHeadAccessoryRef}
                  defaultValue={defaultSubHead.accessoryText}
                  editable={false}
                  pointerEvents="none"
                  style={styles.subHeadAccessory()}
                  testID="SparklineInteractiveHeaderSubHead"
                  {...fontScaleProps}
                />
              )}
            </HStack>
          )}
        </>
      );

      return (
        <HStack
          accessibilityHint="The price and difference for this time period"
          accessibilityLabel="Asset summary"
          accessibilityRole="header"
          aria-live="polite"
          justifyContent="space-between"
          spacing={0}
          testID={testID}
        >
          <VStack flexShrink={1} spacing={0}>
            {labelNode ?? label}
            {title}
          </VStack>
          <Trailing>{trailing}</Trailing>
        </HStack>
      );
    },
  ),
);

const Trailing: FunctionComponent<React.PropsWithChildren<unknown>> = ({ children }) => {
  if (children) {
    return (
      <VStack alignItems="center" flexShrink={0} justifyContent="center" spacingStart={2}>
        {children}
      </VStack>
    );
  }
  return null;
};

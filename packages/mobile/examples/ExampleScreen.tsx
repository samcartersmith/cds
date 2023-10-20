import React, { useCallback, useMemo } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useFeatureFlagToggler } from '@cbhq/cds-common/system/useFeatureFlagToggler';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import type { SpacingProps } from '@cbhq/cds-common/types';

import { Switch } from '../controls/Switch';
import { usePalette } from '../hooks/usePalette';
import { Box, BoxProps } from '../layout/Box';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';
import { useFeatureFlags } from '../system/useFeatureFlags';
import { TextTitle3 } from '../typography/TextTitle3';

type ExampleRenderChildren = () => NonNullable<JSX.Element>;
export type ExampleProps = {
  children: ExampleRenderChildren | React.ReactNode[] | React.ReactNode;
  inline?: boolean;
  title?: string;
  titleSpacing?: SpacingProps;
} & Omit<BoxProps, 'children'>;

export const Example = ({ children, inline, title, titleSpacing, ...props }: ExampleProps) => {
  const childStyles = useMemo(() => {
    const style: ViewStyle = { paddingTop: 12 };

    if (inline) {
      style.alignItems = 'flex-start';
    }

    return style;
  }, [inline]);

  const content = (
    <>
      <Box background spacing={2} spacingBottom={3} {...props}>
        {!!title && <TextTitle3 {...titleSpacing}>{title}</TextTitle3>}

        {typeof children === 'function'
          ? children()
          : React.Children.map(children, (item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <View key={index} style={childStyles}>
                {item}
              </View>
            ))}
      </Box>
      <Divider />
    </>
  );

  return content;
};

const Screen: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const palette = usePalette();

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      persistentScrollbar={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: palette.background, height: '100%' }}
      testID="mobile-playground-scrollview"
    >
      {children}
      <Divider testID="mobile-playground-scrollview-end" />
    </ScrollView>
  );
};

export const ExampleScreen: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const rootScale = useRootScale();
  const rootSpectrum = useRootSpectrum();
  const toggleFeatureFlag = useFeatureFlagToggler();
  const { frontier } = useFeatureFlags();

  const isDarkEnabled = rootSpectrum === 'dark';
  const isDenseEnabled = rootScale === 'xSmall';

  const rootSpectrumPreferenceUpdater = useRootSpectrumPreferenceUpdater();
  const toggleDark = useCallback(() => {
    const newSpectrum = rootSpectrum === 'light' ? 'dark' : 'light';
    rootSpectrumPreferenceUpdater(newSpectrum);
  }, [rootSpectrumPreferenceUpdater, rootSpectrum]);

  const rootScalePreferenceUpdater = useRootScalePreferenceUpdater();
  const toggleDense = useCallback(() => {
    const newScale = rootScale === 'xSmall' ? 'large' : 'xSmall';
    rootScalePreferenceUpdater(newScale);
  }, [rootScalePreferenceUpdater, rootScale]);

  const toggleFrontier = useCallback(() => {
    toggleFeatureFlag('frontier');
  }, [toggleFeatureFlag]);

  return (
    <VStack testID="mobile-playground-screen">
      <Screen>
        <ScaleProvider value="xSmall">
          <VStack>
            <VStack background gap={1} spacingHorizontal={gutter} spacingVertical={3}>
              <Switch checked={isDarkEnabled} onChange={toggleDark}>
                Dark Spectrum
              </Switch>
              <Switch checked={isDenseEnabled} onChange={toggleDense}>
                Dense Scale
              </Switch>
              <Switch checked={frontier} onChange={toggleFrontier}>
                Frontier
              </Switch>
            </VStack>
            <Divider />
          </VStack>
        </ScaleProvider>
        {children}
      </Screen>
    </VStack>
  );
};

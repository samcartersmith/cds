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

export type ExampleProps = {
  children: React.ReactNode;
  inline?: boolean;
  title?: string;
  titleSpacing?: SpacingProps;
} & BoxProps;

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
      <Box spacing={2} spacingBottom={3} background {...props}>
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

const Screen: React.FC = ({ children }) => {
  const palette = usePalette();

  return (
    <ScrollView
      style={{ backgroundColor: palette.background, height: '100%' }}
      keyboardShouldPersistTaps="always"
    >
      {children}
    </ScrollView>
  );
};

export const ExampleScreen: React.FC = ({ children }) => {
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
    <Screen>
      <ScaleProvider value="xSmall">
        <VStack>
          <VStack gap={1} spacingVertical={3} spacingHorizontal={gutter} background>
            <Switch onChange={toggleDark} checked={isDarkEnabled}>
              Dark Spectrum
            </Switch>
            <Switch onChange={toggleDense} checked={isDenseEnabled}>
              Dense Scale
            </Switch>
            <Switch onChange={toggleFrontier} checked={frontier}>
              Frontier
            </Switch>
          </VStack>
          <Divider />
        </VStack>
      </ScaleProvider>
      {children}
    </Screen>
  );
};

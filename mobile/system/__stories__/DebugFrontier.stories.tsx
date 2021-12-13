import React, { memo, useMemo } from 'react';
import { useFeatureFlagToggler } from '@cbhq/cds-common/system/useFeatureFlagToggler';

import { ListCell } from '../../cells/ListCell';
import { Switch } from '../../controls/Switch';

import { frontierFeatures, FeatureFlagLocalStorageCallback } from '../FeatureFlagContext';
import { useFeatureFlags } from '../useFeatureFlags';

import { ExampleScreen } from '../../examples/ExampleScreen';

const descriptions = {
  frontierTypography: 'Adjusts size of Display 2',
  frontierButton: 'Updated border radius',
  frontierColor: 'Updated secondary palette, yellow & torquise hue',
  frontierCard: 'Remove border radius, borders & full bleed CardGroup',
  frontierSparkline: 'More details coming soon...',
};

const availableFlags = new Set([
  'frontierTypography',
  'frontierButton',
  'frontierColor',
  'frontierCard',
]);

type DebugFrontierProps = {
  updateLocalStorage?: FeatureFlagLocalStorageCallback;
};

const DebugFrontier = memo(({ updateLocalStorage }: DebugFrontierProps) => {
  const toggleFeatureFlag = useFeatureFlagToggler();

  const featureFlags = useFeatureFlags();
  const listCells = useMemo(() => {
    return frontierFeatures.map((item) => {
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      const toggle = () => {
        toggleFeatureFlag(item, updateLocalStorage);
      };

      return (
        <ListCell
          key={item}
          title={item}
          description={descriptions[item]}
          multiline
          action={
            availableFlags.has(item) && (
              <Switch
                accessibilityLabel={descriptions[item]}
                accessibilityHint={descriptions[item]}
                onChange={toggle}
                checked={featureFlags[item]}
              />
            )
          }
        />
      );
    });
  }, [featureFlags, toggleFeatureFlag, updateLocalStorage]);

  return <ExampleScreen>{listCells}</ExampleScreen>;
});

export default DebugFrontier;

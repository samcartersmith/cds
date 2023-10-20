import React, { memo, useMemo } from 'react';
import { FeatureFlag } from '@cbhq/cds-common/system/FeatureFlagContext';
import { useFeatureFlagToggler } from '@cbhq/cds-common/system/useFeatureFlagToggler';
import { entries } from '@cbhq/cds-utils';

import { ListCell } from '../../cells/ListCell';
import { Switch } from '../../controls/Switch';
import { ExampleScreen } from '../../examples/ExampleScreen';
import { frontierFeaturesOn } from '../FeatureFlagContext';
import { useFeatureFlags } from '../useFeatureFlags';

const descriptions: { [key in FeatureFlag]?: string } = {
  frontierTypography: 'Adjusts size of Display 2',
  frontierButton: 'Updated border radius',
  frontierColor: 'Updated secondary palette, yellow & torquise hue',
  frontierCard: 'Remove border radius, borders & full bleed CardGroup',
  frontierSparkline: 'Dotted fills in Charts',
};

const availableFlags = new Set([
  'frontierTypography',
  'frontierButton',
  'frontierColor',
  'frontierCard',
  'frontierSparkline',
]);

const DebugFrontier = memo(() => {
  const toggleFeatureFlag = useFeatureFlagToggler();

  const featureFlags = useFeatureFlags();
  const listCells = useMemo(() => {
    return entries(frontierFeaturesOn).map(([item]) => {
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      const toggle = () => {
        toggleFeatureFlag(item);
      };

      return (
        <ListCell
          key={item}
          multiline
          action={
            availableFlags.has(item) && (
              <Switch
                accessibilityHint={descriptions[item]}
                accessibilityLabel={descriptions[item]}
                checked={featureFlags[item]}
                onChange={toggle}
              />
            )
          }
          description={descriptions[item]}
          title={item}
        />
      );
    });
  }, [featureFlags, toggleFeatureFlag]);

  return <ExampleScreen>{listCells}</ExampleScreen>;
});

export default DebugFrontier;

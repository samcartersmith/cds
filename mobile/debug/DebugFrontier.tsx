import React, { memo, useMemo } from 'react';
import { useFeatureFlagToggler } from '@cbhq/cds-common/system/useFeatureFlagToggler';
import { ListCell } from '../cells/ListCell';
import { Switch } from '../controls/Switch';
import { frontierFeatures, FeatureFlagLocalStorageCallback } from '../system/FeatureFlagContext';
import { useFeatureFlags } from '../system/useFeatureFlags';

const descriptions = {
  frontierTypography: 'Adjusts size of Display 2',
  frontierButton: 'Updated border radius',
  frontierColor: 'More details soon...',
  frontierCard: 'More details soon...',
  frontierSparkline: 'More details soon...',
};

const availableFlags = new Set(['frontierTypography', 'frontierButton']);

type DebugFrontierProps = {
  updateLocalStorage?: FeatureFlagLocalStorageCallback;
};

export const DebugFrontier = memo(({ updateLocalStorage }: DebugFrontierProps) => {
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

  return <>{listCells}</>;
});

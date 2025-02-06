import React, { useCallback } from 'react';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { Box } from '@cbhq/cds-web2/layout';
import { PressableOpacity } from '@cbhq/cds-web2/system/PressableOpacity';
import { TabComponent as TabComponentType } from '@cbhq/cds-web2/tabs/Tabs';
import { Text } from '@cbhq/cds-web2/typography/Text';

import styles from './styles.module.css';

export const TabComponent: TabComponentType = ({ label, disabled, id }) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const handlePress = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  const isActive = activeTab?.id === id;

  return (
    <PressableOpacity
      as="button"
      className={styles.tabComponent}
      disabled={disabled}
      onPress={handlePress}
    >
      <Box paddingY={2}>
        <Text color={isActive ? 'fgPrimary' : 'fg'} font="headline">
          {label || ''}
        </Text>
      </Box>
    </PressableOpacity>
  );
};

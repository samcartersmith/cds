import React, { useCallback, useState } from 'react';
import { sortByAlphabet } from '@site/src/utils/sortByAlphabet';
import { throttle } from 'lodash';
import { TabValue } from '@cbhq/cds-common/tabs/useTabs';
import { IconSize } from '@cbhq/cds-common/types';
import type { IconName } from '@cbhq/cds-common/types/IconName';
import navIconDescriptionMap from '@cbhq/cds-icons/__generated__/nav/data/descriptionMap';
import navIconNames from '@cbhq/cds-icons/__generated__/nav/data/names';
import uiIconDescriptionMap from '@cbhq/cds-icons/__generated__/ui/data/descriptionMap';
import uiIconNames from '@cbhq/cds-icons/__generated__/ui/data/names';
import { TileButton } from '@cbhq/cds-web/buttons/TileButton';
import { SearchInput, Switch } from '@cbhq/cds-web/controls';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { Box, Grid } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Text } from '@cbhq/cds-web/typography';

import { SheetTabs } from '../SheetTabs';

// use a set to dedupe the icons that existed in both the navigation icons set and the ui icons set
const names = [...new Set([...navIconNames, ...uiIconNames])];
const descriptionMap = { ...uiIconDescriptionMap, ...navIconDescriptionMap };
const alphabeticallySortedNames = names.sort(sortByAlphabet);

const queryMatchesName = (query: string, name: string) => {
  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');
  const nameRe = new RegExp(name.toLowerCase(), 'gi');

  const matchedIconNames: string[] = [];

  if (query in descriptionMap) {
    matchedIconNames.push(...descriptionMap[query]);
  }

  return name.match(queryRe) !== null || matchedIconNames.join(' ').match(nameRe) !== null;
};

const iconSizes: IconSize[] = ['xs', 's', 'm', 'l'];

const IconTile = ({ name, size, active }: { name: IconName; size: IconSize; active: boolean }) => {
  const toast = useToast();
  const handleIconPress = useCallback(() => {
    if (navigator) {
      void navigator.clipboard.writeText(name).then(() => {
        toast.show('Copied to clipboard');
      });
    }
  }, [name, toast]);

  return (
    <TileButton showOverflow onClick={handleIconPress} title={name}>
      <Icon active={active} color="fg" name={name} size={size} />
    </TileButton>
  );
};

export const IconSheet = () => {
  const [query, setQuery] = useState('');
  const [showIconActive, setShowIconActive] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue | null>({ id: 'm', label: 'm' });

  const handleActiveCheck = useCallback(() => {
    setShowIconActive((active) => !active);
  }, []);

  const searchOnChange = throttle((text: string) => {
    setQuery(text);
  }, 1000);

  const tabs = iconSizes.map((size) => ({ id: size, label: size }));

  const handleTabChange = useCallback((tab: TabValue | null) => {
    setActiveTab(tab);
  }, []);

  return (
    <Box background="bgAlternate" borderRadius={500} flexDirection="column" gap={2} padding={4}>
      <Box flexWrap="wrap">
        <SearchInput
          compact
          accessibilityLabel="Filter icons by name"
          onChangeText={searchOnChange}
          placeholder="Icon name"
          type="text"
          value={query}
        />
      </Box>
      <Box flexDirection="column" gap={2} position="relative">
        <SheetTabs
          accessibilityLabel="Select icon size"
          activeTab={activeTab}
          onChange={handleTabChange}
          tabs={tabs}
        />

        {iconSizes.map((size) => {
          const filteredNames = alphabeticallySortedNames.filter((name) =>
            queryMatchesName(query, name),
          );
          const hasResults = filteredNames.length > 0;

          return (
            <Box
              key={size}
              background="bg"
              borderRadius={500}
              display={activeTab?.id === size ? 'block' : 'none'}
              padding={1}
            >
              {hasResults ? (
                <Grid columnMin="106px" gap={1} maxHeight={600} overflow="scroll" width="100%">
                  {filteredNames.map((name) => (
                    <IconTile key={name} active={showIconActive} name={name} size={size} />
                  ))}
                </Grid>
              ) : (
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  padding={4}
                  width="100%"
                >
                  <Text color="fg" font="legal">
                    No results found
                  </Text>
                </Box>
              )}
            </Box>
          );
        })}

        <Box paddingTop={0.5} style={{ position: 'absolute', right: 0, top: 0 }}>
          <Switch checked={showIconActive} onChange={handleActiveCheck} size={8}>
            active?
          </Switch>
        </Box>
      </Box>
    </Box>
  );
};

import React, { useCallback, useState } from 'react';
import { sortByAlphabet } from '@site/src/utils/sortByAlphabet';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { throttle } from 'lodash';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { IconSize } from '@cbhq/cds-common2/types';
import type { IconName } from '@cbhq/cds-common2/types/IconName';
import navIconDescriptionMap from '@cbhq/cds-icons/__generated__/nav/data/descriptionMap';
import navIconNames from '@cbhq/cds-icons/__generated__/nav/data/names';
import uiIconDescriptionMap from '@cbhq/cds-icons/__generated__/ui/data/descriptionMap';
import uiIconNames from '@cbhq/cds-icons/__generated__/ui/data/names';
import { TileButton } from '@cbhq/cds-web2/buttons/TileButton';
import { TextInput, Switch } from '@cbhq/cds-web2/controls';
import { Icon } from '@cbhq/cds-web2/icons/Icon';
import { Box, Grid } from '@cbhq/cds-web2/layout';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';
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
    <TileButton onClick={handleIconPress} title={name}>
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

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  return (
    <>
      <Box flexWrap="wrap">
        <TextInput
          label="Filter Icons"
          onChange={searchOnChange}
          placeholder="Icon name"
          type="text"
        />
      </Box>
      <Box flexDirection="column" position="relative">
        <Tabs defaultValue="m" values={iconSizes.map((sz) => ({ label: sz, value: sz }))}>
          {iconSizes.map((sz) => {
            return (
              <TabItem key={sz} value={sz}>
                <Grid
                  columnMin="106px"
                  gap={1}
                  maxHeight={600}
                  overflow="scroll"
                  padding={1}
                  width="100%"
                >
                  {alphabeticallySortedNames
                    .filter((name) => {
                      return queryMatchesName(query, name);
                    })
                    .map((name) => (
                      <IconTile active={showIconActive} name={name} size={sz} />
                    ))}
                </Grid>
              </TabItem>
            );
          })}
        </Tabs>
        <Box paddingTop={2} style={{ position: 'absolute', right: 0, top: 0 }}>
          <Switch checked={showIconActive} onChange={handleActiveCheck} size={8}>
            active?
          </Switch>
        </Box>
      </Box>
    </>
  );
};

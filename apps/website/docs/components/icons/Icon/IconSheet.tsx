import React, { useCallback, useState } from 'react';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import throttle from 'lodash/throttle';
import { NavIconName, UiIconName } from '@cbhq/cds-icons';
import navIconDescriptionMap from '@cbhq/cds-icons/__generated__/nav/data/descriptionMap';
import navIconNames from '@cbhq/cds-icons/__generated__/nav/data/names';
import uiIconDescriptionMap from '@cbhq/cds-icons/__generated__/ui/data/descriptionMap';
import uiIconNames from '@cbhq/cds-icons/__generated__/ui/data/names';
import { TileButton } from '@cbhq/cds-web/buttons';
import { Switch } from '@cbhq/cds-web/controls/Switch';
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { Icon, IconSize } from '@cbhq/cds-web/icons';
import { Grid } from '@cbhq/cds-web/layout';
import { Box } from '@cbhq/cds-web/layout/Box';
import { useToast } from '@cbhq/cds-web/overlays/useToast';

import { sortByAlphabet } from '../../../../utils/sortByAlphabet';

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

const IconTile = ({
  name,
  size,
  active,
}: {
  name: UiIconName | NavIconName;
  size: IconSize;
  active: boolean;
}) => {
  const toast = useToast();
  const handleIconPress = useCallback(() => {
    if (navigator) {
      void navigator.clipboard.writeText(name).then(() => {
        toast.show('Copied to clipboard');
      });
    }
  }, [name, toast]);

  return (
    <TileButton onPress={handleIconPress} title={name}>
      <Icon active={active} color="foreground" name={name} size={size} />
    </TileButton>
  );
};

export const IconSheet = () => {
  const [query, setQuery] = useState('');
  const [showIconActive, setShowIconActive] = useState(false);

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
                  maxHeight={700}
                  overflow="scroll"
                  spacingVertical={1}
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
        <Box pin="right" spacingTop={2}>
          <Switch checked={showIconActive} onChange={handleActiveCheck} size={8}>
            active?
          </Switch>
        </Box>
      </Box>
    </>
  );
};

import { useCallback, useState } from 'react';

import { IconSize } from '@cbhq/cds-common/types/IconSize';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { NavigationIcon } from '@cbhq/cds-web/icons/NavigationIcon';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';
import { navigationIconName, navigationIconSizes } from '@cbhq/cds-website/data/iconData';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { cx } from 'linaria';
import throttle from 'lodash/throttle';
import { elevation, searchBox } from '../styles';

const STATES = ['Inactive', 'Active'] as const;
type StateTypes = 'Active' | 'Inactive';

const IconSheetForSize = ({ size = 'm' }: { size: Exclude<IconSize, 'xs'> }) => {
  const [state, setState] = useState<StateTypes>('Inactive');
  const [query, setQuery] = useState('');
  const onPress = useCallback((state: StateTypes) => {
    return () => setState(state);
  }, []);

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  return (
    <ThemeProvider>
      <Box flexWrap="wrap">
        {STATES.map(item => (
          <Box key={item} spacingEnd={1} spacingBottom={1}>
            <Button
              compact
              onPress={onPress(item)}
              variant={state === item ? 'primary' : 'secondary'}
            >
              {item}
            </Button>
          </Box>
        ))}
      </Box>

      <Box flexWrap="wrap" spacingVertical={2}>
        <input
          className={cx(elevation, searchBox)}
          onChange={searchOnChange}
          type="text"
          placeholder="Search Navigation Icons Here"
        />
      </Box>

      <Box flexWrap="wrap" spacingTop={1} spacingBottom={3}>
        {navigationIconName
          .filter(name => name.includes(query))
          .map(filteredName => (
            <VStack spacing={3} alignItems="center" key={filteredName}>
              <NavigationIcon
                title={filteredName}
                key={filteredName}
                name={filteredName}
                size={size}
                active={state === 'Active'}
              />
              <TextLabel1 align="center" as="p" spacing={2}>
                {filteredName}
              </TextLabel1>
            </VStack>
          ))}
      </Box>
    </ThemeProvider>
  );
};

export const NavigationIconSheet = () => {
  return (
    <Tabs defaultValue="m" values={navigationIconSizes.map(item => ({ label: item, value: item }))}>
      {navigationIconSizes.map(item => (
        <TabItem key={item} value={item}>
          <IconSheetForSize size={item} />
        </TabItem>
      ))}
    </Tabs>
  );
};

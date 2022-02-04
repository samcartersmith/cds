import { useCallback, useState } from 'react';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import throttle from 'lodash/throttle';
import { navigationIconNames, navigationIconSizes } from '@cbhq/cds-common/internal/data/iconData';
import { IconSize } from '@cbhq/cds-common/types/IconSize';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { NavigationIcon } from '@cbhq/cds-web/icons/NavigationIcon';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';

const STATES = ['Inactive', 'Active'] as const;
type StateTypes = 'Active' | 'Inactive';

const IconSheetForSize = ({ size = 'm' }: { size: Exclude<IconSize, 'xs'> }) => {
  const [state, setState] = useState<StateTypes>('Inactive');
  const [query, setQuery] = useState('');
  const onPress = useCallback((pressState: StateTypes) => {
    return () => setState(pressState);
  }, []);

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  return (
    <>
      <Box flexWrap="wrap">
        {STATES.map((item) => (
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
        <TextInput
          onChange={searchOnChange}
          type="text"
          placeholder="Navigation Icon name"
          label="Filter Icons"
        />
      </Box>

      <Box flexWrap="wrap" spacingTop={1} spacingBottom={3}>
        {navigationIconNames
          .filter((name) => name.includes(query))
          .map((filteredName) => (
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
    </>
  );
};

export const NavigationIconSheet = () => {
  return (
    <Tabs
      defaultValue="m"
      values={navigationIconSizes.map((item) => ({ label: item, value: item }))}
    >
      {navigationIconSizes.map((item) => (
        <TabItem key={item} value={item}>
          <IconSheetForSize size={item} />
        </TabItem>
      ))}
    </Tabs>
  );
};

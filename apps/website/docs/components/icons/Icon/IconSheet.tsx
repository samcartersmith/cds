import React, { useMemo, useState } from 'react';
import throttle from 'lodash/throttle';
import descriptionMap from '@cbhq/cds-icons/__generated__/ui/data/descriptionMap';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack } from '@cbhq/cds-web/layout';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';

const queryMatchesName = (query: string, name: string) => {
  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');
  const nameRe = new RegExp(name.toLowerCase(), 'gi');

  const matchedIconNames: string[] = [];

  if (query in descriptionMap) {
    matchedIconNames.push(...descriptionMap[query]);
  }

  return name.match(queryRe) !== null || matchedIconNames.join(' ').match(nameRe) !== null;
};

export const IconSheet = () => {
  const [query, setQuery] = useState('');

  const searchOnChange = throttle((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, 1000);

  const icons = useMemo(() => {
    return names
      .filter((name) => {
        return queryMatchesName(query, name);
      })
      .map((name) => {
        return (
          <VStack spacing={3} alignItems="center" key={name} width={120}>
            <Icon name={name} size="m" color="foreground" />
            <TextLabel1 align="center" as="p" spacing={2}>
              {name}
            </TextLabel1>
          </VStack>
        );
      });
  }, [query]);

  return (
    <>
      <Box flexWrap="wrap">
        <TextInput
          onChange={searchOnChange}
          type="text"
          placeholder="Icon name"
          label="Filter Icons"
        />
      </Box>

      <HStack flexWrap="wrap" spacingVertical={1} justifyContent="flex-start" alignItems="center">
        {icons}
      </HStack>
    </>
  );
};

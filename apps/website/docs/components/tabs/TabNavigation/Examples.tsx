import React, { memo, PropsWithChildren, useMemo, useState } from 'react';
import { css } from 'linaria';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common/types';
import { VStack } from '@cbhq/cds-web/layout';
import { TabNavigation } from '@cbhq/cds-web/tabs/TabNavigation';

const longTabs: TabProps[] = [
  {
    id: 'first_primary_tab',
    label: 'Tab one',
  },
  {
    id: 'second_primary_tab',
    label: 'Tab two',
  },
  {
    id: 'third_primary_tab',
    label: 'Tab three',
  },
  {
    id: 'fourth_primary_tab',
    label: 'Tab four',
  },
  {
    id: 'fifth_primary_tab',
    label: 'Tab five',
  },
  {
    id: 'sixth_primary_tab',
    label: 'Tab six',
  },
  {
    id: 'seventh_primary_tab',
    label: 'Tab seven',
  },
  {
    id: 'eighth_primary_tab',
    label: 'Tab eight',
  },
  {
    id: 'ninth_primary_tab',
    label: 'Tab nine',
  },
  {
    id: 'tenth_primary_tab',
    label: 'Tab ten',
  },
];
const tabs = longTabs.slice(0, 5);
const secondaryTabs: TabProps[] = [
  { id: 'first_secondary_tab', label: 'Tab one' },
  { id: 'second_secondary_tab', label: 'Tab two' },
];

const exampleClassName = css`
  > * {
    max-width: 100%;
  }
`;
const ExampleContainer = memo(({ children }: PropsWithChildren<unknown>) => {
  return (
    <VStack
      alignItems="center"
      background="backgroundAlternate"
      borderRadius="rounded"
      className={exampleClassName}
      justifyContent="center"
      spacingHorizontal={4}
      spacingVertical={7}
    >
      <VStack gap={2} overflow="hidden">
        {children}
      </VStack>
    </VStack>
  );
});

export const IntroExample = memo(() => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[1].id);
  const [secondaryValue, setSecondaryValue] = useState<TabNavigationProps['value']>();

  return (
    <ExampleContainer>
      <TabNavigation
        background="backgroundAlternate"
        onChange={setValue}
        tabs={tabs}
        value={value}
      />
      <TabNavigation
        onChange={setSecondaryValue}
        tabs={secondaryTabs}
        value={secondaryValue}
        variant="secondary"
      />
    </ExampleContainer>
  );
});

export const PrimaryExample = memo(() => {
  const [value, setValue] = useState<TabNavigationProps['value']>();

  return (
    <ExampleContainer>
      <TabNavigation
        background="backgroundAlternate"
        onChange={setValue}
        tabs={tabs}
        value={value}
      />
    </ExampleContainer>
  );
});

export const SecondaryExample = memo(() => {
  const [value, setValue] = useState<TabNavigationProps['value']>();

  return (
    <ExampleContainer>
      <TabNavigation
        background="backgroundAlternate"
        onChange={setValue}
        tabs={secondaryTabs}
        value={value}
        variant="secondary"
      />
    </ExampleContainer>
  );
});

export const PaddleExample = memo(() => {
  const [value, setValue] = useState<TabNavigationProps['value']>();

  return (
    <ExampleContainer>
      <TabNavigation
        background="backgroundAlternate"
        onChange={setValue}
        tabs={longTabs}
        value={value}
      />
    </ExampleContainer>
  );
});

export const DotCountExample = memo(() => {
  const [value, setValue] = useState<TabNavigationProps['value']>();
  const dottedTabs = useMemo(
    () => tabs.map((tab, idx) => (idx === 1 ? { ...tab, count: 2 } : tab)),
    [],
  );

  return (
    <ExampleContainer>
      <TabNavigation
        background="backgroundAlternate"
        onChange={setValue}
        tabs={dottedTabs}
        value={value}
      />
    </ExampleContainer>
  );
});

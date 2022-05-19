import React, {
  type ReactElement,
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { duplicates, useScrollPositionBlocker, useTabGroupChoice } from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import type { Props as TabItemProps } from '@theme/TabItem';
import type { Props } from '@theme/Tabs';
import { pascalCase } from '@cbhq/cds-utils';
import { VStack } from '@cbhq/cds-web/layout';
import { TabNavigation } from '@cbhq/cds-web/tabs';

// A very rough duck type, but good enough to guard against mistakes while allowing customization
function isTabItem(comp: ReactElement): comp is ReactElement<TabItemProps> {
  return typeof comp.props.value !== 'undefined';
}

const TabsComponent = memo(function TabsComponent(props: Props): JSX.Element {
  const { defaultValue: defaultValueProp, values: valuesProp, groupId } = props;
  const children = React.Children.map(props.children, (child) => {
    if (isValidElement(child) && isTabItem(child)) {
      return child;
    }
    // child.type.name will give non-sensical values in prod because of
    // minification, but we assume it won't throw in prod.
    throw new Error(
      `Docusaurus error: Bad <Tabs> child <${
        // @ts-expect-error: guarding against unexpected cases
        typeof child.type === 'string' ? child.type : child.type.name
      }>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`,
    );
  });
  const values =
    valuesProp ??
    // Only pick keys that we recognize. MDX would inject some keys by default
    children.map(({ props: { value, label, attributes } }) => ({
      value,
      label,
      attributes,
    }));
  const dup = duplicates(values, (a, b) => a.value === b.value);
  if (dup.length > 0) {
    throw new Error(
      `Docusaurus error: Duplicate values "${dup
        .map((a) => a.value)
        .join(', ')}" found in <Tabs>. Every value needs to be unique.`,
    );
  }
  // When defaultValueProp is null, don't show a default tab
  const defaultValue =
    defaultValueProp === null
      ? defaultValueProp
      : defaultValueProp ??
        children.find((child) => child.props.default)?.props.value ??
        children[0]?.props.value;
  if (defaultValue !== null && !values.some((a) => a.value === defaultValue)) {
    throw new Error(
      `Docusaurus error: The <Tabs> has a defaultValue "${defaultValue}" but none of its children has the corresponding value. Available values are: ${values
        .map((a) => a.value)
        .join(', ')}. If you intend to show no default tab, use defaultValue={null} instead.`,
    );
  }

  const { tabGroupChoices, setTabGroupChoices } = useTabGroupChoice();
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const { blockElementScrollPositionUntilNextRender } = useScrollPositionBlocker();
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (groupId != null) {
    const relevantTabGroupChoice = tabGroupChoices[groupId];
    if (
      relevantTabGroupChoice != null &&
      relevantTabGroupChoice !== selectedValue &&
      values.some((item) => item.value === relevantTabGroupChoice)
    ) {
      setSelectedValue(relevantTabGroupChoice);
    }
  }

  const handleTabChange = useCallback(
    (newTabValue: string) => {
      /**
       * Takes an element, and keeps its screen position no matter what's getting
       * rendered above it, until the next render.
       */
      if (wrapperRef.current) {
        blockElementScrollPositionUntilNextRender(wrapperRef.current);
      }
      setSelectedValue(newTabValue);
      if (groupId != null) {
        setTabGroupChoices(groupId, newTabValue);
      }
    },
    [blockElementScrollPositionUntilNextRender, groupId, setTabGroupChoices],
  );

  return (
    <VStack ref={wrapperRef} gap={4}>
      <TabNavigation
        value={selectedValue ?? ''}
        onChange={handleTabChange}
        tabs={values.map((item) => ({
          id: item.value,
          label: pascalCase(item.label ?? item.value),
        }))}
      />
      {children.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
        }),
      )}
    </VStack>
  );
});

export default function Tabs(props: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  return (
    <TabsComponent
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
      {...props}
    />
  );
}

import React, {
  type ReactElement,
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { duplicates, useScrollPositionBlocker, useTabGroupChoice } from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import type { Props } from '@theme/Tabs';
import { SpacingScale, TabNavigationProps } from '@cbhq/cds-common';
import { Spacer, VStack } from '@cbhq/cds-web/layout';
import { TabNavigation } from '@cbhq/cds-web/tabs';

import type { TabItemProps } from './TabItem';

export type TabProps = Omit<Props, 'groupId'> & {
  gap?: SpacingScale;
  groupId: string;
  variant?: TabNavigationProps['variant'];
  spacerHeight?: SpacingScale;
};

// A very rough duck type, but good enough to guard against mistakes while allowing customization
function isTabItem(comp: ReactElement): comp is ReactElement<TabItemProps> {
  return typeof comp.props.value !== 'undefined';
}

const TabsComponent = memo(function TabsComponent(props: TabProps): JSX.Element {
  const {
    defaultValue: defaultValueProp,
    values: valuesProp,
    variant = 'primary',
    gap = 3,
    groupId,
    spacerHeight = 3,
  } = props;
  const children = React.Children.map(props.children, (child) => {
    if (isValidElement(child) && isTabItem(child)) {
      return child;
    }
    // child.type.name will give non-sensical values in prod because of
    // minification, but we assume it won't throw in prod.
    throw new Error(
      `Docusaurus error: Bad <Tabs> child <${
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
  const history = useHistory();
  const location = useLocation();
  const urlParams = useMemo(
    () => (groupId === 'page' ? new URLSearchParams(history.location.search) : null),
    [groupId, history.location.search],
  );

  if (groupId != null) {
    const urlValue = urlParams?.get(groupId);
    const shouldUpdateUrlParams = urlValue && selectedValue !== urlValue;
    const dynamicHash = history.location.hash.replace(`#${groupId}=`, '');
    const relevantTabGroupChoice = dynamicHash ?? tabGroupChoices[groupId];
    if (shouldUpdateUrlParams) {
      setSelectedValue(urlValue);
    } else if (
      relevantTabGroupChoice != null &&
      relevantTabGroupChoice !== selectedValue &&
      values.some((item) => item.value === relevantTabGroupChoice)
    ) {
      if (urlParams && urlParams?.toString() !== '') {
        urlParams.set(groupId, relevantTabGroupChoice);
        history.replace({ ...location, hash: urlParams.toString() });
      } else {
        setSelectedValue(relevantTabGroupChoice);
      }
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
        if (urlParams) {
          urlParams.set(groupId, newTabValue);
          // remove url hash (anchor links) from previous toc clicks when switching tabs
          history.replace({ ...location, hash: urlParams.toString() });
        }
      }
    },
    [
      blockElementScrollPositionUntilNextRender,
      location,
      groupId,
      history,
      setTabGroupChoices,
      urlParams,
    ],
  );

  return (
    <VStack ref={wrapperRef}>
      <TabNavigation
        variant={variant}
        value={selectedValue ?? ''}
        onChange={handleTabChange}
        tabs={values.map((item) => ({
          id: item.value,
          label: item.label ?? item.value,
        }))}
      />
      <Spacer vertical={spacerHeight} />
      {children
        .filter((tabItem) => tabItem.props.value === selectedValue)
        .map((tabItem, i) =>
          cloneElement(tabItem, {
            // eslint-disable-next-line react/no-array-index-key
            key: i,
            gap,
            hidden: tabItem.props.value !== selectedValue,
          }),
        )}
    </VStack>
  );
});

export default function Tabs(props: TabProps): JSX.Element {
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

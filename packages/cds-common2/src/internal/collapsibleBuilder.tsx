import React, { useCallback, useState } from 'react';

import { usePrefixedId } from '../hooks/usePrefixedId';
import type {
  BoxBaseProps,
  ButtonBaseProps,
  CollapsibleBaseProps,
  DotCountBaseProps,
  TextBaseProps,
} from '../types';

import { loremIpsum } from './data/loremIpsum';

export type CreateCollapsibleProps = {
  Button: React.ComponentType<
    React.PropsWithChildren<
      ButtonBaseProps & { onClick?: () => void; id?: string; disableDebounce?: boolean }
    >
  >;
  Collapsible: React.ComponentType<
    React.PropsWithChildren<
      CollapsibleBaseProps & {
        id?: string;
        accessibilityLabelledBy?: string;
        maxHeight?: number;
      }
    >
  >;
  Text: React.ComponentType<React.PropsWithChildren<TextBaseProps & { as?: string }>>;
  DotCount: React.ComponentType<React.PropsWithChildren<DotCountBaseProps>>;
  HStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps>>;
};

/** @deprecated don't use creator pattern in v8 */
export function collapsibleBuilder({
  Button,
  Collapsible,
  Text,
  DotCount,
  HStack,
}: CreateCollapsibleProps) {
  const BasicCollapsible = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = useCallback(
      () => setCollapsed((collapsed) => !collapsed),
      [setCollapsed],
    );
    // Use the useA11yControlledVisibility to setup the collapsible a11y props more easily
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          disableDebounce
          aria-controls={collapsibleId}
          aria-expanded={!collapsed}
          id={triggerId}
          onClick={toggleCollapsed}
        >
          Click me!
        </Button>
        <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
          <Text as="p">{loremIpsum}</Text>
        </Collapsible>
      </>
    );
  };

  const RevealTop = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = useCallback(
      () => setCollapsed((collapsed) => !collapsed),
      [setCollapsed],
    );
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
          <Text as="p">{loremIpsum}</Text>
        </Collapsible>
        <Button
          disableDebounce
          aria-controls={collapsibleId}
          id={triggerId}
          onClick={toggleCollapsed}
        >
          Click me!
        </Button>
      </>
    );
  };

  const DefaultExpanded = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = useCallback(
      () => setCollapsed((collapsed) => !collapsed),
      [setCollapsed],
    );
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          disableDebounce
          aria-controls={collapsibleId}
          aria-expanded={!collapsed}
          id={triggerId}
          onClick={toggleCollapsed}
        >
          Click me!
        </Button>
        <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
          <Text as="p">{loremIpsum}</Text>
        </Collapsible>
      </>
    );
  };

  const Scroll = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = useCallback(
      () => setCollapsed((collapsed) => !collapsed),
      [setCollapsed],
    );
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          disableDebounce
          aria-controls={collapsibleId}
          aria-expanded={!collapsed}
          id={triggerId}
          onClick={toggleCollapsed}
        >
          Click me!
        </Button>
        <Collapsible
          accessibilityLabelledBy={triggerId}
          collapsed={collapsed}
          id={collapsibleId}
          maxHeight={400}
        >
          <Text as="p">{loremIpsum.repeat(10)}</Text>
        </Collapsible>
      </>
    );
  };

  const Horizontal = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = useCallback(
      () => setCollapsed((collapsed) => !collapsed),
      [setCollapsed],
    );
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <HStack alignItems="center">
        <Button
          disableDebounce
          aria-controls={collapsibleId}
          aria-expanded={!collapsed}
          id={triggerId}
          onClick={toggleCollapsed}
        >
          Click me!
        </Button>
        <Collapsible
          accessibilityLabelledBy={triggerId}
          collapsed={collapsed}
          direction="horizontal"
          id={collapsibleId}
          maxHeight={400}
        >
          <DotCount count={100} />
          <DotCount count={1} />
          <DotCount count={99} />
        </Collapsible>
      </HStack>
    );
  };

  const MockCollapsible = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = useCallback(
      () => setCollapsed((collapsed) => !collapsed),
      [setCollapsed],
    );
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          aria-controls={collapsibleId}
          aria-expanded={!collapsed}
          id={triggerId}
          onClick={toggleCollapsed}
        >
          Click me!
        </Button>
        <Collapsible
          accessibilityLabelledBy={triggerId}
          collapsed={collapsed}
          id={collapsibleId}
          testID="mock-collapse"
        >
          <Text as="p">Collapsible Content</Text>
        </Collapsible>
      </>
    );
  };

  return {
    BasicCollapsible,
    RevealTop,
    DefaultExpanded,
    Scroll,
    Horizontal,
    MockCollapsible,
  };
}

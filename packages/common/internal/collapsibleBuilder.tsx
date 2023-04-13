import React from 'react';

import { usePrefixedId } from '../hooks/usePrefixedId';
import { useToggler } from '../hooks/useToggler';
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
      ButtonBaseProps & { onPress?: () => void; id?: string; disableDebounce?: boolean }
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
  TextBody: React.ComponentType<React.PropsWithChildren<TextBaseProps & { as?: string }>>;
  DotCount: React.ComponentType<React.PropsWithChildren<DotCountBaseProps>>;
  HStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps>>;
};

export function collapsibleBuilder({
  Button,
  Collapsible,
  TextBody,
  DotCount,
  HStack,
}: CreateCollapsibleProps) {
  const BasicCollapsible = () => {
    const [collapsed, { toggle }] = useToggler(true);
    // Use the useA11yControlledVisibility to setup the collapsible a11y props more easily
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
          disableDebounce
        >
          Click me!
        </Button>
        <Collapsible collapsed={collapsed} accessibilityLabelledBy={triggerId} id={collapsibleId}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapsible>
      </>
    );
  };

  const RevealTop = () => {
    const [collapsed, { toggle }] = useToggler(true);
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Collapsible collapsed={collapsed} accessibilityLabelledBy={triggerId} id={collapsibleId}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapsible>
        <Button onPress={toggle} aria-controls={collapsibleId} id={triggerId} disableDebounce>
          Click me!
        </Button>
      </>
    );
  };

  const DefaultExpanded = () => {
    const [collapsed, { toggle }] = useToggler(false);
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
          disableDebounce
        >
          Click me!
        </Button>
        <Collapsible collapsed={collapsed} accessibilityLabelledBy={triggerId} id={collapsibleId}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapsible>
      </>
    );
  };

  const Scroll = () => {
    const [collapsed, { toggle }] = useToggler(true);
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
          disableDebounce
        >
          Click me!
        </Button>
        <Collapsible
          collapsed={collapsed}
          maxHeight={400}
          accessibilityLabelledBy={triggerId}
          id={collapsibleId}
        >
          <TextBody as="p">{loremIpsum.repeat(10)}</TextBody>
        </Collapsible>
      </>
    );
  };

  const Horizontal = () => {
    const [collapsed, { toggle }] = useToggler(true);
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <HStack alignItems="center">
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
          disableDebounce
        >
          Click me!
        </Button>
        <Collapsible
          id={collapsibleId}
          accessibilityLabelledBy={triggerId}
          direction="horizontal"
          maxHeight={400}
          collapsed={collapsed}
        >
          <DotCount count={100} />
          <DotCount count={1} />
          <DotCount count={99} />
        </Collapsible>
      </HStack>
    );
  };

  const MockCollapsible = () => {
    const [collapsed, { toggle }] = useToggler(true);
    const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
          disableDebounce
        >
          Click me!
        </Button>
        <Collapsible
          id={collapsibleId}
          accessibilityLabelledBy={triggerId}
          collapsed={collapsed}
          testID="mock-collapse"
        >
          <TextBody as="p">Collapsible Content</TextBody>
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

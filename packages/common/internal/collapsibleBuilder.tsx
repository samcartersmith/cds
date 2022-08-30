import React, { useMemo } from 'react';
import { generateRandomId } from '@cbhq/cds-utils/string';

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
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void; id?: string }>;
  Collapsible: React.ComponentType<
    CollapsibleBaseProps & {
      id?: string;
      accessibilityLabelledBy?: string;
      maxHeight?: number;
    }
  >;
  TextBody: React.ComponentType<TextBaseProps & { as?: string }>;
  DotCount: React.ComponentType<DotCountBaseProps>;
  HStack: React.ComponentType<BoxBaseProps>;
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
    const triggerId = useMemo(() => generateRandomId('trigger-id--'), []);
    const collapsibleId = useMemo(() => generateRandomId('collapsible-id--'), []);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
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
    const triggerId = useMemo(() => generateRandomId('trigger-id--'), []);
    const collapsibleId = useMemo(() => generateRandomId('collapsible-id--'), []);

    return (
      <>
        <Collapsible collapsed={collapsed} accessibilityLabelledBy={triggerId} id={collapsibleId}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapsible>
        <Button onPress={toggle} aria-controls={collapsibleId} id={triggerId}>
          Click me!
        </Button>
      </>
    );
  };

  const DefaultExpanded = () => {
    const [collapsed, { toggle }] = useToggler(false);
    const triggerId = useMemo(() => generateRandomId('trigger-id--'), []);
    const collapsibleId = useMemo(() => generateRandomId('collapsible-id--'), []);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
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
    const triggerId = useMemo(() => generateRandomId('trigger-id--'), []);
    const collapsibleId = useMemo(() => generateRandomId('collapsible-id--'), []);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
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
    const triggerId = useMemo(() => generateRandomId('trigger-id--'), []);
    const collapsibleId = useMemo(() => generateRandomId('collapsible-id--'), []);

    return (
      <HStack alignItems="center">
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
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
    const triggerId = useMemo(() => generateRandomId('trigger-id--'), []);
    const collapsibleId = useMemo(() => generateRandomId('collapsible-id--'), []);

    return (
      <>
        <Button
          onPress={toggle}
          aria-controls={collapsibleId}
          id={triggerId}
          aria-expanded={!collapsed}
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

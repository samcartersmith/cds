import React from 'react';

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
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  Collapsible: React.ComponentType<CollapsibleBaseProps>;
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

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapsible collapsed={collapsed}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapsible>
      </>
    );
  };

  const RevealTop = () => {
    const [collapsed, { toggle }] = useToggler(true);

    return (
      <>
        <Collapsible collapsed={collapsed}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapsible>
        <Button onPress={toggle}>Click me!</Button>
      </>
    );
  };

  const DefaultExpanded = () => {
    const [collapsed, { toggle }] = useToggler(false);

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapsible collapsed={collapsed}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapsible>
      </>
    );
  };

  const Scroll = () => {
    const [collapsed, { toggle }] = useToggler(true);

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapsible collapsed={collapsed} maxHeight={400}>
          <TextBody as="p">{loremIpsum.repeat(10)}</TextBody>
        </Collapsible>
      </>
    );
  };

  const Horizontal = () => {
    const [collapsed, { toggle }] = useToggler(true);

    return (
      <HStack alignItems="center">
        <Button onPress={toggle}>Click me!</Button>
        <Collapsible collapsed={collapsed} direction="horizontal">
          <DotCount count={100} />
          <DotCount count={1} />
          <DotCount count={99} />
        </Collapsible>
      </HStack>
    );
  };

  const MockCollapsible = () => {
    const [collapsed, { toggle }] = useToggler(true);

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapsible collapsed={collapsed} testID="mock-collapse">
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

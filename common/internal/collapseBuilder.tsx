import React from 'react';
import type {
  CollapseBaseProps,
  TextBaseProps,
  ButtonBaseProps,
  DotCountBaseProps,
  BoxBaseProps,
} from '../types';
import { loremIpsum } from './data/loremIpsum';
import { useToggler } from '../hooks/useToggler';

export type CreateCollapseProps = {
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  Collapse: React.ComponentType<CollapseBaseProps>;
  TextBody: React.ComponentType<TextBaseProps & { as?: string }>;
  DotCount: React.ComponentType<DotCountBaseProps>;
  HStack: React.ComponentType<BoxBaseProps>;
};

export function collapseBuilder({
  Button,
  Collapse,
  TextBody,
  DotCount,
  HStack,
}: CreateCollapseProps) {
  const BasicCollapse = () => {
    const [expanded, { toggle }] = useToggler();

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapse expanded={expanded}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapse>
      </>
    );
  };

  const RevealTop = () => {
    const [expanded, { toggle }] = useToggler();

    return (
      <>
        <Collapse expanded={expanded}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapse>
        <Button onPress={toggle}>Click me!</Button>
      </>
    );
  };

  const DefaultExpanded = () => {
    const [expanded, { toggle }] = useToggler(true);

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapse expanded={expanded}>
          <TextBody as="p">{loremIpsum}</TextBody>
        </Collapse>
      </>
    );
  };

  const Scroll = () => {
    const [expanded, { toggle }] = useToggler();

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapse expanded={expanded} maxHeight={400}>
          <TextBody as="p">{loremIpsum.repeat(10)}</TextBody>
        </Collapse>
      </>
    );
  };

  const Horizontal = () => {
    const [expanded, { toggle }] = useToggler();

    return (
      <HStack alignItems="center">
        <Button onPress={toggle}>Click me!</Button>
        <Collapse expanded={expanded} direction="horizontal">
          <DotCount count={100} />
          <DotCount count={1} />
          <DotCount count={99} />
        </Collapse>
      </HStack>
    );
  };

  const MockCollapse = () => {
    const [expanded, { toggle }] = useToggler();

    return (
      <>
        <Button onPress={toggle}>Click me!</Button>
        <Collapse expanded={expanded} testID="mock-collapse">
          <TextBody as="p">Collapse Content</TextBody>
        </Collapse>
      </>
    );
  };

  return {
    BasicCollapse,
    RevealTop,
    DefaultExpanded,
    Scroll,
    Horizontal,
    MockCollapse,
  };
}

import React from 'react';
import { collapsibleBuilder } from '@cbhq/cds-common/internal/collapsibleBuilder';

import { Collapsible } from '..';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const { BasicCollapsible, RevealTop, DefaultExpanded, Scroll, Horizontal } = collapsibleBuilder({
  Collapsible,
  TextBody,
  Button,
  DotCount,
  HStack,
});

const CollapseScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Basic Collapsible">
        <BasicCollapsible />
      </Example>
      <Example inline title="Reveal top">
        <RevealTop />
      </Example>
      <Example inline title="Horizontal">
        <Horizontal />
      </Example>
      <Example inline title="Default Expanded">
        <DefaultExpanded />
      </Example>
      <Example inline title="Scroll content">
        <Scroll />
      </Example>
    </ExampleScreen>
  );
};

export default CollapseScreen;

import React from 'react';
import { collapsibleBuilder } from '@cbhq/cds-common/internal/collapsibleBuilder';

import { Collapsible as AlphaCollapsible } from '../../alpha/Collapsible';
import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { TextBody } from '../../typography';

const { BasicCollapsible, RevealTop, DefaultExpanded, Scroll, Horizontal } = collapsibleBuilder({
  Collapsible: AlphaCollapsible,
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

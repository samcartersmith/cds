import React from 'react';
import { collapseBuilder } from '@cbhq/cds-common/internal/collapseBuilder';

import { Collapse } from '..';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const { BasicCollapse, RevealTop, DefaultExpanded, Scroll, Horizontal } = collapseBuilder({
  Collapse,
  TextBody,
  Button,
  DotCount,
  HStack,
});

const CollapseScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Basic Collapse">
        <BasicCollapse />
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

import { collapseBuilder, CreateCollapseProps } from '@cbhq/cds-common/internal/collapseBuilder';

import { Collapse } from '..';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';

export default {
  component: Collapse,
  title: 'Core Components/Collapse',
};

export const { BasicCollapse, RevealTop, DefaultExpanded, Scroll, Horizontal } = collapseBuilder({
  Collapse,
  TextBody,
  Button,
  DotCount,
  HStack,
} as CreateCollapseProps);

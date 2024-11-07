import {
  collapsibleBuilder,
  CreateCollapsibleProps,
} from '@cbhq/cds-common/internal/collapsibleBuilder';

import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';
import { TextBody } from '../../typography';
import { Collapsible } from '..';

export default {
  component: Collapsible,
  title: 'Core Components/Collapsible',
};

const { BasicCollapsible, RevealTop, DefaultExpanded, Scroll, Horizontal } = collapsibleBuilder({
  Collapsible,
  TextBody,
  Button,
  DotCount,
  HStack,
} as CreateCollapsibleProps);

export { BasicCollapsible, DefaultExpanded, Horizontal, RevealTop, Scroll };

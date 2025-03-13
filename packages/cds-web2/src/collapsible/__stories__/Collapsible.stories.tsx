import {
  collapsibleBuilder,
  CreateCollapsibleProps,
} from '@cbhq/cds-common2/internal/collapsibleBuilder';

import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Collapsible } from '..';

export default {
  component: Collapsible,
  title: 'Core Components/Collapsible',
};

const { BasicCollapsible, RevealTop, DefaultExpanded, Scroll, Horizontal } = collapsibleBuilder({
  Collapsible,
  Text,
  Button,
  DotCount,
  HStack,
} as CreateCollapsibleProps);

export { BasicCollapsible, DefaultExpanded, Horizontal, RevealTop, Scroll };

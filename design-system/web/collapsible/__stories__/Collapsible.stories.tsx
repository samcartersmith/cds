import {
  collapsibleBuilder,
  CreateCollapsibleProps,
} from '@cbhq/cds-common/internal/collapsibleBuilder';

import { Collapsible } from '..';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';

export default {
  component: Collapsible,
  title: 'Core Components/Collapsible',
};

export const { BasicCollapsible, RevealTop, DefaultExpanded, Scroll, Horizontal } =
  collapsibleBuilder({
    Collapsible,
    TextBody,
    Button,
    DotCount,
    HStack,
  } as CreateCollapsibleProps);

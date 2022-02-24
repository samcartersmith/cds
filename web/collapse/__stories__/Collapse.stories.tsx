import { collapseBuilder, CreateCollapseProps } from '@cbhq/cds-common/internal/collapseBuilder';

import { Collapse } from '..';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';

export default {
  component: Collapse,
  title: 'Core Components/Collapse',
};

export const { BasicCollapse, RevealTop, DefaultExpanded, Scroll } = collapseBuilder({
  Collapse,
  TextBody,
  Button,
} as CreateCollapseProps);

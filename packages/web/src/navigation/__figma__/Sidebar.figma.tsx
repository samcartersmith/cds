import React from 'react';
import figma from '@figma/code-connect';

import { LogoMark } from '../../icons';
import { Sidebar } from '../Sidebar';

figma.connect(
  Sidebar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=252-13321&m=dev',
  {
    imports: [
      "import { Sidebar } from '@cbhq/cds-web/navigation/Sidebar';",
      "import { SidebarItem } from '@cbhq/cds-web/navigation/SidebarItem';",
      "import { LogoMark } from '@cbhq/cds-web/icons/LogoMark';",
    ],
    props: {
      type: figma.enum('type', {
        default: undefined,
        condensed: 'condensed',
        custom: undefined,
        compact: undefined,
      }),
      children: figma.children([
        'Home',
        'Assets',
        'Label',
        'Pay',
        'For you',
        'Earn',
        'Borrow',
        'DeFi',
        'More',
        'Sidebar Item',
      ]),
      collapsed: figma.boolean('collapsed'),
      renderEnd: figma.boolean('show end', {
        true: figma.instance('↳ 🔄 end'),
        false: undefined,
      }),
    },
    example: ({ children, ...props }) => (
      // @ts-expect-error multiple children will be rendered based on figma instance
      <Sidebar logo={<LogoMark />} {...props}>
        {children}
      </Sidebar>
    ),
  },
);

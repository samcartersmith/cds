import React from 'react';
import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';
import { composeProviders } from '@docusaurus/theme-common';
import {
  AnnouncementBarProvider,
  ColorModeProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
  ScrollControllerProvider,
} from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/Layout/Provider';

import { CdsProviders } from '../../LayoutProviders';

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
]);

export default function LayoutProvider({ children }: Props): JSX.Element {
  return (
    <Provider>
      <CdsProviders>{children}</CdsProviders>
    </Provider>
  );
}

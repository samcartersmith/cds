import { createContext } from 'react';

import { SetState } from '@cbhq/cds-common/types';
import { noop } from '@cbhq/cds-utils';

export const defaultLayout = 'expanded';
export type SidebarLayout = 'expanded' | 'condensed';

// Show full sidebar or collapsed version
export const SidebarLayoutContext = createContext<SidebarLayout>(defaultLayout);
export const SetSidebarLayoutContext = createContext<SetState<SidebarLayout>>(noop);

import { createContext } from 'react';

import { noop } from '@cbhq/cds-utils';

import { SetState } from '../types';

export const defaultLayout = 'expanded';
export type SidebarLayout = 'expanded' | 'condensed';

// Show full sidebar or collapsed version
export const SidebarLayoutContext = createContext<SidebarLayout>(defaultLayout);
export const SetSidebarLayoutContext = createContext<SetState<SidebarLayout>>(noop);

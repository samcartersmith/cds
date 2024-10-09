import { type ReactNode } from 'react';

import { useGlobalState } from '../hooks/useGlobalState';
import { type Routes, useRouter } from '../hooks/useRouter';
import { SetCbGptCredentials } from '../views/SetCbGptCredentials';

export type RouteProps = {
  path: Routes;
  children: ReactNode;
  requireCredentials?: boolean;
};

export const Route = ({ path, children, requireCredentials = false }: RouteProps) => {
  const router = useRouter();
  const {
    cbGPT: { apiKey, secret },
  } = useGlobalState();

  if (router.route !== path) return null;

  // override the route state to show the auth view instead
  // may want to refactor this in the future if the user needs to change/edit their credentials
  if (requireCredentials && (!apiKey || !secret)) {
    return <SetCbGptCredentials />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

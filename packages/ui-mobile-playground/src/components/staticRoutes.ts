import { keyToRouteName } from './keyToRouteName';

export const initialRouteKey = 'Examples' as const;
export const searchRouteKey = 'Search' as const;

export const initialRouteName = keyToRouteName(initialRouteKey);
export const searchRouteName = keyToRouteName(searchRouteKey);

export const createStaticRoute = (key: string, component: () => JSX.Element) => ({
  key,
  getComponent: () => component,
});

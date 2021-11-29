/* eslint-disable @typescript-eslint/ban-types */
import type { StackNavigationProp } from '@react-navigation/stack';
import { codegenRoutes } from './codegenRoutes';

type CodegenRoutes = typeof codegenRoutes;
type TitleOverrides = { [key in CodegenRoutes[number]['key']]?: string };

export type CdsRoutes = typeof routes;
export type CdsRoute = CdsRoutes[number];
export type CdsRouteParamList = { [key in CdsRoute['key']]: {} };
export type CdsUseNavigation = StackNavigationProp<CdsRouteParamList>;

const titleOverrides: TitleOverrides = {
  Text: 'Text (all)',
};

export const routes = codegenRoutes.map((route) => ({
  key: route.key,
  navigationProps: {
    name: route.key,
    params: {},
  },
  stackProps: {
    key: route.key,
    name: route.key,
    getComponent: route.getComponent,
    options: {
      title: titleOverrides[route.key] ?? route.key,
    },
  },
}));

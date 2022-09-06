export type PlaygroundRoute = {
  key: string;
  getComponent: () => React.ComponentType<unknown>;
};

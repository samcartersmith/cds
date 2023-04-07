type Scope = {
  /** List every exported function that will be deleted
   * @danger If a component is being deprecated, every export in the component's file must be listed
   */
  exportNames?: string[];
  /** List every prop that is being deprecated */
  propNames?: string[];
};

export type MigrationType = 'renamed' | 'replaced' | 'path' | 'api' | 'removed' | 'propValue';
export type MigrationMap = Record<
  Extract<MigrationType, 'api' | 'propValue'>,
  Record<string, string | null>
> &
  Record<Extract<MigrationType, 'replaced' | 'path' | 'rename'>, string>;

type SharedProps = {
  name: string;
  package: 'common' | 'mobile' | 'web';
  path: string;
  type: MigrationType[] | MigrationType;
  migrationMap?: Partial<MigrationMap>;
};

/** Deprecation config for Components only. If you are deprecating a prop and not the parent component, use the prop field */
export type Component = {
  scope: Scope;
} & SharedProps;

type Prop = {
  components: string[];
} & Pick<SharedProps, 'package' | 'name' | 'type' | 'migrationMap'>;

type Type = {
  scope: Pick<Scope, 'exportNames'>;
} & SharedProps;

type Param = {
  function: string;
  params: string[];
} & Omit<SharedProps, 'name'>;

export type Deprecation = {
  /** Which quarter all these deprecations will be deleted */
  endOfLife: `Q${number}202${number}`;
  components?: Partial<Component>[];
  types?: Type[];
  props?: Prop[];
  hooks?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  functions?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  tokens?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  params?: Param[];
};

import { Expand } from '@cbhq/cds-common';

type Scope = {
  /** List every exported function that will be deleted
   * @danger If a component is being deprecated, every export in the component's file must be listed
   */
  exportNames?: string[];
  /** List every prop that is being deprecated */
  propNames?: string[];
};

export type MigrationType = 'renamed' | 'replaced' | 'path' | 'api' | 'removed' | 'propValue';
export type MigrationMap = Expand<
  Record<Extract<MigrationType, 'api' | 'propValue'>, Record<string, string | null>> &
    Record<Extract<MigrationType, 'replaced' | 'path' | 'rename'>, string | string[]>
>;

type SharedProps = {
  name: string;
  package: 'common' | 'mobile' | 'web';
  path: string;
  type: MigrationType[] | MigrationType;
  migrationMap?: Partial<MigrationMap>;
};

/** Deprecation config for Components only. If you are deprecating a prop and not the parent component, use the prop field */
export type Component = Expand<
  {
    scope: Scope;
  } & SharedProps
>;

type Prop = Expand<
  {
    components?: string[];
  } & Pick<SharedProps, 'package' | 'name' | 'type' | 'migrationMap'>
>;

type Type = Expand<
  {
    scope: Pick<Scope, 'exportNames'>;
  } & SharedProps
>;

type Param = {
  function: string;
  params: string[];
} & Omit<SharedProps, 'name'>;

export type Deprecation = {
  /** Which quarter all these deprecations will be deleted */
  endOfLife: `Q${number}202${number}`;
  /**
   * This is the branch of the latest major release before the deprecations will be deleted
   * this will be used to populate the github URL's for deprecations prior to deletion
   * @example 'v4.1.3' in https://github.cbhq.net/frontend/cds/blob/v4.1.3
   */
  prevMajorVersion: string;
  /**
   * Major release where the deprecations will be deleted
   */
  breakingRelease?: string;
  components?: Partial<Component>[];
  types?: Type[];
  props?: Prop[];
  hooks?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  functions?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  tokens?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  params?: Param[];
};

export type DeprecationGroups = keyof Omit<
  Deprecation,
  'endOfLife' | 'prevMajorVersion' | 'breakingRelease'
>;

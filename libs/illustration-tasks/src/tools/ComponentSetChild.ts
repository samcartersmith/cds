import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import { getSize } from '../helpers/getSize';

import type { ComponentSet } from './ComponentSet';
import { oldGlyphIcons } from './oldGlyphIcons';
import { uiIconExceptions } from './uiIconExceptions';

export type Primitive = string | number | boolean;
export type ComponentSetChildMetadata = Record<string, Primitive>;

type ComponentSetChildProps = Record<string, Primitive>;

export type ComponentSetChildShape = {
  props?: ComponentSetChildProps;
  metadata?: ComponentSetChildMetadata;
};

export function propsObjectToKebabCaseString(props: ComponentSetChildProps) {
  if (props.active !== undefined) {
    const activeKey = props.active ? `active` : `inactive`;
    return `${props.size}-${activeKey}`;
  }
  return `${props.size}`;
}

const getBaseIconName = (currentIconName: string) => {
  // Remove the active/inactive suffix first
  const currentIconNameWithoutActiveSuffix = currentIconName.replace(/-active$|-inactive$/, '');

  // Remove the prefix (e.g., 'ui-') and numeric suffix (e.g., '-12')
  const currentIconBase = currentIconNameWithoutActiveSuffix
    .replace(/^ui-/, '')
    .replace(/^nav-/, '')
    .replace(/-\d+$/, '');

  return currentIconBase;
};

export function determineSVGName(currentIconName: string, item: ComponentSetChild) {
  // If the current icon name already exists in our previous glyphMap, we will use the old name
  // Otherwise, we will map the name to appropriate svg (active or inactive)
  // ie.
  // - commentActive-12 will map to active svg, commentActive-12-inactive (net new) will map to inactive svg
  // - ui-info-12 will map to inactive svg, ui-info-12-inactive (net new) will map to inactive svg

  const currentIconNameWithoutActiveSuffix = currentIconName.replace(/-active$|-inactive$/, '');
  const currentIconBaseName = getBaseIconName(currentIconName);

  if (oldGlyphIcons.includes(currentIconNameWithoutActiveSuffix)) {
    /**
     * Process Navigation Icons
     * - Nav icons ALWAYS have -active or -inactive states
     * - We can return the preprocessed currentIconName which will add the active prop by default
     * - Nav format: `nav-${name}-${sourceSize}-${activeState}`
     */
    if (item.componentSet.type === 'nav') {
      return currentIconName;
    }

    /**
     * Process UI Icons
     * - UI icons have various and inconsistent nomenclature in old glyphMap
     * - Within the new figma file for Icons2.0, all ui icons have both -active and -inactive svgs
     * - We MUST only add net new names and keep all the old ones
     * - We MUST map all old UI icons to their correct svg state  (active/inactive)
     *
     * Edgecases:
     * - Case 0: UI Legacy names in the exception list with no `Inactive`/`Active` in their name (ui-info-12, ui-comment-12). We assign the active svg to it and we also add a new -inactive variation (ui-info-12-inactive)
     * - Case 1: Legacy names with no `Inactive`/`Active` in their name (ui-info-12, ui-comment-12). We handle ui-info and ui-comment as inactive and not rename. Add an -active variation (ui-comment-12-inactive).
     * - Case 2: Legacy names with `Active` in their name (ui-royaltyActive-12). We handle all Active cases separately - default to active and not rename. Add an -inactive variant (ui-royaltyActive-12-inactive).
     * - Case 3: Legacy names with `Inactive` in their name (ui-royaltyInactive-12). We handle all Inactive cases separately - default to inactive and not rename. Add an -active variation (ui-royaltyInactive-12-active).
     */

    // Case 0: check exception list and assign as -active by default.
    if (
      !currentIconName.includes('Active') &&
      !currentIconName.includes('Inactive') &&
      item.props &&
      uiIconExceptions.includes(currentIconBaseName)
    ) {
      return item.props.active === true ? currentIconNameWithoutActiveSuffix : currentIconName;
    }

    // Case 2: we will handle all Active cases separately  - default to active and not rename
    if (
      currentIconName.includes('Active') && // ui-royaltyActive
      item.props
    ) {
      return item.props.active === true ? currentIconNameWithoutActiveSuffix : currentIconName;
    }

    // Case 3: we will handle all Inactive cases separately - default to inactive and not rename, add an -active variation
    if (
      currentIconName.includes('Inactive') && // ui-royaltyInactive
      item.props
    ) {
      return item.props.active === false ? currentIconNameWithoutActiveSuffix : currentIconName;
    }

    // Case 1: we will handle any icons that are not in exception list as inactive and not rename, add an -active variation
    if (
      !currentIconName.includes('Active') &&
      !currentIconName.includes('Inactive') &&
      item.props &&
      !uiIconExceptions.includes(currentIconBaseName)
    ) {
      return item.props.active === false ? currentIconNameWithoutActiveSuffix : currentIconName;
    }
  }
  // Net new icons
  // Set inactive ui icons to not have any -active / -inactive suffix
  // All net new ui icons will have -active suffix for active prop only
  // All net new nav icons will follow normal naming scheme
  return item.componentSet.type === 'ui'
    ? item.props?.active === true
      ? currentIconName
      : currentIconNameWithoutActiveSuffix
    : currentIconName;
}

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

export type ComponentSetChildParams<ChildShape extends ComponentSetChildShape> = {
  componentSet: ComponentSet<ChildShape>;
  metadata?: ComponentSetChildMetadata;
  node: NodeResponseWithMetadata;
  props: ComponentSetChildProps;
  hashSource: string;
};

export class ComponentSetChild<ChildShape extends ComponentSetChildShape = ComponentSetChildShape> {
  public readonly nodeType = 'componentSetChild';

  public readonly componentSet: ComponentSet<ChildShape>;

  public readonly id: string;

  public readonly node: NodeResponseWithMetadata;

  public readonly width: number;

  public readonly height: number;

  public readonly props: ChildShape['props'] = {} as ChildShape['props'];

  public readonly hashSource: string;

  private _metadata: ChildShape['metadata'] = undefined;

  constructor({
    componentSet,
    node,
    metadata,
    props,
    hashSource,
  }: ComponentSetChildParams<ChildShape>) {
    const { document } = node;
    const { width, height } = getSize(document);
    this.componentSet = componentSet;
    this._metadata = metadata;
    this.id = document.id;
    this.node = node;
    this.width = width;
    this.height = height;
    this.props = props;
    this.hashSource = hashSource;
  }

  public get createdAt() {
    return this.componentSet.createdAt;
  }

  public get lastUpdated() {
    return this.componentSet.lastUpdated;
  }

  public get metadata() {
    return this._metadata;
  }

  public setMetadata(metadata: ChildShape['metadata']) {
    this._metadata = { ...this._metadata, ...metadata };
  }

  public get version() {
    return this.componentSet.version;
  }

  public setVersion(version: number) {
    this.componentSet.setVersion(version);
  }

  static stringToPropsObject(str: string) {
    const obj: ComponentSetChildProps = {};
    str.split(',').forEach((item) => {
      const [key, value] = item.trim().split('=');
      const prop = key.trim();
      if (isNumeric(value)) {
        const numericValue = Number(value);
        obj[prop] = numericValue;
        /** Return original value */
      } else if (['true', 'false'].includes(value)) {
        /** Convert string booleans to boolean */
        const isTrue = value === 'true';
        obj[prop] = isTrue;
        /** Convert numeric strings to number */
      } else {
        obj[prop] = value;
      }
    });

    return obj;
  }

  static propsObjectToString(props: ComponentSetChildProps) {
    return Object.keys(props)
      .map((key) => {
        return `${key}=${props[key]}`;
      })
      .join(', ');
  }

  static propsObjectToKebabCaseString(props: ComponentSetChildProps) {
    if (props.active !== undefined) {
      const activeKey = props.active ? `active` : `inactive`;
      return `${props.size}-${activeKey}`;
    }
    return `${props.size}`;
  }

  /**
   * If componentSet.type is 'ui' and icon is size 12, result will be `ui-close-12`
   * If componentSet.type is 'nav' and icon is size 12, result will be `nav-home-12-active`
   */
  static getSvgName(item: ComponentSetChild) {
    const fullName = [
      item.componentSet.type,
      item.componentSet.name,
      item.props ? ComponentSetChild.propsObjectToKebabCaseString(item.props) : undefined,
    ]
      .filter(Boolean)
      .join('-');

    return determineSVGName(fullName, item);
  }

  static normalize<ChildShape extends ComponentSetChildShape>(
    componentSet: ComponentSet<ChildShape>,
    item: Pick<ComponentSetChild<ChildShape>, keyof ComponentSetChild<ChildShape>>,
  ) {
    return (
      item instanceof ComponentSetChild ? item : { ...item, componentSet }
    ) as ComponentSetChild<ChildShape>;
  }

  public toJSON() {
    return {
      props: this.props,
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }
}

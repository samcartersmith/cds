/* eslint-disable no-underscore-dangle */
import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import { getSize } from '../helpers/getSize';

import type { ComponentSet } from './ComponentSet';

export type Primitive = string | number | boolean;
export type ComponentSetChildMetadata = Record<string, Primitive>;

type ComponentSetChildProps = Record<string, Primitive>;

export type ComponentSetChildShape = {
  props?: ComponentSetChildProps;
  metadata?: ComponentSetChildMetadata;
};

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
    return [
      item.componentSet.type,
      item.componentSet.name,
      item.props ? ComponentSetChild.propsObjectToKebabCaseString(item.props) : undefined,
    ]
      .filter(Boolean)
      .join('-');
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

/* eslint-disable no-underscore-dangle */
import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import { getSize } from '../helpers/getSize';

import type { ComponentSet } from './ComponentSet';

export type Primitive = string | number | boolean;

export type ComponentSetChildShape = {
  props?: Record<string, Primitive>;
  metadata?: Record<string, Primitive>;
};

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

export type ComponentSetChildParams<ChildShape extends ComponentSetChildShape> = {
  componentSet: ComponentSet<ChildShape>;
  metadata?: Record<string, Primitive>;
  node: NodeResponseWithMetadata;
};

export class ComponentSetChild<ChildShape extends ComponentSetChildShape = ComponentSetChildShape> {
  public readonly nodeType = 'componentSetChild';

  public readonly componentSet: ComponentSet<ChildShape>;

  public readonly id: string;

  public readonly node: NodeResponseWithMetadata;

  public readonly width: number;

  public readonly height: number;

  public readonly props: ChildShape['props'] = {} as ChildShape['props'];

  private _metadata: ChildShape['metadata'] = undefined;

  public readonly propsQueryParams: string;

  constructor({ componentSet, node, metadata }: ComponentSetChildParams<ChildShape>) {
    const { document } = node;
    const { width, height } = getSize(document);
    this.componentSet = componentSet;
    this._metadata = metadata;
    this.id = document.id;
    this.node = node;
    this.width = width;
    this.height = height;

    /** Coerce the key/value format from Figma to something iterable
     * @example "size=12, active=false" | "size=12, active=true"
     */
    const propsAsParams = new URLSearchParams(node.document.name.replace(',', '&'));
    this.propsQueryParams = propsAsParams.toString();

    for (const [originalProp, originalValue] of propsAsParams) {
      const prop = originalProp.trim() as keyof ChildShape['props'];
      const value = originalValue.trim();
      if (isNumeric(value)) {
        const numericValue = Number(value);
        // @ts-expect-error this is fine
        this.props[prop] = numericValue;
        /** Return original value */
      } else if (['true', 'false'].includes(value)) {
        /** Convert string booleans to boolean */
        const isTrue = value === 'true';
        // @ts-expect-error this is fine
        this.props[prop] = isTrue;
        /** Convert numeric strings to number */
      } else {
        // @ts-expect-error this is fine
        this.props[prop] = value;
      }
    }
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

  public toJSON() {
    return {
      props: this.props,
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }
}

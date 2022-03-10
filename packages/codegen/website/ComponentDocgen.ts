/* eslint-disable class-methods-use-this */
import { ComponentDoc, PropItem } from 'react-docgen-typescript';
import { pascalCase } from '@cbhq/cds-utils/string';

import { normalizeOptions, PropertyDocgen, PropOptions } from './PropertyDocgen';
import { ComponentDocgenParams } from './types';

type PropItemWithOptions = {
  options: PropOptions;
} & PropItem;

type Docgen = {
  web?: ComponentDoc;
  mobile?: ComponentDoc;
} & ComponentDocgenParams;

type Platform = 'web' | 'mobile';

const isExtendedFromLib = (prop: PropItem) => {
  return prop.parent?.fileName.includes('node_modules');
};

export class ComponentDocgen {
  slug: string;

  displayName: string;

  docgen: Docgen;

  web: PropItemWithOptions[] | undefined;

  mobile: PropItemWithOptions[] | undefined;

  constructor(params: Docgen) {
    const { web, mobile, displayName, slug } = params;
    if (!web && !mobile) {
      throw new Error(`No API docs was generated for ${displayName}.`);
    }
    this.slug = slug;
    this.displayName = displayName;
    this.docgen = params;
    this.web = web && this.convertObjectToArray(web.props);
    this.mobile = mobile && this.convertObjectToArray(mobile.props);
  }

  convertObjectToArray(props: ComponentDoc['props']) {
    return Object.values(props).reduce((prev, next) => {
      return [...prev, { ...next, options: normalizeOptions(next.type) }];
    }, [] as PropItemWithOptions[]);
  }

  get importPath() {
    let endPath = this.docgen.importPath.replace(/\.(ts|tsx)$/, '');
    if (this.docgen.displayName === 'Text') {
      endPath = 'typography/Text*';
    }

    if (this.web && !this.mobile) {
      return `@cbhq/cds-web/${endPath}`;
    }

    if (this.mobile && !this.web) {
      return `@cbhq/cds-mobile/${endPath}`;
    }

    return `@cbhq/cds-(web|mobile)/${endPath}`;
  }

  get sourceUrl() {
    return `https://github.cbhq.net/mono/repo/blob/master/eng/shared/design-system/${
      !this.web ? 'mobile' : 'web'
    }/${this.docgen.importPath}`;
  }

  findProp(props: PropItemWithOptions[] | undefined, name: string) {
    return props?.find((prop) => prop.name === name);
  }

  get sharedProps() {
    const sharedCopy = [];
    if (this.web === undefined || this.mobile === undefined) {
      return undefined;
    }
    for (const webVersion of this.web) {
      const mobileVersion = this.findProp(this.mobile, webVersion.name);
      // Do not include the prop if it is extended from library type on both platforms.
      if (mobileVersion && !(isExtendedFromLib(webVersion) && isExtendedFromLib(mobileVersion))) {
        sharedCopy.push({
          ...mobileVersion,
          ...webVersion,
          mobileOptions: mobileVersion.options ?? [],
          webOptions: webVersion.options ?? [],
          status: 'isShared' as const,
        });
      }
    }
    return sharedCopy;
  }

  getPlatformSpecificProps(
    platform: Platform,
    otherPlatformProps: PropItemWithOptions[] | undefined,
  ) {
    const platformProps = this[platform];
    if (platformProps === undefined) {
      return undefined;
    }
    const platformSpecificProps = [];
    for (const prop of platformProps) {
      const otherVersion = this.findProp(otherPlatformProps, prop.name);
      // Do not include props extended from libraries as platform specific props.
      if (!otherVersion && !isExtendedFromLib(prop)) {
        platformSpecificProps.push({
          ...prop,
          status: `is${pascalCase(platform)}Only` as const,
          [`${platform}Options`]: prop.options,
        });
      }
    }
    return platformSpecificProps;
  }

  get mobileOnlyProps() {
    return this.getPlatformSpecificProps('mobile', this.web);
  }

  get webOnlyProps() {
    return this.getPlatformSpecificProps('web', this.mobile);
  }

  get props() {
    return [
      ...(this.webOnlyProps ?? []),
      ...(this.mobileOnlyProps ?? []),
      ...(this.sharedProps ?? []),
    ]
      .reduce((prev, prop) => {
        return [...prev, new PropertyDocgen(prop)];
      }, [] as PropertyDocgen[])
      .sort((prev, next) => prev.name.localeCompare(next.name));
  }
}

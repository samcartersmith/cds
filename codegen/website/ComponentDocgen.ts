import { kebabCase } from '@cds/utils';
import { ComponentDoc, PropItem } from 'react-docgen-typescript';

import { PropOptions, PropertyDocgen, normalizeOptions } from './PropertyDocgen';

interface PropItemWithOptions extends PropItem {
  options: PropOptions;
}

export class ComponentDocgen {
  webDocgen: ComponentDoc;
  mobileDocgen: ComponentDoc;
  componentName: string;

  constructor(web: ComponentDoc, mobile: ComponentDoc, componentName: string) {
    this.webDocgen = web;
    this.mobileDocgen = mobile;
    this.componentName = componentName;
  }

  convertObjectToArray(props: ComponentDoc['props']) {
    return Object.values(props).reduce((prev, next) => {
      return [...prev, { ...next, options: normalizeOptions(next.type) }];
    }, [] as PropItemWithOptions[]);
  }

  get id() {
    return kebabCase(this.componentName);
  }

  get webProps() {
    return this.convertObjectToArray(this.webDocgen.props).map(({ options, ...item }) => ({
      ...item,
      webOptions: options,
      mobileOptions: [],
    }));
  }

  get mobileProps() {
    return this.convertObjectToArray(this.mobileDocgen.props).map(({ options, ...item }) => ({
      ...item,
      mobileOptions: options,
      webOptions: [],
    }));
  }

  findMobileProp = (name: string) => {
    return this.mobileProps.find(mobileItem => mobileItem.name === name);
  };

  findWebProp = (name: string) => {
    return this.webProps.find(mobileItem => mobileItem.name === name);
  };

  get sharedProps() {
    const sharedCopy = [];
    for (const webVersion of this.webProps) {
      const mobileVersion = this.findMobileProp(webVersion.name);
      if (mobileVersion) {
        sharedCopy.push({
          ...mobileVersion,
          ...webVersion,
          mobileOptions: mobileVersion.mobileOptions,
          webOptions: webVersion.webOptions,
          status: 'isShared' as const,
        });
      }
    }
    return sharedCopy;
  }

  get mobileOnlyProps() {
    const mobileOnly = [];
    for (const mobileVersion of this.mobileProps) {
      const webVersion = this.findWebProp(mobileVersion.name);
      if (!webVersion) {
        mobileOnly.push({
          ...mobileVersion,
          status: 'isMobileOnly' as const,
        });
      }
    }
    return mobileOnly;
  }

  get webOnlyProps() {
    const webOnly = [];
    for (const webVersion of this.webProps) {
      const mobileVersion = this.findMobileProp(webVersion.name);
      if (!mobileVersion) {
        webOnly.push({
          ...webVersion,
          status: 'isWebOnly' as const,
        });
      }
    }
    return webOnly;
  }

  get props() {
    return [...this.webOnlyProps, ...this.mobileOnlyProps, ...this.sharedProps]
      .reduce((prev, prop) => {
        return [...prev, new PropertyDocgen(prop)];
      }, [] as PropertyDocgen[])
      .sort((prev, next) => prev.name.localeCompare(next.name));
  }
}

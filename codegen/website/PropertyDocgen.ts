import { PropItem } from 'react-docgen-typescript';

type CustomDocgenTag = keyof typeof regexes;
export type PropOptions = string[];
export type PropStatus = 'isMobileOnly' | 'isWebOnly' | 'isShared';
export interface CustomPropItem extends PropItem {
  badges?: string[];
  webOptions?: PropOptions;
  mobileOptions?: PropOptions;
  status: PropStatus;
}

const regexes = {
  internal: /@internal([^\\\n]*)/,
  danger: /@danger([^\\\n]*)/,
  link: /@link([^\\\n]*)/,
  deprecated: /@deprecated([^\\\n]*)/,
  experimental: /@experimental([^\\\n]*)/,
  removeQuotes: /['"]+/g,
};

const removeQuotes = (content: string) => {
  return content.replace(regexes.removeQuotes, '');
};

const formatOptions = (options: string[]) => {
  if (options && options.includes('0')) {
    return options
      .map(item => Number(item))
      .sort((first, second) => first - second)
      .map(item => `${item}`);
  }

  return options.sort();
};

export const normalizeOptions = (type: PropItem['type']) => {
  return formatOptions(
    type.value
      ? type.value
          .filter(({ value }: { value: unknown }) => value !== 'undefined')
          .map(({ value }: { value: unknown }) =>
            typeof value === 'string' ? removeQuotes(value) : `${value}`
          )
      : []
  );
};

export class PropertyDocgen {
  docgen: PropItem;
  webOptions: PropOptions;
  mobileOptions: PropOptions;
  status: PropStatus;

  constructor({ webOptions, mobileOptions, status, ...item }: CustomPropItem) {
    this.docgen = item;
    this.webOptions = webOptions ?? [];
    this.mobileOptions = mobileOptions ?? [];
    this.status = status;
  }

  extractDocgen = (regex: CustomDocgenTag) => {
    const match = this.docgen.description.match(regexes[regex]);
    return match ? match[1].trim() : null;
  };

  get name() {
    return this.docgen.name;
  }

  get required() {
    return this.docgen.required;
  }

  get defaultValue() {
    return this.docgen.defaultValue?.value;
  }

  get description() {
    let contentCopy = this.docgen.description;
    for (const regex of Object.values(regexes)) {
      contentCopy = contentCopy.replace(regex, '');
    }
    return contentCopy.replace(/\n/g, ' ');
  }

  get internal() {
    return this.extractDocgen('internal') ?? '';
  }

  get danger() {
    return this.extractDocgen('danger') ?? '';
  }

  get link() {
    return this.extractDocgen('link') ?? '';
  }

  get badges() {
    const badgesCopy = [];

    if (this.status === 'isMobileOnly') {
      badgesCopy.push(`<Badge variant="mobile" />`);
    }
    if (this.status === 'isWebOnly') {
      badgesCopy.push(`<Badge variant="web" />`);
    }
    if (this.danger) {
      badgesCopy.push(`<Badge variant="danger" order={${badgesCopy.length + 1}} />`);
    }
    if (this.internal) {
      badgesCopy.push(`<Badge variant="internal" order={${badgesCopy.length + 1}} />`);
    }
    if (this.docgen.description.includes('deprecated')) {
      badgesCopy.push(`<Badge variant="deprecated" order={${badgesCopy.length + 1}} />`);
    }
    if (this.docgen.description.includes('experimental')) {
      badgesCopy.push(`<Badge variant="experimental" order={${badgesCopy.length + 1}} />`);
    }

    return badgesCopy.join(' ');
  }

  get heading() {
    return `${this.name} ${this.badges}`;
  }
}

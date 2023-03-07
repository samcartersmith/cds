import lightStyleMap from '@cbhq/figma-styles/__generated__/ui/light/colorStyleMap';

import type { Density, FigmaMessage } from './types';

figma.showUI(__html__);
figma.skipInvisibleInstanceChildren = true;

type IconSize = '08' | '12' | '16' | '24' | '32';

type IconComponent = SceneNode & {
  name: string;
  mainComponent: ComponentNode;
  variantProperties: {
    size: IconSize;
    active?: boolean;
  };
  x: number;
  y: number;
  children: VectorNode[];
};

type CreateAliasedIconComponentsParams = {
  masterIconComponents: IconComponent[];
  density: Density;
  description: string;
  startXPosition: number;
};

type CreateAliasedComponentSetParams = {
  aliasedIconComponents: ComponentNode[];
  getYPosition: (height: number) => number;
  masterComponentSet: ComponentSetNode;
  fillStyleId: string;
};

const GUTTER_BETWEEN_COMPONENT_SETS = 8;

function normalizeName(name: string) {
  return name.replace('nav/', '').replace('ui/', '');
}

function iconComponentSetFilter(item: SceneNode): item is ComponentSetNode {
  return (
    item.type === 'COMPONENT_SET' && (item.name.startsWith('ui') || item.name.startsWith('nav'))
  );
}

function iconComponentFilter(item: SceneNode): item is IconComponent {
  if (item.type === 'COMPONENT' && item.children.length !== 0) {
    const variantProperties = item?.variantProperties;
    if (variantProperties) {
      return 'size' in item.variantProperties;
    }
  }
  return false;
}

async function createAliasedIconComponentSet({
  aliasedIconComponents,
  getYPosition,
  masterComponentSet,
  fillStyleId,
}: CreateAliasedComponentSetParams) {
  const aliasedComponentSet = figma.combineAsVariants(aliasedIconComponents, figma.currentPage);
  /** Copy over basic attributes from master component set to our aliased one */
  aliasedComponentSet.name = masterComponentSet.name;
  aliasedComponentSet.description = masterComponentSet.description;
  aliasedComponentSet.cornerRadius = masterComponentSet.cornerRadius;
  aliasedComponentSet.x = masterComponentSet.x;
  aliasedComponentSet.y = getYPosition(aliasedComponentSet.height);
  aliasedComponentSet.fillStyleId = fillStyleId;
}

function createAliasedIconComponents({
  description,
  density,
  masterIconComponents,
  startXPosition,
}: CreateAliasedIconComponentsParams) {
  const sizeMap = {
    normal: {
      '12': 'xs (12)',
      '16': 's (16)',
      '24': 'm (24)',
      '32': 'l (32)',
    },
    dense: {
      '08': 'xs (8)',
      '12': 's (12)',
      '16': 'm (16)',
      '24': 'l (24)',
    },
  }[density];
  let lastTotalX = startXPosition;

  return masterIconComponents
    .filter((instance) => {
      const { size } = instance.variantProperties;
      const sizeAlias = sizeMap[size];
      return Boolean(sizeAlias);
    })
    .map((instance) => {
      const { size, active } = instance.variantProperties;
      const sizeAlias = sizeMap[size];
      const vector = instance.children[0];

      /** Standardize names for vector child (the immediate child to variant component) */
      vector.name = 'icon';

      const aliasedComponent = figma.createComponent();
      aliasedComponent.description = description;
      aliasedComponent.resizeWithoutConstraints(instance.width, instance.height);
      aliasedComponent.x = lastTotalX;
      lastTotalX += instance.width;

      if (active) {
        aliasedComponent.name = `size=${sizeAlias}, active=${active}`;
      } else {
        aliasedComponent.name = `size=${sizeAlias}`;
      }

      aliasedComponent.appendChild(vector);
      return aliasedComponent;
    });
}

const fillStyles = {
  normal: {
    nav: lightStyleMap['color-green-10'].key,
    ui: lightStyleMap['color-blue-10'].key,
  },
  dense: {
    nav: lightStyleMap['color-purple-10'].key,
    ui: lightStyleMap['color-orange-10'].key,
  },
};

export async function createIcons({ density }: { density: Density }) {
  const [navFillStyle, uiFillStyle] = await Promise.all([
    figma.importStyleByKeyAsync(fillStyles[density].nav),
    figma.importStyleByKeyAsync(fillStyles[density].ui),
  ]);

  const sortedIconComponentSets = figma.currentPage.selection
    .filter(iconComponentSetFilter)
    .sort((a, b) => {
      const nameA = normalizeName(a.name);
      const nameB = normalizeName(b.name);
      return nameA.localeCompare(nameB);
    });

  let lastTotalY = sortedIconComponentSets[0].y;

  /** Please see the figma-icons-plugin/README.md for more details about what this plugin does. */
  await Promise.all(
    sortedIconComponentSets.map(async (masterComponentSet) => {
      const isNavIcon = masterComponentSet.name.startsWith('nav');
      const { description } = masterComponentSet;

      const masterIconComponents = masterComponentSet.children.filter(iconComponentFilter);

      const aliasedIconComponents = createAliasedIconComponents({
        description,
        density,
        masterIconComponents,
        startXPosition: masterComponentSet.x,
      });

      await createAliasedIconComponentSet({
        aliasedIconComponents,
        fillStyleId: isNavIcon ? navFillStyle.id : uiFillStyle.id,
        masterComponentSet,
        getYPosition: (height: number) => {
          const yPosition = lastTotalY;
          const heightWithGutter = height + GUTTER_BETWEEN_COMPONENT_SETS;
          lastTotalY += heightWithGutter;
          return yPosition;
        },
      });

      /** Remove the masterComponentSet now that we have the aliased one */
      masterComponentSet.remove();
    }),
  );
}

function handleMessage({ type }: FigmaMessage) {
  if (type === 'create-dense-icons') {
    void createIcons({ density: 'dense' });
  }

  if (type === 'create-normal-icons') {
    void createIcons({ density: 'normal' });
  }
}

figma.ui.on('message', handleMessage);

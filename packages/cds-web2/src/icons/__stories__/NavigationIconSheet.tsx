import { memo } from 'react';
import { css, type LinariaClassName } from '@linaria/core';
import { sortNamesByOldOrder } from '@cbhq/cds-common2/internal/utils/sortIconsForVisReg';
import type { IconSize } from '@cbhq/cds-common2/types/IconSize';
import { NavIconName } from '@cbhq/cds-icons';
import names from '@cbhq/cds-icons/__generated__/nav/data/names';
import namesOld from '@cbhq/cds-icons/__generated__/nav/data/names-old';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { sourceSizeMap } from '../Icon';
import { NavigationIcon, NavigationIconName } from '../NavigationIcon';

type SvgFromFigmaProps = { name: NavigationIconName; size: IconSize; active?: boolean };

const iconFontOverride = css`
  span {
    color: var(--color-fg) !important;
  }
`;

const sizeStyles: {
  [key in IconSize]: LinariaClassName;
} = {
  xs: css`
    width: var(--iconSize-xs);
    height: var(--iconSize-xs);
  `,
  s: css`
    width: var(--iconSize-s);
    height: var(--iconSize-s);
  `,
  m: css`
    width: var(--iconSize-m);
    height: var(--iconSize-m);
  `,
  l: css`
    width: var(--iconSize-l);
    height: var(--iconSize-l);
  `,
};

function SvgFromFigma({ name, size, active }: SvgFromFigmaProps) {
  // const { iconSize, sourceSize } = sourceSizeMap(size);
  const sourceSize = sourceSizeMap[size];

  const activeSuffix = active ? 'active' : 'inactive';
  const svgPath = `@cbhq/cds-icons/__generated__/nav/svg/nav-${name}-${sourceSize}-${activeSuffix}.svg`;
  return <img alt={name} className={sizeStyles[size]} src={svgPath} />;
}

function DisclaimerText() {
  return (
    <Text as="p" font="legal">
      The blue icons are icons loaded originally from Figma. This way you can see if the font
      generated icon differs from how the icon looks in Figma.
    </Text>
  );
}

type NavigationIconSheetProps = {
  startIndex?: number;
  endIndex?: number;
};

export const NavigationIconSheet = memo(function NavigationIconSheet({
  startIndex,
  endIndex,
}: NavigationIconSheetProps) {
  const sortedNames = sortNamesByOldOrder(namesOld, names) as NavIconName[]; // Use sorted names

  return (
    <VStack gap={2}>
      <DisclaimerText />
      <HStack flexWrap="wrap" gap={2} paddingBottom={2}>
        {sortedNames.slice(startIndex, endIndex).map((name) => {
          return (
            <HStack key={`nav-icon-wrapper-${name}`} flexWrap="wrap" gap={2}>
              <VStack gap={2}>
                <HStack alignItems="center" className={iconFontOverride} gap={2}>
                  {(['xs', 's', 'm', 'l'] as const).map((size) => {
                    return (
                      <>
                        <NavigationIcon name={name} size={size} />
                        <NavigationIcon active name={name} size={size} />
                      </>
                    );
                  })}
                </HStack>
                <HStack alignItems="center" gap={2}>
                  {(['xs', 's', 'm', 'l'] as const).map((size) => {
                    return (
                      <>
                        <SvgFromFigma name={name} size={size} />
                        <SvgFromFigma active name={name} size={size} />
                      </>
                    );
                  })}
                </HStack>
              </VStack>
            </HStack>
          );
        })}
      </HStack>
    </VStack>
  );
});

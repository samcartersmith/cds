import React from 'react';
import { css } from 'linaria';
import { IconName, IconSize, NavigationIconName, NavigationIconSize } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { iconNames, navNames } from '@cbhq/cds-common/internal/data/iconData';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';

import { HStack, VStack } from '../../layout';
import { palette } from '../../tokens';
import { Icon } from '../Icon';
import { NavigationIcon } from '../NavigationIcon';

/* -------------------------------------------------------------------------- */
/*              THIS FILE SHOULD BE DELETED AFTER ICON MIGRATION              */
/* -------------------------------------------------------------------------- */

type SvgFromFigmaProps = { name: IconName; size: IconSize };

function SvgFromFigma({ name, size }: SvgFromFigmaProps) {
  const { iconSize, sourceSize } = useIconSize(size);
  const svgPath = `@cbhq/cds-icons/__generated__/ui/svg/ui-${name}-${sourceSize}.svg`;
  return <img src={svgPath} alt={name} width={iconSize} height={iconSize} />;
}

type NavigationSvgFromFigmaProps = {
  name: NavigationIconName;
  size: NavigationIconSize;
  active?: boolean;
};

const iconFontOverride = css`
  span {
    color: ${palette.foreground} !important;
  }
`;

function NavigationSvgFromFigma({ name, size, active }: NavigationSvgFromFigmaProps) {
  const { iconSize, sourceSize } = useIconSize(size);
  const activeSuffix = active ? 'active' : 'inactive';
  const svgPath = `@cbhq/cds-icons/__generated__/nav/svg/nav-${name}-${sourceSize}-${activeSuffix}.svg`;
  return <img src={svgPath} alt={name} width={iconSize} height={iconSize} />;
}

const disclaimer =
  'The blue icons are icons loaded originally from Figma. This way you can see if the font generated icon differs from how the icon looks in Figma. There are some icons where the second one is still foreground. Those are that way because they are navigation icons which doesnt have color prop. \n';

// Need to paginate this because percy can't serve 1200 images
// in a single page. So breaking it to separate pages.
// [startIdx, endIdx). Last index is excluded
export function IconSheet(variant: 'ui' | 'nav', startIdx: number, endIdx: number) {
  if (variant === 'ui') {
    return (
      <VStack>
        {disclaimer}
        <HStack flexWrap="wrap" gap={2}>
          {iconNames.slice(startIdx, endIdx).map((name) => {
            return (
              <VStack key={`${name}-${startIdx}-${endIdx}`}>
                <HStack gap={2} spacingBottom={2} dangerouslySetClassName={iconFontOverride}>
                  <ScaleProvider value="xSmall">
                    <Icon name={name} size="xs" color="foreground" />
                  </ScaleProvider>
                  <Icon name={name} size="xs" color="foreground" />
                  <Icon name={name} size="s" color="foreground" />
                  <Icon name={name} size="m" color="foreground" />
                  <Icon name={name} size="l" color="foreground" />
                </HStack>
                <HStack gap={2} spacingBottom={2}>
                  <ScaleProvider value="xSmall">
                    <SvgFromFigma name={name} size="xs" />
                  </ScaleProvider>
                  <SvgFromFigma name={name} size="xs" />
                  <SvgFromFigma name={name} size="s" />
                  <SvgFromFigma name={name} size="m" />
                  <SvgFromFigma name={name} size="l" />
                </HStack>
              </VStack>
            );
          })}
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack>
      {disclaimer}
      <HStack flexWrap="wrap" gap={2}>
        {navNames.slice(startIdx, endIdx).map(([name, props]) => {
          return (
            <VStack key={`${name}-${startIdx}-${endIdx}`}>
              <HStack gap={2} spacingBottom={2} dangerouslySetClassName={iconFontOverride}>
                <ScaleProvider value="xSmall">
                  <HStack gap={2}>
                    {/* @ts-expect-error xs is not allowed size */}
                    <NavigationIcon name={name} size="xs" {...props} />
                  </HStack>
                </ScaleProvider>
                {/* @ts-expect-error xs is not allowed size */}
                <NavigationIcon name={name} size="xs" {...props} />
                <NavigationIcon name={name} size="s" {...props} />
                <NavigationIcon name={name} size="m" {...props} />
                <NavigationIcon name={name} size="l" {...props} />
              </HStack>
              <HStack gap={2} spacingBottom={2}>
                <ScaleProvider value="xSmall">
                  <HStack gap={2}>
                    {/* @ts-expect-error xs is not allowed size */}
                    <NavigationSvgFromFigma name={name} size="xs" {...props} />
                  </HStack>
                </ScaleProvider>
                {/* @ts-expect-error xs is not allowed size */}
                <NavigationSvgFromFigma name={name} size="xs" {...props} />
                <NavigationSvgFromFigma name={name} size="s" {...props} />
                <NavigationSvgFromFigma name={name} size="m" {...props} />
                <NavigationSvgFromFigma name={name} size="l" {...props} />
              </HStack>
            </VStack>
          );
        })}
      </HStack>
    </VStack>
  );
}

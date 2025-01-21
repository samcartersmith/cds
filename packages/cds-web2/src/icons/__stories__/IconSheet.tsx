import React, { memo } from 'react';
import { css } from '@linaria/core';
import { type IconName, type IconSize } from '@cbhq/cds-common2';
import { sortNamesByOldOrder } from '@cbhq/cds-common2/internal/utils/sortIconsForVisReg';
import { UiIconName } from '@cbhq/cds-icons';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';
import namesOld from '@cbhq/cds-icons/__generated__/ui/data/names-old';

import { useTheme } from '../../hooks/useTheme';
import { HStack, VStack } from '../../layout';
import { TextLegal } from '../../text/TextLegal';
import { Icon, sourceSizeMap } from '../Icon';

type SvgFromFigmaProps = { name: IconName; size: IconSize };

const iconFontOverride = css`
  span {
    color: var(--color-iconForeground) !important;
  }
`;

function SvgFromFigma({ name, size }: SvgFromFigmaProps) {
  const theme = useTheme();
  const iconSize = theme.iconSize[size];
  const sourceSize = sourceSizeMap[size];
  const svgPath = `@cbhq/cds-icons/__generated__/ui/svg/ui-${name}-${sourceSize}.svg`;
  return <img alt={name} height={iconSize} src={svgPath} width={iconSize} />;
}

function DisclaimerText() {
  return (
    <TextLegal as="p">
      The blue icons are icons loaded originally from Figma. This way you can see if the font
      generated icon differs from how the icon looks in Figma.
    </TextLegal>
  );
}

type IconSheetProps = {
  startIndex?: number;
  endIndex?: number;
};

export const IconSheet = memo(function IconSheet({ startIndex, endIndex }: IconSheetProps) {
  const sortedNames = sortNamesByOldOrder(namesOld, names) as UiIconName[]; // Use sorted names

  return (
    <VStack gap={2}>
      <DisclaimerText />
      <HStack flexWrap="wrap" gap={2} paddingBottom={2}>
        {sortedNames.slice(startIndex, endIndex).map((name) => {
          return (
            <HStack key={`icon-wrapper-${name}`} flexWrap="wrap" gap={2}>
              <VStack gap={2}>
                <HStack alignItems="center" className={iconFontOverride} gap={2}>
                  <Icon color="iconForeground" name={name} size="s" />
                  {(['s', 'm', 'l'] as const).map((size) => {
                    return (
                      <Icon key={`icon-${size}`} color="iconForeground" name={name} size={size} />
                    );
                  })}
                </HStack>
                <HStack alignItems="center" gap={2}>
                  <SvgFromFigma name={name} size="s" />
                  {(['s', 'm', 'l'] as const).map((size) => {
                    return <SvgFromFigma key={`figma-icon-${size}`} name={name} size={size} />;
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

import React, { memo } from 'react';
import { type IconName, type IconSize } from '@cbhq/cds-common';
import { sortNamesByOldOrder } from '@cbhq/cds-common/internal/utils/sortIconsForVisReg';
import { UiIconName } from '@cbhq/cds-icons';
import navNames from '@cbhq/cds-icons/__generated__/nav/data/names';
import uiNames from '@cbhq/cds-icons/__generated__/ui/data/names';
import namesOld from '@cbhq/cds-icons/__generated__/ui/data/names-old';

import { useTheme } from '../../hooks/useTheme';
import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { getIconSourceSize, Icon } from '../Icon';

type SvgFromFigmaProps = { name: IconName; size: IconSize; type: 'ui' | 'nav' };

function SvgFromFigma({ name, size, type }: SvgFromFigmaProps) {
  const theme = useTheme();
  const iconSize = theme.iconSize[size];
  const sourceSize = getIconSourceSize(iconSize);
  const svgPath = `@cbhq/cds-icons/__generated__/${type}/svg/${type}-${name}-${sourceSize}${
    type === 'nav' ? '-inactive' : ''
  }.svg`;
  return <img alt={name} height={iconSize} src={svgPath} width={iconSize} />;
}

function DisclaimerText() {
  return (
    <Text as="p" display="block" font="legal">
      The blue icons are icons loaded originally from Figma. This way you can see if the font
      generated icon differs from how the icon looks in Figma.
    </Text>
  );
}

type IconSheetProps = {
  startIndex?: number;
  endIndex?: number;
};

export const IconSheet = memo(function IconSheet({ startIndex, endIndex }: IconSheetProps) {
  const uiNamesData = uiNames.map((name) => ({ name, type: 'ui' as const }));
  const navNamesData = navNames.map((name) => ({ name, type: 'nav' as const }));
  const sortedNames = [...uiNamesData, ...navNamesData];

  return (
    <VStack gap={2}>
      <DisclaimerText />
      <HStack flexWrap="wrap" gap={2} paddingBottom={2}>
        {sortedNames.slice(startIndex, endIndex).map(({ name, type }) => {
          return (
            <HStack key={`icon-wrapper-${name}`} flexWrap="wrap" gap={2}>
              <VStack gap={2}>
                <HStack alignItems="center" gap={2}>
                  {(['xs', 's', 'm', 'l'] as const).map((size) => {
                    return (
                      <Icon
                        key={`icon-${size}`}
                        color="fg"
                        iconType={type === 'nav' ? 'nav' : undefined}
                        name={name}
                        size={size}
                      />
                    );
                  })}
                </HStack>
                <HStack alignItems="center" gap={2}>
                  {(['xs', 's', 'm', 'l'] as const).map((size) => {
                    return (
                      <SvgFromFigma
                        key={`figma-icon-${size}`}
                        name={name}
                        size={size}
                        type={type}
                      />
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

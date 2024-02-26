/* eslint-disable no-nested-ternary */
import React from 'react';
import { css } from 'linaria';
import shuffle from 'lodash/shuffle';
import { IconName } from '@cbhq/cds-common';
import { CellMedia } from '@cbhq/cds-web/cells';
import { SelectOption } from '@cbhq/cds-web/controls/SelectOption';
import { VStack } from '@cbhq/cds-web/layout/VStack';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

const iconNames: IconName[] = shuffle([
  'lock',
  'deposit',
  'phone',
  'checkmark',
  'withdraw',
  'smartContract',
]);

const assetUrl =
  'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png';

type MenuProps = {
  preferTitle?: boolean;
  showDescription?: boolean;
  showMediaIcons?: boolean;
  showMediaAssets?: boolean;
};

const popoverStyleOverrides = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Menu = ({
  preferTitle,
  showDescription,
  showMediaIcons,
  showMediaAssets,
}: MenuProps) => {
  return (
    <VStack
      background
      borderRadius="roundedLarge"
      className={popoverStyleOverrides}
      elevation={2}
      maxHeight={300}
      width={275}
    >
      {options.map((option, i) => (
        <SelectOption
          key={option}
          description={preferTitle ? undefined : showDescription ? 'Description' : option}
          media={
            showMediaIcons ? (
              <CellMedia name={iconNames[i]} type="icon" />
            ) : showMediaAssets ? (
              <CellMedia source={assetUrl} title={option} type="asset" />
            ) : undefined
          }
          title={preferTitle || showDescription ? option : undefined}
          value={option}
        />
      ))}
    </VStack>
  );
};

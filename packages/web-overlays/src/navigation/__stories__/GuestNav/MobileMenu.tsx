import React, { useCallback } from 'react';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { Button } from '@cbhq/cds-web/buttons';
import { ListCell } from '@cbhq/cds-web/cells/ListCell';
import { Icon } from '@cbhq/cds-web/icons';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { Pressable } from '@cbhq/cds-web/system';

import { primaryTabs } from './data';
import { TOP_OFFSET, useWindowDimensions } from './utils';

/**
 * @internal
 */
export const MobileMenu = () => {
  const { height } = useWindowDimensions();
  const [currentTab, setCurrentTab] = React.useState<string>();
  const handleBackButtonPress = useCallback(() => {
    setCurrentTab(undefined);
  }, []);
  return (
    <VStack
      height={height - TOP_OFFSET}
      position="absolute"
      top={TOP_OFFSET}
      width="100%"
      zIndex={1}
    >
      <VStack background height="100%" position="relative" spacingHorizontal={0.5}>
        {currentTab && (
          <VStack>
            <Box borderedBottom>
              <ListCell
                action={
                  <Button compact transparent>
                    {' '}
                    See all
                  </Button>
                }
                media={
                  <Pressable backgroundColor="background" onPress={handleBackButtonPress}>
                    <Icon name="caretLeft" size="s" />
                  </Pressable>
                }
                title={primaryTabs.find(({ label }) => label === currentTab)?.label}
                variant="positive"
              />
            </Box>
            <VStack overflow="auto">
              {primaryTabs
                ?.find(({ label }) => label === currentTab)
                ?.tabs?.map((tab) => {
                  return (
                    <ListCell
                      key={tab?.label}
                      description={tab.description}
                      media={
                        <Box
                          borderRadius="roundedFull"
                          dangerouslySetBackground="#ED702F"
                          height={32}
                          width={32}
                        />
                      }
                      onPress={NoopFn}
                      title={tab?.label}
                      variant="positive"
                    />
                  );
                })}
            </VStack>
          </VStack>
        )}
        {!currentTab && (
          <VStack overflow="auto">
            {primaryTabs.map(({ tabs, label }) => (
              <ListCell
                accessory={tabs && tabs?.length > 0 ? 'arrow' : undefined}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onPress={tabs?.length ? () => setCurrentTab(label) : undefined}
                // media={
                //   <CellMedia
                //     source="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
                //     type="asset"
                //   />
                // }
                title={label}
                variant="positive"
              />
            ))}
          </VStack>
        )}
        <VStack
          background
          bottom={0}
          elevation={2}
          gap={2}
          position="absolute"
          spacing={2}
          width="100%"
        >
          <HStack alignItems="center" offsetHorizontal={2}>
            <ListCell
              description="brian.armstrong@coinbase.com"
              media={<Avatar selected alt="Brian Armstrong" name="Brian Armstrong" size="xl" />}
              title="Brian Armstrong"
              variant="positive"
            />
          </HStack>
          <Button variant="secondary">Sign out</Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

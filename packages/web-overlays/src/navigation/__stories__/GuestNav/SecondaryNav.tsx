import React, { useCallback, useMemo, useState } from 'react';
import { IconButton } from '@cbhq/cds-web/buttons';
import { SearchInput } from '@cbhq/cds-web/controls';
import { useBreakpoints } from '@cbhq/cds-web/hooks/useBreakpoints';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import { secondaryTabs } from './data';
import { useWindowDimensions } from './utils';

/**
 * @internal
 */
/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const SecondaryNav = () => {
  const [text, setText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Window Breakpoints
  const { isTabletLandscape, isDesktop, isPhone } = useBreakpoints();
  const { width } = useWindowDimensions();

  const handleSearchVisibility = useCallback(() => {
    setIsSearchOpen(!isSearchOpen);
  }, [isSearchOpen]);

  const renderSearchBar = useMemo(() => {
    return () => (
      <HStack alignItems="center" display="flex" flexGrow={1}>
        <VStack width="100%">
          <SearchInput compact onChangeText={setText} placeholder="Placeholder" value={text} />
        </VStack>
      </HStack>
    );
  }, [text]);

  return (
    <HStack
      borderedBottom
      alignItems="center"
      height={61}
      justifyContent="space-between"
      spacingHorizontal={2}
      spacingVertical={1}
    >
      {isSearchOpen ? (
        <>{renderSearchBar()}</>
      ) : (
        <HStack
          alignItems="center"
          flexGrow={1}
          gap={2}
          overflow="auto"
          width={isPhone ? width - 100 : '100%'}
        >
          <HStack width={isTabletLandscape || isDesktop ? 120 : 64}>
            <TextLabel1 as="p">Headline</TextLabel1>
          </HStack>
          <HStack gap={isTabletLandscape || isDesktop ? 3 : 2}>
            {secondaryTabs.map((tab) => (
              <TextLabel2 key={tab?.id} as="p">
                {tab.label}
              </TextLabel2>
            ))}
          </HStack>
        </HStack>
      )}
      <HStack>
        {isPhone && (
          <Box spacingStart={1}>
            <IconButton
              name={isSearchOpen ? 'close' : 'search'}
              onPress={handleSearchVisibility}
              variant="secondary"
            />
          </Box>
        )}
        {(isTabletLandscape || isDesktop) && <HStack>{renderSearchBar()}</HStack>}
      </HStack>
    </HStack>
  );
};

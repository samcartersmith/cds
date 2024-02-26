import React, { useMemo } from 'react';
import { css } from 'linaria';
import { BoxBaseProps, ResponsiveCellSpacingProps, ResponsiveProps } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../../buttons';
import { IconButton } from '../../buttons/IconButton';
import { CardHeader } from '../../cards';
import { Card } from '../../cards/Card';
import { CellMedia, ContentCell, ListCell } from '../../cells';
import { Table, TableBody, TableCell, TableRow } from '../../tables';
import { TextBody, TextDisplay1, TextDisplay2, TextTitle1 } from '../../typography';
import { TextHeadline } from '../../typography/TextHeadline';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

const animationStyles = css`
  transition: ease all 0.4s;
`;

type ResponsiveBoxType = {
  responsiveConfig: ResponsiveProps;
};

const responsiveConfigHoisted: ResponsiveProps = {
  phone: {
    spacing: 4,
    gap: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  tablet: {
    spacing: 3,
    gap: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  desktop: {
    spacing: 2,
    gap: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const itemProps: BoxBaseProps = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 100,
  background: 'backgroundAlternate',
  spacingHorizontal: 3,
};

const ratioItem1Config: ResponsiveProps = {
  phone: {
    flexGrow: 1,
  },
  tablet: {
    flexGrow: 2,
  },
  desktop: {
    flexGrow: 3,
  },
};

export const ResponsiveBox = ({
  responsiveConfig = responsiveConfigHoisted,
}: ResponsiveBoxType) => {
  return (
    <VStack gap={2}>
      <TextDisplay2 as="h2">Responsive Flex Props</TextDisplay2>
      <Box
        borderColor="line"
        className={animationStyles}
        minHeight={200}
        responsiveConfig={responsiveConfig}
      >
        <HStack {...itemProps}>
          <TextHeadline as="h3">Item 1</TextHeadline>
        </HStack>
        <HStack {...itemProps}>
          <TextHeadline as="h3">Item 2</TextHeadline>
        </HStack>
        <HStack {...itemProps}>
          <TextHeadline as="h3">Item 3</TextHeadline>
        </HStack>
      </Box>
      <TextDisplay2 as="h2">Responsive Ratio Layout</TextDisplay2>
      <HStack borderColor="line" gap={1} spacing={1}>
        <HStack background="backgroundAlternate" responsiveConfig={ratioItem1Config} {...itemProps}>
          <TextHeadline as="h3">Item 1</TextHeadline>
        </HStack>
        <HStack background="backgroundAlternate" flexGrow={1} {...itemProps}>
          <TextHeadline as="h3">Item 2</TextHeadline>
        </HStack>
      </HStack>
    </VStack>
  );
};

export const ResponsiveBoxUnmemoizedPerformance = () => {
  const responsiveConfig = {
    phone: {
      spacing: 4,
      gap: 0.5,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    tablet: {
      spacing: 3,
      gap: 2,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    desktop: {
      spacing: 2,
      gap: 3,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };
  return <ResponsiveBox responsiveConfig={responsiveConfig as ResponsiveProps} />;
};

export const ResponsiveBoxMemoizedPerformance = () => {
  const responsiveConfigMemoized = useMemo(
    () => ({
      phone: {
        spacing: 4,
        gap: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      tablet: {
        spacing: 3,
        gap: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      desktop: {
        spacing: 2,
        gap: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    }),
    [],
  );
  return <ResponsiveBox responsiveConfig={responsiveConfigMemoized as ResponsiveProps} />;
};

export const ResponsiveBoxHoistedPerformance = () => (
  <ResponsiveBox responsiveConfig={responsiveConfigHoisted} />
);

const hideOnMobileConfig: ResponsiveProps = {
  phone: {
    visibility: 'hidden',
  },
  tablet: {
    visibility: 'visible',
  },
};

export const HideOnMobile = () => <ResponsiveBox responsiveConfig={hideOnMobileConfig} />;

export const ResponsiveStacks = () => (
  <HStack responsiveConfig={responsiveConfigHoisted}>
    <VStack
      background="backgroundAlternate"
      borderRadius="rounded"
      responsiveConfig={responsiveConfigHoisted}
    >
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
    </VStack>
    <VStack
      background="backgroundAlternate"
      borderRadius="rounded"
      responsiveConfig={responsiveConfigHoisted}
    >
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
    </VStack>
  </HStack>
);

const responsiveCardConfig: ResponsiveProps = {
  phone: {
    spacingVertical: 1,
    spacingHorizontal: 2,
  },
  tablet: {
    spacing: 3,
  },
};

export const ResponsiveCard = () => {
  return (
    <Card responsiveConfig={responsiveCardConfig}>
      <CardHeader
        action={
          <IconButton transparent accessibilityLabel="More" name="more" variant="foregroundMuted" />
        }
        avatar="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        description="Earn crypto"
        metaData="Dec 18"
      />
    </Card>
  );
};

const responsiveCellSpacing: ResponsiveCellSpacingProps = {
  phone: {
    innerSpacing: {
      spacingHorizontal: 2,
    },
    outerSpacing: {
      spacingVertical: 1,
    },
  },
  tablet: {
    innerSpacing: {
      spacingHorizontal: 4,
    },
    outerSpacing: {
      spacingVertical: 2,
    },
  },
};

export const ResponsiveCells = () => {
  return (
    <>
      <ListCell
        description="Description"
        onPress={NoopFn}
        responsiveConfig={responsiveCellSpacing}
        title="Title"
      />
      <ListCell
        description="Description"
        onPress={NoopFn}
        responsiveConfig={responsiveCellSpacing}
        title="Title"
      />
      <ListCell
        description="Description"
        onPress={NoopFn}
        responsiveConfig={responsiveCellSpacing}
        title="Title"
      />
      <Divider />
      <ContentCell
        description="On this episode of The Scoop, Ethereum 2.0 developer and Prysmatic Labs founder Preston Van Loon and Joe Sticco broke down Cryptex. The post A deep dive into Eth 2.0, scaling and a project that lets users buy the entire crypto market appeared first on The Block."
        media={
          <CellMedia
            source="https://dynamic-assets.coinbase.com/2954170d91149bea19e2d2eab8acc2f50ff4446b4b6fb09a7983ad7a481c636e6b29c5e09cf90f49f57dcef30ef7ff50bb99ad4fc068cf43265ad135c590fa7d/news_article_images/28216c10d33e3f2147fe05aa8a27bf4b9620dd658ce0be6c482b5629176e52e4.png"
            type="image"
          />
        }
        meta="March 2nd, 2021"
        onPress={NoopFn}
        responsiveConfig={responsiveCellSpacing}
        subtitle="The Block - Ethereum 2"
        title="A deep dive into Eth 2.0, scaling that lets users buy the entire crypto market"
      />
    </>
  );
};

export const ResponsiveTable = () => {
  return (
    <Table bordered variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell direction="horizontal" responsiveConfig={responsiveCellSpacing}>
            <TextHeadline as="h2">Sample Row 1</TextHeadline>
            <Button compact onPress={NoopFn} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
        <TableRow
          fullWidth
          backgroundColor="backgroundAlternate"
          responsiveConfig={responsiveCellSpacing}
        >
          <TableCell
            direction="horizontal"
            end={
              <Button compact onPress={NoopFn} variant="secondary">
                Export
              </Button>
            }
            title="Sample Row 2 (with background set)"
          />
        </TableRow>
        <TableRow disableHoverIndicator>
          <TableCell direction="horizontal" responsiveConfig={responsiveCellSpacing}>
            <TextHeadline as="h2">Sample Row 3</TextHeadline>
            <Button compact onPress={NoopFn} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const responsiveTypography: ResponsiveProps = {
  phone: {
    display: 'block',
    spacing: 4,
  },
  tablet: {
    display: 'inline-block',
    spacing: 2,
  },
};

export const ResponsiveTypography = () => {
  return (
    <VStack>
      <TextDisplay1 as="h1" responsiveConfig={responsiveTypography}>
        Headline
      </TextDisplay1>
      <TextTitle1 as="h2" responsiveConfig={responsiveTypography}>
        Headline
      </TextTitle1>
      <TextHeadline as="h3" responsiveConfig={responsiveTypography}>
        Headline
      </TextHeadline>
      <TextBody as="p" responsiveConfig={responsiveTypography}>
        Headline
      </TextBody>
    </VStack>
  );
};

export default {
  title: 'Core Components/Responsive Props',
  component: ResponsiveBox,
  excludeStories: /.*Performance$/,
};

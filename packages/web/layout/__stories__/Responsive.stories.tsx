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
import { TextBody, TextDisplay1, TextTitle1 } from '../../typography';
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
  borderRadius: 'standard',
  background: 'backgroundAlternate',
  width: 100,
};

export const ResponsiveBox = ({
  responsiveConfig = responsiveConfigHoisted,
}: ResponsiveBoxType) => {
  return (
    <Box
      minHeight={200}
      responsiveStyles={responsiveConfig}
      borderColor="line"
      dangerouslySetClassName={animationStyles}
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
  <HStack responsiveStyles={responsiveConfigHoisted}>
    <VStack
      background="backgroundAlternate"
      borderRadius="standard"
      responsiveStyles={responsiveConfigHoisted}
    >
      <ListCell title="Title" description="Description" />
      <ListCell title="Title" description="Description" />
      <ListCell title="Title" description="Description" />
    </VStack>
    <VStack
      background="backgroundAlternate"
      borderRadius="standard"
      responsiveStyles={responsiveConfigHoisted}
    >
      <ListCell title="Title" description="Description" />
      <ListCell title="Title" description="Description" />
      <ListCell title="Title" description="Description" />
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
    <Card responsiveStyles={responsiveCardConfig}>
      <CardHeader
        avatarUrl="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        metaData="Dec 18"
        description="Earn crypto"
        action={<IconButton name="more" variant="foregroundMuted" transparent />}
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
        responsiveStyles={responsiveCellSpacing}
        onPress={NoopFn}
        title="Title"
        description="Description"
      />
      <ListCell
        responsiveStyles={responsiveCellSpacing}
        onPress={NoopFn}
        title="Title"
        description="Description"
      />
      <ListCell
        responsiveStyles={responsiveCellSpacing}
        onPress={NoopFn}
        title="Title"
        description="Description"
      />
      <Divider />
      <ContentCell
        responsiveStyles={responsiveCellSpacing}
        title="A deep dive into Eth 2.0, scaling that lets users buy the entire crypto market"
        subtitle="The Block - Ethereum 2"
        description="On this episode of The Scoop, Ethereum 2.0 developer and Prysmatic Labs founder Preston Van Loon and Joe Sticco broke down Cryptex. The post A deep dive into Eth 2.0, scaling and a project that lets users buy the entire crypto market appeared first on The Block."
        meta="March 2nd, 2021"
        media={
          <CellMedia
            type="image"
            title="Eth 2.0"
            source="https://dynamic-assets.coinbase.com/2954170d91149bea19e2d2eab8acc2f50ff4446b4b6fb09a7983ad7a481c636e6b29c5e09cf90f49f57dcef30ef7ff50bb99ad4fc068cf43265ad135c590fa7d/news_article_images/28216c10d33e3f2147fe05aa8a27bf4b9620dd658ce0be6c482b5629176e52e4.png"
          />
        }
        onPress={NoopFn}
      />
    </>
  );
};

export const ResponsiveTable = () => {
  return (
    <Table variant="ruled" bordered>
      <TableBody>
        <TableRow>
          <TableCell responsiveStyles={responsiveCellSpacing} direction="horizontal">
            <TextHeadline as="h2">Sample Row 1</TextHeadline>
            <Button variant="secondary" compact onPress={NoopFn}>
              Export
            </Button>
          </TableCell>
        </TableRow>
        <TableRow
          responsiveStyles={responsiveCellSpacing}
          fullWidth
          backgroundColor="backgroundAlternate"
        >
          <TableCell
            direction="horizontal"
            title="Sample Row 2 (with background set)"
            end={
              <Button variant="secondary" compact onPress={NoopFn}>
                Export
              </Button>
            }
          />
        </TableRow>
        <TableRow disableHoverIndicator>
          <TableCell responsiveStyles={responsiveCellSpacing} direction="horizontal">
            <TextHeadline as="h2">Sample Row 3</TextHeadline>
            <Button variant="secondary" compact onPress={NoopFn}>
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
      <TextDisplay1 responsiveStyles={responsiveTypography} as="h1">
        Headline
      </TextDisplay1>
      <TextTitle1 responsiveStyles={responsiveTypography} as="h2">
        Headline
      </TextTitle1>
      <TextHeadline responsiveStyles={responsiveTypography} as="h3">
        Headline
      </TextHeadline>
      <TextBody responsiveStyles={responsiveTypography} as="p">
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

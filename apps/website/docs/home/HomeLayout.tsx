import React, { useCallback } from 'react';
import { css } from '@linaria/core';
import {
  IllustrationNames,
  PartialPaletteConfig,
  Spectrum,
  SpectrumConditionalConfig,
} from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { entries } from '@cbhq/cds-utils';
import { CardBody } from '@cbhq/cds-web/alpha/CardBody';
import { CardGroup } from '@cbhq/cds-web/alpha/CardGroup';
import { Button } from '@cbhq/cds-web/buttons';
import { Illustration } from '@cbhq/cds-web/illustrations/Illustration';
import { Box, BoxProps, Divider, Group, HStack, VStack } from '@cbhq/cds-web/layout';
import { Pressable, ThemeProvider } from '@cbhq/cds-web/system';
import { Link, TextCaption, TextLabel2, TextTitle1, TextTitle2 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import { announcements, focusAreas, quarterlyProjects } from './homeData';

const homeOverrides = css`
  button {
    width: fit-content;
  }
`;
const customTitle = css`
  font-family: var(--cds-font-display);
  font-weight: 700;
  font-size: 90px;
  line-height: 83px;
  max-width: 670px;
  color: var(--foreground);
  padding-left: var(--spacing-${gutter});
  padding-top: var(--spacing-6);
  padding-bottom: var(--spacing-6);
`;

const customTitle2 = css`
  font-family: var(--cds-font-display);
  font-weight: 700;
  font-size: 55px;
  line-height: 63px;
  max-width: 320px;
  color: var(--primary-foreground);
`;

// TODO: Remove when we add this prop to Link component
const tempLinkOverride = css`
  position: relative;
  width: fit-content;

  &:after {
    content: '';
    position: absolute;
    top: 90%;
    left: 0;
    background-color: var(--foreground);
    height: 1px;
    width: 100%;
  }
`;

const bannerVariants = {
  announcements: {
    light: { background: 'gray100', foreground: 'gray0', primary: 'blue30' },
    dark: { background: 'gray0', foreground: 'gray100' },
  },
  designers: { light: { primary: 'yellow20' }, dark: { primary: 'gray20' } },
  developers: {
    light: { primary: 'orange30' },
    dark: { primary: 'gray30' },
  },
} as const;

function useGoTo() {
  return useCallback((url: string) => {
    return () => {
      const location = getBrowserGlobals()?.window?.location;
      if (location) {
        location.href = url;
      }
    };
  }, []);
}

function LandingIllustration({ name }: { name: IllustrationNames }) {
  return (
    <Box spacingStart={3}>
      <Illustration name={name} dimension="48x48" />
    </Box>
  );
}

type ThemeProviderOverrideProps = {
  paletteName: keyof typeof bannerVariants;
  spectrum?: Spectrum;
  children: React.ReactNode;
};

function ThemeProviderOverride({ children, paletteName }: ThemeProviderOverrideProps) {
  const palette = useSpectrumConditional(
    bannerVariants[paletteName] as SpectrumConditionalConfig<
      PartialPaletteConfig,
      PartialPaletteConfig
    >,
  );
  return (
    <ThemeProvider display="contents" palette={palette}>
      {children}
    </ThemeProvider>
  );
}

function PressableCallout({
  paleteName,
  spectrum,
  title,
  to,
  ...props
}: {
  to: string;
  paleteName: keyof typeof bannerVariants;
  spectrum?: Spectrum;
  title: string;
} & BoxProps) {
  const goTo = useGoTo();
  return (
    <ThemeProviderOverride paletteName={paleteName} spectrum={spectrum}>
      <Pressable width="50%" backgroundColor="primary" onPress={goTo(to)} noScaleOnPress>
        <VStack gap={2} spacingHorizontal={gutter} spacingVertical={4} flexGrow={1} {...props}>
          <TextCaption as="p">Getting started</TextCaption>
          <TextTitle2 as="p"> {title}</TextTitle2>
        </VStack>
      </Pressable>
    </ThemeProviderOverride>
  );
}

function AnnouncementItem({
  title,
  description,
  to,
  actionLabel,
}: {
  title: string;
  description: string;
  to: string;
  actionLabel: string;
}) {
  const goTo = useGoTo();
  return (
    <VStack
      gap={1}
      alignItems="flex-start"
      background
      spacingVertical={6}
      spacingHorizontal={gutter}
    >
      <TextTitle1 as="h2">{title}</TextTitle1>
      <TextLabel2 as="p">{description}</TextLabel2>
      <Button compact transparent flush="start" endIcon="forwardArrow" onPress={goTo(to)}>
        {actionLabel}
      </Button>
    </VStack>
  );
}

function Announcements() {
  return (
    <ThemeProviderOverride paletteName="announcements">
      {announcements.map((item) => (
        <AnnouncementItem key={item.title} {...item} />
      ))}
    </ThemeProviderOverride>
  );
}

function QuarterlyFocus() {
  const isDarkMode = useSpectrum() === 'dark';
  return (
    <HStack minHeight={600}>
      <Box background="primary" spacing={gutter} width="50%">
        <h3 className={customTitle2}>Q2 Focus Areas</h3>
      </Box>
      <VStack spacing={gutter} gap={gutter} borderedBottom={isDarkMode} width="50%">
        {entries(quarterlyProjects).map(([key, projects]) => {
          return (
            <VStack key={key}>
              {projects.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  variant="title4"
                  color="foreground"
                  dangerouslySetClassName={tempLinkOverride}
                  openInNewWindow
                >
                  {item.label}
                </Link>
              ))}
            </VStack>
          );
        })}
      </VStack>
    </HStack>
  );
}

function VerticalDivider() {
  return <Divider direction="vertical" />;
}

function FocusArea({
  title,
  description,
  illustration,
  actionLabel,
  to,
}: {
  title: string;
  description: string;
  illustration: IllustrationNames;
  actionLabel: string;
  to: string;
}) {
  const goTo = useGoTo();
  return (
    <Box width="100%">
      <CardBody
        title={title}
        description={description}
        mediaPlacement="above"
        media={<LandingIllustration name={illustration} />}
        actionLabel={actionLabel}
        onActionPress={goTo(to)}
      />
    </Box>
  );
}

function FocusAreas() {
  return (
    <CardGroup divider={VerticalDivider} direction="horizontal" justifyContent="space-between">
      {focusAreas.map((item) => (
        <FocusArea key={item.title} {...item} />
      ))}
    </CardGroup>
  );
}

export default function HomeLayout() {
  return (
    <Group position="relative" divider={Divider} dangerouslySetClassName={homeOverrides}>
      <h1 className={customTitle}>Coinbase Design System</h1>
      <Announcements />
      <FocusAreas />
      <HStack>
        <PressableCallout
          spectrum="light"
          paleteName="designers"
          title="For Designers"
          to="/cds/getting-started"
        />
        <PressableCallout
          spectrum="light"
          paleteName="developers"
          title="For Developers"
          to="/cds/getting-started"
        />
      </HStack>
      <QuarterlyFocus />
    </Group>
  );
}

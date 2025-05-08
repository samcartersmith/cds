import React, { useMemo } from 'react';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { NoopFn as noopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { coinbaseDenseTheme } from '../../themes/coinbaseDenseTheme';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import { Banner, BannerProps } from '../Banner';

const primaryAction = <Link href="https://www.coinbase.com">Primary</Link>;
const secondaryAction = <Link href="https://www.coinbase.com">Secondary</Link>;
const shortMessage = 'Lorem ipsum dolar sit amet, consecturo.';
const longMessage = `${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}`;
const label = 'Last updated today at 3:33pm';

type ExampleProps = Pick<
  BannerProps,
  | 'title'
  | 'children'
  | 'marginX'
  | 'startIcon'
  | 'startIconAccessibilityLabel'
  | 'closeAccessibilityLabel'
>;

const exampleProps: ExampleProps = {
  title: 'Failure Message',
  startIcon: 'error',
  startIconAccessibilityLabel: 'Error',
  closeAccessibilityLabel: 'Close',
};

const examplePropsWithMargin: ExampleProps = {
  ...exampleProps,
  marginX: -2,
  children: shortMessage,
};

const styleProps: BannerProps[] = [
  {
    variant: 'warning',
    title: 'Warning message',
    startIcon: 'warning',
    children: shortMessage,
    startIconAccessibilityLabel: 'Warning',
    closeAccessibilityLabel: 'Close',
  },
  {
    variant: 'informational',
    title: 'Informative message',
    startIcon: 'info',
    children: shortMessage,
    startIconAccessibilityLabel: 'Information',
    closeAccessibilityLabel: 'Close',
  },
  {
    variant: 'promotional',
    title: 'Promotional message',
    startIcon: 'info',
    children: shortMessage,
    startIconAccessibilityLabel: 'Information',
    closeAccessibilityLabel: 'Close',
  },
  {
    variant: 'error',
    title: 'Error message',
    startIcon: 'error',
    children: shortMessage,
    startIconAccessibilityLabel: 'Error',
    closeAccessibilityLabel: 'Close',
  },
];

const Banners = ({ title, props }: { title: string; props: BannerProps }) => {
  return (
    <>
      <Text as="h1" display="block" font="title1">
        {title}
      </Text>
      <Banner {...props} />
      <Text as="h1" display="block" font="title1">
        {title} with showDismiss
      </Text>
      <Banner {...props} showDismiss onClose={noopFn} title={`${title} with showDismiss`} />
      <Text as="h1" display="block" font="title1">
        {title} with Action
      </Text>
      <Banner {...props} primaryAction={primaryAction} />
      <Text as="h1" display="block" font="title1">
        {title} with multiple Actions
      </Text>
      <Banner {...props} primaryAction={primaryAction} secondaryAction={secondaryAction} />
      <Text as="h1" display="block" font="title1">
        {title} Long Text with Action
      </Text>
      <Banner
        {...props}
        primaryAction={primaryAction}
        title={`${title} Long Text with Action. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <Text as="h1" display="block" font="title1">
        {title} with Action and showDismiss
      </Text>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        primaryAction={primaryAction}
        title={`${title} with Action and showDismiss`}
      />
      <Text as="h1" display="block" font="title1">
        {title} Long Text and showDismiss
      </Text>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        title={`${title} Long Text and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <Text as="h1" display="block" font="title1">
        {title} Long Text with Action and showDismiss
      </Text>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        title={`${title} Long Text with Action and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
    </>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      {styleProps.map((props) => (
        <VStack key={`styles-${props.variant}`} gap={2}>
          <Banners props={props} title={`Contextual ${props.variant}`} />
          <Banners props={{ ...props, styleVariant: 'inline' }} title={`Inline ${props.variant}`} />
          <Banners
            props={{ ...props, label, styleVariant: 'global' }}
            title={`Global ${props.variant}`}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export const Dense = () => {
  const theme = useTheme();
  const newTheme = useMemo(() => ({ ...theme, ...coinbaseDenseTheme }), [theme]);
  return (
    <ThemeProvider activeColorScheme={theme.activeColorScheme} theme={newTheme}>
      <All />
    </ThemeProvider>
  );
};

export const BannerWithLink = () => {
  return (
    <VStack gap={2}>
      <Text as="h1" display="block" font="title1">
        Global
      </Text>
      <Banner
        showDismiss
        closeAccessibilityLabel="Close"
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        startIcon="error"
        startIconAccessibilityLabel="Error"
        styleVariant="global"
        title={`Global ${shortMessage}`}
        variant="error"
      >
        <Text as="p" display="block" font="label2">
          {shortMessage} <Link href="https://www.coinbase.com">Learn more</Link>
        </Text>
      </Banner>
      <Text as="h1" display="block" font="title1">
        Inline
      </Text>
      <Banner
        showDismiss
        closeAccessibilityLabel="Close"
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        styleVariant="inline"
        title={`Inline ${shortMessage}`}
        variant="warning"
      >
        <Link font="label2" href="https://www.coinbase.com">
          Learn more
        </Link>
      </Banner>
      <Text as="h1" display="block" font="title1">
        Contextual
      </Text>
      <Banner
        showDismiss
        closeAccessibilityLabel="Close"
        label={label}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        startIcon="info"
        startIconAccessibilityLabel="Information"
        variant="promotional"
      >
        <Text as="p" display="block" font="label2">
          {shortMessage} <Link href="https://www.coinbase.com">Learn more</Link>
        </Text>
      </Banner>
    </VStack>
  );
};

export const CustomMargin = () => {
  return (
    <VStack gap={2} marginX={-0.5}>
      <Text as="h1" display="block" font="title1">
        Global
      </Text>
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="global"
        title="Global informational Message"
        variant="informational"
      />
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="global"
        title="Global promotional Message"
        variant="promotional"
      />
      <Banner
        {...examplePropsWithMargin}
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        styleVariant="global"
        variant="warning"
      />
      <Banner {...examplePropsWithMargin} styleVariant="global" variant="error" />
      <Text as="h1" display="block" font="title1">
        Inline
      </Text>
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="inline"
        title="Inline informational Message"
        variant="informational"
      />
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="inline"
        title="Inline promotional Message"
        variant="promotional"
      />
      <Banner
        {...examplePropsWithMargin}
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        styleVariant="inline"
        variant="warning"
      />
      <Banner {...examplePropsWithMargin} styleVariant="inline" variant="error" />
    </VStack>
  );
};

export const CustomAlignment = () => {
  return (
    <VStack gap={2}>
      <Text as="h1" display="block" font="title1">
        Vertical Align
      </Text>
      <Banner
        {...exampleProps}
        alignItems="center"
        startIconAccessibilityLabel="Information"
        variant="informational"
      />
      <Banner
        {...exampleProps}
        showDismiss
        alignItems="center"
        startIconAccessibilityLabel="Information"
        title="Promotional Message"
        variant="promotional"
      />
      <Banner
        {...exampleProps}
        alignItems={{
          base: 'flex-start',
          tablet: 'center',
          desktop: 'center',
        }}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        variant="error"
      />
      <Banner
        {...exampleProps}
        showDismiss
        alignItems={{
          base: 'flex-start',
          tablet: 'center',
          desktop: 'center',
        }}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        title="Warning Message"
        variant="warning"
      />
    </VStack>
  );
};

export default {
  component: Banner,
  title: 'Core Components/Banner',
};

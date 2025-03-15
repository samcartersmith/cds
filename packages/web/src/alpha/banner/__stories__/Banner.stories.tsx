import { useMemo } from 'react';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { ResponsiveProps } from '@cbhq/cds-common/types';
import { NoopFn as noopFn } from '@cbhq/cds-common/utils/mockUtils';

import { VStack } from '../../../layout';
import { ThemeProvider } from '../../../system';
import { Link, TextLabel2, TextTitle1 } from '../../../typography';
import { Banner, WebBannerProps } from '../Banner';

const primaryAction = <Link to="https://www.coinbase.com">Primary</Link>;
const secondaryAction = <Link to="https://www.coinbase.com">Secondary</Link>;
const shortMessage = 'Lorem ipsum dolar sit amet, consecturo.';
const longMessage = `${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}`;
const label = 'Last updated today at 3:33pm';

type ExampleProps = Pick<
  WebBannerProps,
  | 'title'
  | 'children'
  | 'offsetHorizontal'
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

const examplePropsWithOffset: ExampleProps = {
  ...exampleProps,
  offsetHorizontal: 2,
  children: shortMessage,
};

const styleProps: WebBannerProps[] = [
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

const Banners = ({ title, props }: { title: string; props: WebBannerProps }) => {
  return (
    <>
      <TextTitle1 as="h1">{title}</TextTitle1>
      <Banner {...props} />
      <TextTitle1 as="h1">{title} with showDismiss</TextTitle1>
      <Banner {...props} showDismiss onClose={noopFn} title={`${title} with showDismiss`} />
      <TextTitle1 as="h1">{title} with Action</TextTitle1>
      <Banner {...props} primaryAction={primaryAction} />
      <TextTitle1 as="h1">{title} with multiple Actions</TextTitle1>
      <Banner {...props} primaryAction={primaryAction} secondaryAction={secondaryAction} />
      <TextTitle1 as="h1">{title} Long Text with Action</TextTitle1>
      <Banner
        {...props}
        primaryAction={primaryAction}
        title={`${title} Long Text with Action. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <TextTitle1 as="h1">{title} with Action and showDismiss</TextTitle1>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        primaryAction={primaryAction}
        title={`${title} with Action and showDismiss`}
      />
      <TextTitle1 as="h1">{title} Long Text and showDismiss</TextTitle1>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        title={`${title} Long Text and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <TextTitle1 as="h1">{title} Long Text with Action and showDismiss</TextTitle1>
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
  return (
    <ThemeProvider scale="xSmall">
      <All />
    </ThemeProvider>
  );
};

export const BannerWithLink = () => {
  return (
    <VStack gap={2}>
      <TextTitle1 as="h1">Global</TextTitle1>
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
        <TextLabel2 as="p">
          {shortMessage} <Link to="https://www.coinbase.com">Learn more</Link>
        </TextLabel2>
      </Banner>
      <TextTitle1 as="h1">Inline</TextTitle1>
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
        <Link to="https://www.coinbase.com" variant="label2">
          Learn more
        </Link>
      </Banner>
      <TextTitle1 as="h1">Contextual</TextTitle1>
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
        <TextLabel2 as="p">
          {shortMessage} <Link to="https://www.coinbase.com">Learn more</Link>
        </TextLabel2>
      </Banner>
    </VStack>
  );
};

export const CustomOffset = () => {
  return (
    <VStack gap={2} offsetHorizontal={0.5}>
      <TextTitle1 as="h1">Global</TextTitle1>
      <Banner
        {...examplePropsWithOffset}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="global"
        title="Global informational Message"
        variant="informational"
      />
      <Banner
        {...examplePropsWithOffset}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="global"
        title="Global promotional Message"
        variant="promotional"
      />
      <Banner
        {...examplePropsWithOffset}
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        styleVariant="global"
        variant="warning"
      />
      <Banner {...examplePropsWithOffset} styleVariant="global" variant="error" />
      <TextTitle1 as="h1">Inline</TextTitle1>
      <Banner
        {...examplePropsWithOffset}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="inline"
        title="Inline informational Message"
        variant="informational"
      />
      <Banner
        {...examplePropsWithOffset}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="inline"
        title="Inline promotional Message"
        variant="promotional"
      />
      <Banner
        {...examplePropsWithOffset}
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        styleVariant="inline"
        variant="warning"
      />
      <Banner {...examplePropsWithOffset} styleVariant="inline" variant="error" />
    </VStack>
  );
};

export const CustomAlignment = () => {
  const responsiveConfig: ResponsiveProps = useMemo(
    () => ({
      phone: {
        alignItems: 'flex-start',
      },
      tablet: {
        alignItems: 'center',
      },
      desktop: {
        alignItems: 'center',
      },
    }),
    [],
  );
  return (
    <VStack gap={2}>
      <TextTitle1 as="h1">Vertical Align</TextTitle1>
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
        alignItems="center"
        primaryAction={primaryAction}
        responsiveConfig={responsiveConfig}
        secondaryAction={secondaryAction}
        variant="error"
      />
      <Banner
        {...exampleProps}
        showDismiss
        primaryAction={primaryAction}
        responsiveConfig={responsiveConfig}
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
  title: 'Core Components/Banner (Alpha)',
};

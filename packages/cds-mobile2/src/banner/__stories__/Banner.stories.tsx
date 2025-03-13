import React from 'react';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { NoopFn as noopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Spacer, VStack } from '../../layout';
import { Link, TextLabel2, TextTitle1 } from '../../typography';
import { Banner, MobileBannerProps } from '../Banner';

const primaryAction = <Link to="https://www.coinbase.com">Primary</Link>;
const secondaryAction = <Link to="https://www.coinbase.com">Secondary</Link>;
const shortMessage = 'Lorem ipsum dolar sit amet, consecturo.';
const longMessage = `${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}`;
const label = 'Last updated today at 3:33pm';

type ExampleProps = Pick<
  MobileBannerProps,
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

const examplePropsWithOffset: ExampleProps = {
  ...exampleProps,
  marginX: -2,
  children: 'Lorem ipsum dolar sit amet',
};

const styleProps: MobileBannerProps[] = [
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

const Banners = ({ title, props }: { title: string; props: MobileBannerProps }) => {
  return (
    <VStack gap={2}>
      <TextTitle1>{title}</TextTitle1>
      <Banner {...props} />
      <TextTitle1>{title} with showDismiss</TextTitle1>
      <Banner {...props} showDismiss onClose={noopFn} title={`${title} with showDismiss`} />
      <TextTitle1>{title} with Action</TextTitle1>
      <Banner {...props} primaryAction={primaryAction} />
      <TextTitle1>{title} with multiple Actions</TextTitle1>
      <Banner {...props} primaryAction={primaryAction} secondaryAction={secondaryAction} />
      <TextTitle1>{title} Long Text with Action</TextTitle1>
      <Banner
        {...props}
        primaryAction={primaryAction}
        title={`${title} Long Text with Action. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <TextTitle1>{title} with Action and showDismiss</TextTitle1>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        primaryAction={primaryAction}
        title={`${title} with Action and showDismiss`}
      />
      <TextTitle1>{title} Long Text and showDismiss</TextTitle1>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        title={`${title} Long Text and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <TextTitle1>{title} Long Text with Action and showDismiss</TextTitle1>
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
    </VStack>
  );
};

const All = () => {
  return (
    <VStack gap={2}>
      {styleProps.map((props) => {
        return (
          <VStack key={`styles-${props.variant}`} gap={2}>
            <Banners props={props} title={`Contextual ${props.variant}`} />
            <Banners
              props={{ ...props, styleVariant: 'inline' }}
              title={`Inline ${props.variant}`}
            />
            <Banners
              props={{ ...props, label, styleVariant: 'global' }}
              title={`Global ${props.variant}`}
            />
          </VStack>
        );
      })}
    </VStack>
  );
};

const BannerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Banners">
        <All />
      </Example>
      <Example title="With Link">
        <VStack gap={2}>
          <TextTitle1>Global</TextTitle1>
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
            <TextLabel2>
              {shortMessage}
              <Link to="https://www.coinbase.com"> Learn more</Link>
            </TextLabel2>
          </Banner>
          <TextTitle1>Inline</TextTitle1>
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
          <TextTitle1>Contextual</TextTitle1>
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
            <TextLabel2>
              {shortMessage}
              <Link to="https://www.coinbase.com"> Learn more</Link>
            </TextLabel2>
          </Banner>
        </VStack>
      </Example>
      <Example title="Custom Offset">
        <VStack gap={2}>
          <Spacer />
          <TextTitle1>Global</TextTitle1>
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="global"
            variant="informational"
          />
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="global"
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
          <Spacer />
          <TextTitle1>Inline</TextTitle1>
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="inline"
            variant="informational"
          />
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="inline"
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
      </Example>
      <Example>
        <TextTitle1>Vertical Align</TextTitle1>
        <VStack gap={2}>
          <Banner
            {...exampleProps}
            alignItems="center"
            startIconAccessibilityLabel="Information"
            title={undefined}
            variant="informational"
          >
            {examplePropsWithOffset.children}
          </Banner>
          <Banner
            {...exampleProps}
            showDismiss
            alignItems="center"
            startIconAccessibilityLabel="Information"
            title={undefined}
            variant="promotional"
          >
            {examplePropsWithOffset.children}
          </Banner>
          <Banner {...exampleProps} alignItems="center" variant="error" />
          <Banner
            {...exampleProps}
            showDismiss
            alignItems="center"
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            variant="warning"
          />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default BannerScreen;

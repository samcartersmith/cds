import React, { useCallback } from 'react';

import { ThemeVars } from '../new/vars';
import { LinkBaseProps } from '../types';
import { BannerBaseProps } from '../types/BannerBaseProps';
import { TextBaseProps } from '../types/TextBaseProps';
import { SpacerBaseProps, StackBaseProps } from '..';

import { loremIpsum } from './loremIpsumBuilder';

const shortMessage = 'Lorem ipsum dolar sit amet, consecturo';
const longMessage = `${loremIpsum}${loremIpsum}${loremIpsum}`;

const sharedProps = {
  title: 'Failure Message',
  variant: 'warning',
  startIcon: 'error',
  children: shortMessage,
} as const;

const styleProps = [
  {
    variant: 'warning',
    title: 'Warning message',
    startIcon: 'error',
  },
  {
    variant: 'danger',
    title: 'Danger message',
    startIcon: 'error',
  },
  {
    variant: 'informational',
    title: 'Informative message',
    startIcon: 'info',
  },
  {
    variant: 'promotional',
    title: 'Promotional message',
    startIcon: 'pencil',
  },
  {
    variant: 'error',
    title: 'Error message',
    startIcon: 'warning',
  },
] as const;

export function bannerBuilder(
  Banner: React.ComponentType<React.PropsWithChildren<BannerBaseProps>>,
  Link: React.ComponentType<React.PropsWithChildren<LinkBaseProps>>,
  TextTitle1: React.ComponentType<React.PropsWithChildren<TextBaseProps>>,
  VStack: React.ComponentType<React.PropsWithChildren<StackBaseProps>>,
  Spacer: React.ComponentType<React.PropsWithChildren<SpacerBaseProps>>,
) {
  const Container = ({
    children,
    title,
    gap,
    showVariations = true,
  }: {
    title: string;
    children: React.ReactElement<Partial<BannerBaseProps>>;
    gap?: ThemeVars.Space;
    showVariations?: boolean;
  }) => {
    let longTextChild = null;
    let actionChild = null;
    let multipleActionsChild = null;
    let longTextActionChild = null;
    let actionDismissChild = null;
    let dismissableChild = null;
    let longTextActionDismissChild = null;

    const primaryAction = <Link to="https://www.coinbase.com">Primary</Link>;
    const secondaryAction = <Link to="https://www.coinbase.com">Secondary</Link>;

    if (React.isValidElement(children)) {
      longTextChild = React.cloneElement(children, {
        children: longMessage,
        title: `${title} (Long text)`,
      });

      dismissableChild = React.cloneElement(children, {
        showDismiss: true,
        title: `${title} (Dismissable)`,
      });

      actionChild = React.cloneElement(children, {
        primaryAction,
        title: `${title} (Primary action)`,
      });

      longTextActionChild = React.cloneElement(children, {
        primaryAction,
        children: longMessage,
        title: `${title} (Primary action + long)`,
      });

      actionDismissChild = React.cloneElement(children, {
        primaryAction,
        showDismiss: true,
        title: `${title} (Action + Dismissable)`,
      });

      longTextActionDismissChild = React.cloneElement(children, {
        primaryAction,
        children: longMessage,
        showDismiss: true,
        title: `${title} (Long Text + Action + Dismissable)`,
      });

      multipleActionsChild = React.cloneElement(children, {
        primaryAction,
        secondaryAction,
        children: longMessage,
        title: `${title} (Multiple actions)`,
      });
    }

    return (
      <VStack gap={gap ?? 2}>
        <TextTitle1>{title}</TextTitle1>
        {children}
        {showVariations && (
          <VStack gap={gap ?? 2}>
            <Spacer />
            <TextTitle1>{title} Long Text</TextTitle1>
            {longTextChild}
            <Spacer />
            <TextTitle1>{title} with showDismiss</TextTitle1>
            {dismissableChild}
            <Spacer />
            <TextTitle1>{title} with multiple Actions</TextTitle1>
            {multipleActionsChild}
            <Spacer />
            <TextTitle1>{title} with Action</TextTitle1>
            {actionChild}
            <Spacer />
            <TextTitle1>{title} Long Text with Action</TextTitle1>
            {longTextActionChild}
            <Spacer />
            <TextTitle1>{title} with Action and showDismiss</TextTitle1>
            {actionDismissChild}
            <Spacer />
            <TextTitle1>{title} Long Text with Action and showDismiss</TextTitle1>
            {longTextActionDismissChild}
          </VStack>
        )}
      </VStack>
    );
  };

  const Basic = () => {
    return (
      <Container title="Basic">
        <Banner {...sharedProps} />
      </Container>
    );
  };

  const Variants = () => {
    return (
      <>
        {styleProps.map((props) => (
          <Container key={`styles-${props.variant}-long-message`} title={props.variant}>
            <Banner {...props}>{shortMessage}</Banner>
          </Container>
        ))}
      </>
    );
  };

  const FullBleed = () => {
    return (
      <Container gap={2} title="FullBleed">
        <Banner
          borderRadius={0}
          bordered={false}
          {...sharedProps}
          title={`${sharedProps.title}(Full bleed)`}
          variant="danger"
        />
      </Container>
    );
  };

  const LongTitle = () => {
    return (
      <Container gap={2} showVariations={false} title="LongTitle">
        <Banner {...sharedProps} title={longMessage} variant="danger" />
      </Container>
    );
  };

  const BannerWithLink = () => {
    return (
      <Container gap={2} showVariations={false} title="BannerWithLink">
        <Banner showDismiss startIcon="pencil" title="Banner with a Link" variant="promotional">
          {shortMessage}
          {shortMessage} <Link to="https://www.coinbase.com">Learn more</Link>
        </Banner>
      </Container>
    );
  };

  const OnClose = () => {
    const handleOnClose = useCallback(() => {
      // eslint-disable-next-line no-console
      console.log('dismissing banner');
    }, []);

    return (
      <Container gap={2} showVariations={false} title="OnClose">
        <Banner
          {...sharedProps}
          showDismiss
          onClose={handleOnClose}
          title="Close the banner"
          variant="danger"
        />
      </Container>
    );
  };

  const All = () => {
    return (
      <VStack gap={2}>
        <Basic />
        <Variants />
        <FullBleed />
        <LongTitle />
        <OnClose />
        <BannerWithLink />
      </VStack>
    );
  };

  const MockBanner = ({
    title = 'Failure Message',
    startIcon = 'info',
    variant = 'warning',
    testID,
    ...props
  }: Partial<BannerBaseProps>) => (
    <Banner startIcon={startIcon} testID={testID} title={title} variant={variant} {...props}>
      Banner content
    </Banner>
  );

  return {
    MockBanner,
    All,
  };
}

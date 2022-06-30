import React, { ComponentType, useCallback } from 'react';

import { LinkBaseProps } from '../types';
import { BannerBaseProps } from '../types/BannerBaseProps';
import { TextBaseProps } from '../types/TextBaseProps';
import { SpacerBaseProps, SpacingScale, StackBaseProps } from '..';

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
] as const;

export function bannerBuilder(
  Banner: ComponentType<BannerBaseProps>,
  Link: ComponentType<LinkBaseProps>,
  TextTitle1: ComponentType<TextBaseProps>,
  VStack: ComponentType<StackBaseProps>,
  Spacer: ComponentType<SpacerBaseProps>,
) {
  const Container = ({
    children,
    title,
    gap,
    showVariations = true,
  }: {
    title: string;
    children: React.ReactNode;
    gap?: SpacingScale;
    showVariations?: boolean;
  }) => {
    let longTextChild = null;
    let actionChild = null;
    let longTextActionChild = null;
    let actionDismissChild = null;
    let dismissableChild = null;
    let longTextActionDismissChild = null;

    const action = <Link to="https://www.coinbase.com">Action</Link>;

    if (React.isValidElement(children)) {
      longTextChild = React.cloneElement(children, {
        children: longMessage,
      });

      dismissableChild = React.cloneElement(children, {
        showDismiss: true,
      });

      actionChild = React.cloneElement(children, {
        action,
      });

      longTextActionChild = React.cloneElement(children, {
        action,
        children: longMessage,
      });

      actionDismissChild = React.cloneElement(children, {
        action,
        showDismiss: true,
      });

      longTextActionDismissChild = React.cloneElement(children, {
        action,
        children: longMessage,
        showDismiss: true,
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
        <Banner borderRadius="roundedNone" bordered={false} {...sharedProps} variant="danger" />
      </Container>
    );
  };

  const LongTitle = () => {
    return (
      <Container showVariations={false} gap={2} title="LongTitle">
        <Banner {...sharedProps} variant="danger" title={longMessage} />
      </Container>
    );
  };

  const BannerWithLink = () => {
    return (
      <Container showVariations={false} gap={2} title="BannerWithLink">
        <Banner showDismiss startIcon="pencil" variant="promotional" title="Banner with a Link">
          {shortMessage}
          {shortMessage} <Link to="https://www.coinbase.com">Learn more</Link>
        </Banner>
      </Container>
    );
  };

  const OnClose = () => {
    const handleOnClose = useCallback(() => {
      console.log('dismissing banner');
    }, []);

    return (
      <Container showVariations={false} gap={2} title="OnClose">
        <Banner
          {...sharedProps}
          variant="danger"
          showDismiss
          title="Close the banner"
          onClose={handleOnClose}
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
    <Banner title={title} startIcon={startIcon} variant={variant} testID={testID} {...props}>
      Banner content
    </Banner>
  );

  return {
    MockBanner,
    All,
  };
}

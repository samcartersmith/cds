import React, { memo } from 'react';
import { SpacingScale } from '@cbhq/cds-common';
import { Box } from '@cbhq/cds-web/layout/Box';
import { Divider } from '@cbhq/cds-web/layout/Divider';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';
import { TextHeadline } from '@cbhq/cds-web/typography/TextHeadline';

export type DoDontProps = {
  children: React.ReactNode;
  spacingVertical: SpacingScale;
};

type DoOrDontExampleProps = {
  children: React.ReactNode;
  media: JSX.Element;
};

type ExampleProps = {
  type: 'do' | 'dont';
} & DoOrDontExampleProps;

export const Example = memo(function Example({ children, media, type }: ExampleProps) {
  return (
    <VStack flexGrow={1} flexBasis={0} minWidth={200} height="100%" gap={1}>
      <Box minHeight={200} justifyContent="center" alignItems="center">
        {media}
      </Box>
      {/* @ts-expect-error These palette colors will work fine */}
      <Divider height={4} color={type === 'dont' ? 'negative' : 'positive'} />
      <TextHeadline as="p" color={type === 'dont' ? 'negative' : 'positive'}>
        {type === 'dont' ? 'DO NOT' : 'DO'}
      </TextHeadline>
      <TextBody as="p">{children}</TextBody>
    </VStack>
  );
});

export const DoExample = memo(function DoExample({ children, ...props }: DoOrDontExampleProps) {
  return (
    <Example type="do" {...props}>
      {children}
    </Example>
  );
});

export const DontExample = memo(function DontExample({ children, ...props }: DoOrDontExampleProps) {
  return (
    <Example type="dont" {...props}>
      {children}
    </Example>
  );
});

const DoDont = memo(function DoDont({ children }: DoDontProps) {
  return (
    <HStack gap={2} spacingVertical={6} borderRadius="rounded">
      {children}
    </HStack>
  );
});

Example.displayName = 'Example';
DoExample.displayName = 'DoExample';
DontExample.displayName = 'DontExample';
DoDont.displayName = 'DoDont';
export default DoDont;

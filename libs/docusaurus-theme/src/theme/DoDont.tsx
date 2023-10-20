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
    <VStack flexBasis={0} flexGrow={1} gap={1} height="100%" minWidth={200}>
      <Box alignItems="center" justifyContent="center" minHeight={200}>
        {media}
      </Box>
      {/* @ts-expect-error These palette colors will work fine */}
      <Divider color={type === 'dont' ? 'negative' : 'positive'} height={4} />
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
    <HStack borderRadius="rounded" gap={2} spacingVertical={6}>
      {children}
    </HStack>
  );
});

Example.displayName = 'Example';
DoExample.displayName = 'DoExample';
DontExample.displayName = 'DontExample';
DoDont.displayName = 'DoDont';
export default DoDont;

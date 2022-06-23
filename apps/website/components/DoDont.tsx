import { SpacingScale } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Divider } from '@cbhq/cds-web/layout/Divider';
import { TextBody, TextHeadline } from '@cbhq/cds-web/typography';

import { ImageProps as DocImageProps } from './DocImage';
import { Image, ImageProps } from './Image';

type Props = {
  children: React.ReactNode;
  spacingVertical: SpacingScale;
};

type DoExampleProps = {
  img?: ImageProps;
  children: React.ReactNode;
} & DocImageProps;

type ExampleProps = {
  type: 'do' | 'dont';
} & DoExampleProps;

export const DoDont: React.FC<Props> = ({ children = [], spacingVertical = 10 }) => {
  return (
    <HStack spacingVertical={spacingVertical} gap={2}>
      {children}
    </HStack>
  );
};

export const Example: React.FC<ExampleProps> = ({
  img,
  children,
  type,
  category = 'components',
  component,
  name,
  format = 'png',
}) => {
  const spectrumOpts = {
    light: `/img/${category}/${component}/${name}_light.${format}`,
    dark: `/img/${category}/${component}/${name}_dark.${format}`,
  };
  const docImgSrc = useSpectrumConditional(spectrumOpts);

  const imgSrc = img ?? { src: docImgSrc };

  return (
    <VStack flexGrow={1} flexBasis={0} minWidth="200px" height="100%" spacingVertical={10} gap={1}>
      <Box minHeight="200px" justifyContent="center" alignItems="center" spacingBottom={1}>
        <Image {...imgSrc} />
      </Box>
      {/* @ts-expect-error These palette colors will work fine */}
      <Divider height={4} color={type === 'dont' ? 'negative' : 'positive'} />
      <TextHeadline as="p" color={type === 'dont' ? 'negative' : 'positive'}>
        {type === 'dont' ? 'DO NOT' : 'DO'}
      </TextHeadline>
      <TextBody as="p">{children}</TextBody>
    </VStack>
  );
};

export const DoExample: React.FC<DoExampleProps> = (props) => {
  return (
    <Example type="do" {...props}>
      {props.children}
    </Example>
  );
};

export const DontExample: React.FC<DoExampleProps> = (props) => {
  return (
    <Example type="dont" {...props}>
      {props.children}
    </Example>
  );
};

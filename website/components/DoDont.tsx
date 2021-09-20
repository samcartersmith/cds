import { styled } from 'linaria/react';
import { palette } from '@cbhq/cds-web/tokens';
import { TextBody, TextHeadline } from '@cbhq/cds-web/typography';
import { Box, VStack, HStack } from '@cbhq/cds-web/layout';
import { Image, ImageProps } from './Image';

type Props = {
  children: React.ReactNode;
};

type DoExampleProps = {
  img?: ImageProps;
  children: React.ReactNode;
};

type ExampleProps = {
  type: 'do' | 'dont';
  img?: ImageProps;
  children: React.ReactNode;
};

type LineProps = {
  color: 'positive' | 'negative';
};

const Line = styled.div<LineProps>`
  height: 4px;
  width: 100%;
  background: ${({ color }) => (color === 'positive' ? palette.positive : palette.negative)};
`;

export const DoDont: React.FC<Props> = ({ children = [] }) => {
  return (
    <HStack spacingVertical={10} gap={2}>
      {children}
    </HStack>
  );
};

export const Example: React.FC<ExampleProps> = ({ img, children, type }) => {
  return (
    <VStack flexGrow={1} flexBasis={0} minWidth="200px" height="100%" spacingVertical={10} gap={1}>
      <Box minHeight="200px" justifyContent="center" alignItems="center" spacingBottom={1}>
        <Image {...img} />
      </Box>
      <Line color={type === 'dont' ? 'negative' : 'positive'} />
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

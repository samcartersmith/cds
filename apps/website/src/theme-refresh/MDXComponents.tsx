import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import MDXComponents from '@theme-original/MDXComponents';
import { Button, ButtonGroup, IconButton } from '@cbhq/cds-web/buttons';
import { Icon } from '@cbhq/cds-web/icons';
import { Box, Group, HStack, VStack } from '@cbhq/cds-web/layout';
import {
  Link,
  LinkProps,
  TextBody,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextProps,
  TextTitle1,
  TextTitle3,
  TextTitle4,
} from '@cbhq/cds-web/typography';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
  a: (props: LinkProps) => <Link {...props} />,
  h1: (props: TextProps) => <TextDisplay3 as="h1" {...props} />,
  h2: (props: TextProps) => <TextTitle1 as="h2" {...props} />,
  h3: (props: TextProps) => <TextTitle3 as="h3" {...props} />,
  h4: (props: TextProps) => <TextTitle4 as="h4" {...props} />,
  // @ts-expect-error Our types don't allow h5, but docusaurus uses it and Text will work if passed in
  h5: (props: TextProps) => <TextHeadline as="h5" {...props} />,
  p: (props: TextProps) => <TextBody as="p" {...props} />,
  li: (props: TextProps) => <TextBody as="li" {...props} />,
  span: (props: TextProps) => <TextLabel2 as="span" {...props} />,
  Button,
  ButtonGroup,
  Box,
  Group,
  HStack,
  Icon,
  IconButton,
  Link,
  VStack,
  Tabs,
  TabItem,
  TextBody,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle1,
  TextTitle3,
  TextTitle4,
};

export default MDXComponentOverrides;

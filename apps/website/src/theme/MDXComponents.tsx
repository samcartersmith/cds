import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import MDXComponents from '@theme-original/MDXComponents';
import { Box, Divider, Group, HStack, VStack } from '@cbhq/cds-web/layout';
import { Link } from '@cbhq/cds-web/typography';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
  Box,
  Divider,
  Group,
  HStack,
  Link,
  Tabs,
  TabItem,
  VStack,
};

export default MDXComponentOverrides;

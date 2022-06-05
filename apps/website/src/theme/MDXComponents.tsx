import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import MDXComponents from '@theme-original/MDXComponents';
import { Box, Divider, Group, HStack, VStack } from '@cbhq/cds-web/layout';
import { Link } from '@cbhq/cds-web/typography';

/** Temporary to be compatible once custom docusaurus theme and preset lands */
import { RightSidebar } from './RightSidebar';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
  Box,
  Divider,
  Group,
  HStack,
  Link,
  Tabs,
  TabItem,
  TOCUpdater: RightSidebar,
  VStack,
};

export default MDXComponentOverrides;

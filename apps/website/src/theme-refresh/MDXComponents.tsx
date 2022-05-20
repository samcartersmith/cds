import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import MDXComponents from '@theme-original/MDXComponents';
import { Button, ButtonGroup, IconButton } from '@cbhq/cds-web/buttons';
import { Icon } from '@cbhq/cds-web/icons';
import { Box, Group, HStack, VStack } from '@cbhq/cds-web/layout';
import {
  Link,
  TextBody,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle1,
  TextTitle3,
  TextTitle4,
} from '@cbhq/cds-web/typography';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
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

import ImportBlock from '@theme/ImportBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { TOCUpdater } from '@theme/TOCManager';
import MDXComponents from '@theme-init/MDXComponents';
import { Button, ButtonGroup, IconButton } from '@cbhq/cds-web/buttons';
import { Icon } from '@cbhq/cds-web/icons';
import { Box, Divider, Group, HStack, VStack } from '@cbhq/cds-web/layout';
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
  Divider,
  Group,
  HStack,
  Icon,
  IconButton,
  ImportBlock,
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
  TOCUpdater,
};

export default MDXComponentOverrides;

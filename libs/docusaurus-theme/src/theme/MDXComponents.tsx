import Collection from '@theme/Collection';
import CollectionItem from '@theme/CollectionItem';
import DoDont, { DoExample, DontExample } from '@theme/DoDont';
import Image from '@theme/Image';
import ImportBlock from '@theme/ImportBlock';
import JSDocTag from '@theme/JSDocTag';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { TOCUpdater } from '@theme/TOCManager';
import Video from '@theme/Video';
import MDXComponents from '@theme-init/MDXComponents';
import { Button, ButtonGroup, IconButton } from '@cbhq/cds-web/buttons';
import { ListCell } from '@cbhq/cds-web/cells/ListCell';
import { Icon } from '@cbhq/cds-web/icons';
import { Box, Divider, Group, HStack, Spacer, VStack } from '@cbhq/cds-web/layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import {
  Link,
  TextBody,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '@cbhq/cds-web/typography';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
  Button,
  ButtonGroup,
  Box,
  Collection,
  CollectionItem,
  Divider,
  DoDont,
  DoExample,
  DontExample,
  Group,
  HStack,
  Icon,
  IconButton,
  Image,
  ImportBlock,
  JSDocTag,
  Link,
  ListCell,
  Spacer,
  Tabs,
  TabItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TextBody,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
  TOCUpdater,
  Video,
  VStack,
};

export default MDXComponentOverrides;

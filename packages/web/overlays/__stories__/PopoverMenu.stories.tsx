import { AvatarButton, Button, IconButton } from '../../buttons';
import { FeedCard } from '../../cards/FeedCard';
import { CellMedia } from '../../cells/CellMedia';
import { SelectOption } from '../../controls/SelectOption';
import { DotStatusColor } from '../../dots/DotStatusColor';
import { NavigationIcon } from '../../icons';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack, VStack } from '../../layout';
import { Divider } from '../../layout/Divider';
import { NavigationBar, NavigationTitle } from '../../navigation';
import { Pressable } from '../../system/Pressable';
import { PopoverMenu } from '../PopoverMenu/PopoverMenu';
import { PopoverTrigger } from '../PopoverMenu/PopoverTrigger';
import { PopoverTriggerWrapper } from '../PopoverMenu/PopoverTriggerWrapper';
import { SectionTitle } from '../PopoverMenu/SectionTitle';
import { PortalProvider } from '../PortalProvider';

import { CreatePopoverMenuStoriesProps, popoverMenuBuilder } from './popoverMenuBuilder';

export default {
  title: 'Core Components/PopoverMenu',
  component: PopoverMenu,
};

const components = {
  PopoverMenu,
  PopoverTrigger,
  PopoverTriggerWrapper,
  VStack,
  HStack,
  SelectOption,
  IconButton,
  NavigationBar,
  NavigationTitle,
  Pictogram,
  CellMedia,
  FeedCard,
  Button,
  Divider,
  SectionTitle,
  DotStatusColor,
  AvatarButton,
  Pressable,
  NavigationIcon,
  PortalProvider,
};

export const { Default, NavigationMenu, FeedCardMenu, AvatarButtonMenu, FrontierMenu } =
  popoverMenuBuilder(components as CreatePopoverMenuStoriesProps);

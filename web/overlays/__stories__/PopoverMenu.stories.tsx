import { popoverMenuBuilder, CreatePopoverMenuStoriesProps } from './popoverMenuBuilder';
import { PopoverMenu } from '../PopoverMenu/PopoverMenu';
import { PopoverTrigger } from '../PopoverMenu/PopoverTrigger';
import { PopoverTriggerWrapper } from '../PopoverMenu/PopoverTriggerWrapper';
import { SelectOption } from '../../controls/SelectOption';
import { IconButton, Button, AvatarButton } from '../../buttons';
import { VStack, HStack } from '../../layout';
import { NavigationBar, NavigationTitle } from '../../navigation';
import { Pictogram } from '../../illustrations/Pictogram';
import { CellMedia } from '../../cells/CellMedia';
import { FeedCard } from '../../cards/FeedCard';
import { MenuItem } from '../MenuItem';
import { Divider } from '../../layout/Divider';
import { MenuSectionLabel } from '../MenuSectionLabel';
import { DotStatusColor } from '../../dots/DotStatusColor';

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
  MenuItem,
  IconButton,
  NavigationBar,
  NavigationTitle,
  Pictogram,
  CellMedia,
  FeedCard,
  Button,
  Divider,
  MenuSectionLabel,
  DotStatusColor,
  AvatarButton,
};

export const { Default, NavigationMenu, FeedCardMenu, AvatarButtonMenu, FrontierMenu } =
  popoverMenuBuilder(components as CreatePopoverMenuStoriesProps);

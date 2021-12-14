import { popoverMenuBuilder, CreatePopoverMenuStoriesProps } from './popoverMenuBuilder';
import { PopoverMenu } from '../PopoverMenu';
import { SelectOption } from '../../controls/SelectOption';
import { IconButton, Button } from '../../buttons';
import { VStack, HStack } from '../../layout';
import { NavigationBar, NavigationTitle } from '../../navigation';
import { Pictogram } from '../../illustrations/Pictogram';
import { CellMedia } from '../../cells/CellMedia';
import { FeedCard } from '../../cards/FeedCard';
import { MenuItem } from '../MenuItem';
import { Divider } from '../../layout/Divider';
import { MenuSectionLabel } from '../MenuSectionLabel';

export default {
  title: 'Core Components/PopoverMenu',
  component: PopoverMenu,
};

const components = {
  PopoverMenu,
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
};

export const { Default, NavigationMenu, FeedCardMenu, FrontierMenu } = popoverMenuBuilder(
  components as CreatePopoverMenuStoriesProps,
);

import { Button, IconButton } from '../../buttons';
import { FeedCard } from '../../cards/FeedCard';
import { CellMedia } from '../../cells/CellMedia';
import { SelectOption } from '../../controls/SelectOption';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack, VStack } from '../../layout';
import { Divider } from '../../layout/Divider';
import { NavigationBar, NavigationTitle } from '../../navigation';
import { MenuItem } from '../MenuItem';
import { MenuSectionLabel } from '../MenuSectionLabel';
import { PopoverMenu } from '../PopoverMenu';

import { CreatePopoverMenuStoriesProps, popoverMenuBuilder } from './popoverMenuBuilder';

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

import { pressButton, screenShouldAppear } from '@cbhq/detox-utils';

import { homeFlatList, homeScreen, screen } from '../constants';

export default async function navigateToRoute(routeName: string) {
  await screenShouldAppear(homeScreen);
  await pressButton(routeName, homeFlatList);
  await screenShouldAppear(screen);
}

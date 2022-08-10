import { pressButton, screenShouldAppear } from '@cbhq/detox-utils';

import { VisregConfig } from '../config';

export default async function navigateToRoute(
  routeName: string,
  playgroundTestIds: VisregConfig['playgroundTestIds'],
) {
  await screenShouldAppear(playgroundTestIds.homeScreen);
  await pressButton(routeName, playgroundTestIds.homeFlatList);
  await screenShouldAppear(playgroundTestIds.screen);
}

import { screenShouldAppear } from '@cbhq/detox-utils';

import { homeScreen } from '../constants';

export default async function navigateToHome(routeName: string) {
  await device.openURL({ url: routeName });
  await screenShouldAppear(homeScreen);
}

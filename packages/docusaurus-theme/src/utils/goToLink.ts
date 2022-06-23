/**
 * https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function goToLink(href: string) {
  if (ExecutionEnvironment.canUseDOM) {
    // eslint-disable-next-line no-restricted-globals
    window.location.assign(href);
  }
}

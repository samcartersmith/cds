/**
 * https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function goToLink(href: string) {
  if (ExecutionEnvironment.canUseDOM) {
    window.location.assign(href);
  }
}

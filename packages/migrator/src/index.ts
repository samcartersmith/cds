import type { Package } from 'update-notifier';
import updateNotifier from 'update-notifier';

updateNotifier({
  pkg: require('../package.json') as Package,
  shouldNotifyInNpmScript: true,
}).notify();

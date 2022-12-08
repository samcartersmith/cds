import updateNotifier, { Package } from 'update-notifier';

updateNotifier({
  pkg: require('../package.json') as Package,
  shouldNotifyInNpmScript: true,
}).notify();

export * from './executors/sync-icons/sync-icons';
export * from './executors/sync-illustrations/sync-illustrations';
export * from './executors/sync-styles/sync-styles';

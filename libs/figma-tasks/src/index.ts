import updateNotifier, { Package } from 'update-notifier';

updateNotifier({
  pkg: require('../package.json') as Package,
  shouldNotifyInNpmScript: true,
}).notify();

export * from './executors';

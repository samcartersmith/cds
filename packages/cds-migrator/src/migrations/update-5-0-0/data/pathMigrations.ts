/** These are essentially redirects. Component API and and name remain the same */
export const pathMigrations: Record<string, string> = {
  '@cbhq/cds-web/layout/Card': '@cbhq/cds-web/cards/Card',
  '@cbhq/cds-web/deprecated/navigation/Sidebar': '@cbhq/cds-web/navigation/Sidebar',
  '@cbhq/cds-web/overlays/PopoverMenu/MenuItem': '@cbhq/cds-web/dropdown/MenuItem',
  '@cbhq/cds-mobile/layout/Card': '@cbhq/cds-mobile/cards/Card',
  '@cbhq/cds-common/tokens/motion': '@cbhq/cds-common/motion/tokens',
};

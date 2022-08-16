import { Banner } from '@cbhq/cds-web/banner/Banner';
import { Link } from '@cbhq/cds-web/typography/Link';

export const AddRemoteImageBanner = () => {
  return (
    <Banner title="Instruction for adding remote images" variant="informational" startIcon="info">
      If you have a Coinbase Logo, BrandLogo, or other commonly used images that you think should be
      shared. Please add it to the{' '}
      <Link to="https://github.cbhq.net/engineering/static-assets/tree/master/assets/design-system">
        Design System Assets Repo
      </Link>
      . Add it to the respective directory. For example, if its a brandLogo, add it to brandLogo
      directory.
    </Banner>
  );
};

import { commonPackage, mobilePackage, PathMigrations, webPackage } from '../../../helpers';

const alphaWeb = '@cbhq/cds-web/alpha';
const alphaMobile = '@cbhq/cds-mobile/alpha';
const alphaCommonTypes = '@cbhq/cds-common/types/alpha';

export const pathMigrations: PathMigrations = {
  [`${alphaWeb}/AnnouncementCard`]: `${webPackage}/cards/AnnouncementCard`,
  [`${alphaMobile}/AnnouncementCard`]: `${mobilePackage}/cards/AnnouncementCard`,
  [`${alphaWeb}/FeatureEntryCard`]: `${webPackage}/cards/FeatureEntryCard`,
  [`${alphaMobile}/FeatureEntryCard`]: `${mobilePackage}/cards/FeatureEntryCard`,
  [`${alphaMobile}/Button`]: `${mobilePackage}/buttons/Button`,
  [`${alphaMobile}/IconButton`]: `${mobilePackage}/buttons/IconButton`,
  [`${alphaWeb}/CardGroup`]: `${webPackage}/cards/CardGroup`,
  [`${alphaMobile}/CardGroup`]: `${mobilePackage}/cards/CardGroup`,
  [`${alphaWeb}/CardMedia`]: `${webPackage}/cards/CardMedia`,
  [`${alphaMobile}/CardMedia`]: `${mobilePackage}/cards/CardMedia`,
  [`${alphaWeb}/FeedCard`]: `${webPackage}/cards/FeedCard`,
  [`${alphaMobile}/FeedCard`]: `${mobilePackage}/cards/FeedCard`,
  [`${alphaWeb}/CardFooter`]: `${webPackage}/cards/CardFooter`,
  [`${alphaMobile}/CardFooter`]: `${mobilePackage}/cards/CardFooter`,
  [`${alphaMobile}/Collapsible`]: `${mobilePackage}/layout/Collapsible`,
  [`${alphaWeb}/VStack`]: `${webPackage}/layout/VStack`,
  [`${alphaWeb}/HStack`]: `${webPackage}/layout/HStack`,
  [`${alphaCommonTypes}`]: `${commonPackage}/types`,
  [`${alphaWeb}/CardBody`]: `${webPackage}/cards/CardBody`,
  [`${alphaMobile}/CardBody`]: `${mobilePackage}/cards/CardBody`,
  [`${alphaWeb}/DataCard`]: `${webPackage}/cards/DataCard`,
  [`${alphaMobile}/DataCard`]: `${mobilePackage}/cards/DataCard`,
};

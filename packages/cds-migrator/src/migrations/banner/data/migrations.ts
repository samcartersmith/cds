import {
  AttributeValueRenameMapShape,
  commonPackage,
  mobilePackage,
  PackageName,
  PathMigrations,
  webPackage,
} from '../../../helpers';

type MigrationsToDeepImportsType = {
  newPath: `${PackageName}/${string}`;
  exports: string[];
  oldPath: string;
};

export const migrationsToDeepImports: MigrationsToDeepImportsType[] = [
  {
    exports: ['BannerVariant', 'BannerBaseProps'],
    newPath: `${commonPackage}/types/AlphaBannerBaseProps`,
    oldPath: commonPackage,
  },
];

export const propValueMigrations: AttributeValueRenameMapShape = {
  Banner: {
    attribute: 'variant',
    valueMap: {
      danger: 'error',
      warning: 'error',
      error: 'warning',
    },
    paths: [`${webPackage}/banner/Banner`, `${mobilePackage}/banner/Banner`],
  },
};

export const pathMigrations: PathMigrations = {
  [`${webPackage}/banner/Banner`]: `${webPackage}/alpha/banner/Banner`,
  [`${mobilePackage}/banner/Banner`]: `${mobilePackage}/alpha/banner/Banner`,
  [`${commonPackage}/tokens/banner`]: `${commonPackage}/tokens/alphaBanner`,
};

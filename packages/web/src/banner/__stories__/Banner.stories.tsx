import { useMemo } from 'react';
import { bannerBuilder } from '@cbhq/cds-common/internal/bannerBuilder';
import { paletteValueToRgbaString } from '@cbhq/cds-common/palette/paletteValueToRgbaString';

import { Spacer, VStack } from '../../layout';
import { Link } from '../../typography';
import { TextBody } from '../../typography/TextBody';
import { TextTitle1 } from '../../typography/TextTitle1';
import { Banner } from '../Banner';

export default {
  component: Banner,
  title: 'Core Components/Banner',
};

const { All } = bannerBuilder(
  Banner,
  Link,
  (props) => <TextTitle1 as="h1" {...props} />,
  VStack,
  Spacer,
);

export { All };

export const CustomStyle = () => {
  const customStyle = useMemo(
    () => ({
      paddingTop: 32,
      paddingBottom: 32,
      backgroundColor: paletteValueToRgbaString('orange0', 'light'),
      borderColor: paletteValueToRgbaString('orange10', 'light'),
    }),
    [],
  );
  return (
    <Banner
      showDismiss
      startIcon="pencil"
      style={customStyle}
      title="Banner with custom Style"
      variant="informational"
    >
      <TextBody as="p">Lorem ipsum dolar sit amet, consecturo</TextBody>
    </Banner>
  );
};

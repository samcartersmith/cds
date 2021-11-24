import React, { useState, memo, useEffect, useMemo } from 'react';

import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';
import { SvgXml } from 'react-native-svg';

import { IllustrationFilePathMap } from './RelativePathMap';

export const Illustration = memo(function Illustration({ name, ...props }: IllustrationBaseProps) {
  const imageMetadata = useMemo(() => IllustrationFilePathMap[name], [name]);
  const [illustrationXML, setIllustrationXML] = useState<string | null>(null);

  const imagePath =
    useSpectrumConditional({
      light: imageMetadata.light,
      dark: imageMetadata.dark,
    }) ?? imageMetadata.light;

  const style = useMemo(
    () => ({
      // Illustrations dont render if values are undefined
      ...(props.width && { width: props.width }),
      ...(props.height && { height: props.height }),
    }),
    [props.width, props.height],
  );

  useEffect(() => {
    const importIllustration = async (): Promise<void> => {
      try {
        const xml = (await imagePath).content;
        setIllustrationXML(xml);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          /* eslint-disable-next-line no-console */
          console.error(err);
        }
      }
    };
    importIllustration().catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        /* eslint-disable-next-line no-console */
        console.error(err);
      }
    });
  }, [imagePath, name]);

  if (imagePath === null) {
    return null;
  }

  if (imageMetadata.fileFormat === 'svg') {
    return <SvgXml style={style} xml={illustrationXML} {...props} />;
  }

  return null;
});

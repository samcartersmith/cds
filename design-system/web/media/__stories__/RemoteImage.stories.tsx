import { svgs } from '@cbhq/cds-common/internal/data/assets';
import { css } from 'linaria';
import { HStack, VStack } from '../../layout';
import { TextTitle1 } from '../../typography/TextTitle1';
import { RemoteImage } from '../RemoteImage';
import { ThemeProvider } from '../../system';

export default {
  component: RemoteImage,
  title: 'Core Components/RemoteImage',
};

const sharedProps = {
  resizeMode: 'cover',
  shape: 'circle',
  width: 32,
  height: 32,
} as const;

const whiteBorder = css`
  border-color: black;
  border-width: 8px;
`;

const imageURL =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

const mockItems = Array.from({ length: 4 });

export const Default = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <TextTitle1 as="h3">Default Shape</TextTitle1>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="square" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Circle Shape</TextTitle1>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Squircle Shape</TextTitle1>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `squircle-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">SVGs</TextTitle1>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return <RemoteImage key={key} source={imgURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">DangerouslySetClassName</TextTitle1>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return (
              <RemoteImage
                key={key}
                dangerouslySetClassName={whiteBorder}
                source={imgURL}
                {...sharedProps}
                shape="squircle"
              />
            );
          })}
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};

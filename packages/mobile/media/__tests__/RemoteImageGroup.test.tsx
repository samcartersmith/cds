import { render, screen } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common';
import { borderRadius } from '@cbhq/cds-common/tokens/borderRadius';
import { RemoteImageGroupBaseProps } from '@cbhq/cds-common/types/RemoteImageGroupBaseProps';

import * as scaleStyles from '../../styles/scale';
import { RemoteImage } from '../RemoteImage';
import { RemoteImageGroup } from '../RemoteImageGroup';

const src = 'https://images.coinbase.com/avatar?s=56';
const TEST_ID = 'remote-image-test-id';
const remoteImageIndices = [0, 1, 2, 3];

const MockRemoteImageGroup = ({ ...props }: RemoteImageGroupBaseProps) => (
  <RemoteImageGroup testID={TEST_ID} shape="circle" {...props}>
    {remoteImageIndices.map((index) => (
      <RemoteImage key={`remote-image-child-${index}`} source={src} />
    ))}
  </RemoteImageGroup>
);

describe('RemoteImageGroup', () => {
  it('renders RemoteImageGroup', () => {
    render(<MockRemoteImageGroup />);

    const imageWrapper = screen.getByTestId(TEST_ID);

    expect(imageWrapper).toBeTruthy();
  });

  it('Margin are correctly applied for size m. First one has 0, and the following ones will have 1', () => {
    render(<MockRemoteImageGroup />);

    const remoteImage1 = screen.getByTestId(`${TEST_ID}-inner-box-0`);

    expect(remoteImage1).toHaveStyle({
      marginRight: -0,
    });

    remoteImageIndices.slice(1).forEach((index) => {
      const imageChildren = screen.getByTestId(`${TEST_ID}-inner-box-${index}`);

      expect(imageChildren).toHaveStyle({
        marginRight: -scaleStyles.xxLarge.spacing[1],
      });
    });
  });

  it('Margin are correctly applied for size xxl. First one has 0, and the following ones will have 2', () => {
    render(<MockRemoteImageGroup size="xxl" />);

    const remoteImage1 = screen.getByTestId(`${TEST_ID}-inner-box-0`);

    expect(remoteImage1).toHaveStyle({
      marginRight: -0,
    });

    remoteImageIndices.slice(1).forEach((index) => {
      const imageChildren = screen.getByTestId(`${TEST_ID}-inner-box-${index}`);

      expect(imageChildren).toHaveStyle({
        marginRight: -scaleStyles.xxLarge.spacing[2],
      });
    });
  });

  it('default size = m', () => {
    render(<MockRemoteImageGroup />);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        width: normalScaleMap.m,
        height: normalScaleMap.m,
      });
    });
  });

  it('default shape = circle', async () => {
    render(<MockRemoteImageGroup />);

    await screen.findByTestId(TEST_ID);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        borderRadius: borderRadius.roundedFull,
      });
    });
  });

  it('default max = 4', () => {
    render(<MockRemoteImageGroup />);

    // There are 4 remote images, if the default was max = 4,
    // there shall be no need for excess text
    expect(screen.queryByTestId(`${TEST_ID}-excess-text`)).toBeNull();
  });

  it('size={30} prop works as expected', () => {
    render(<MockRemoteImageGroup size={30} />);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        width: 30,
        height: 30,
      });
    });
  });

  it('size={l} prop works as expected', () => {
    render(<MockRemoteImageGroup size="l" />);

    remoteImageIndices.forEach((index) => {
      const remoteImage = screen.getByTestId(`${TEST_ID}-image-${index}`);

      expect(remoteImage).toHaveStyle({
        width: normalScaleMap.l,
        height: normalScaleMap.l,
      });
    });
  });

  it('excess text shows up correctly', () => {
    render(<MockRemoteImageGroup max={2} size={50} />);
    expect(screen.getByText('+2')).toBeTruthy();
  });

  it('fontSize is proportional to dimension of RemoteImage for avatarSizes={m}', () => {
    render(<MockRemoteImageGroup max={2} />);

    const excessText = screen.getByTestId(`${TEST_ID}-excess-text`);

    expect(excessText).toHaveStyle({
      fontSize: normalScaleMap.m * 0.4,
    });
  });

  it('fontSize is proportional to dimension of RemoteImage for number sizes', () => {
    const LOCAL_SIZE = 27;
    render(<MockRemoteImageGroup max={2} size={LOCAL_SIZE} />);

    const excessText = screen.getByTestId(`${TEST_ID}-excess-text`);

    expect(excessText).toHaveStyle({
      fontSize: LOCAL_SIZE * 0.4,
    });
  });
});

import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { RemoteImageGroupBaseProps } from '@cbhq/cds-common/types/RemoteImageGroupBaseProps';
import { Shape } from '@cbhq/cds-common/types/Shape';
import { renderA11y } from '@cbhq/cds-web-utils';

import { borderRadiusVariables } from '../../styles/borderRadius';
import { RemoteImage } from '../RemoteImage';
import { RemoteImageGroup } from '../RemoteImageGroup';

const src = 'https://images.coinbase.com/avatar?s=56';
const TEST_ID = 'remote-image-test-id';
const SIZE = 40;

const SHAPE_TO_BORDERRADIUS_MAP = {
  circle: borderRadiusVariables['--border-radius-rounded-full'],
  squircle: borderRadiusVariables['--border-radius-rounded'],
  square: borderRadiusVariables['--border-radius-rounded-small'],
  rectangle: '0',
} as const;

const RemoteImageGroupDefaults = ({ ...props }: RemoteImageGroupBaseProps) => (
  <RemoteImageGroup testID={TEST_ID} size={SIZE} shape="circle" {...props}>
    <RemoteImage alt="Test RemoteImage" source={src} />
    <RemoteImage alt="Test RemoteImage" source={src} />
    <RemoteImage alt="Test RemoteImage" source={src} />
    <RemoteImage alt="Test RemoteImage" source={src} />
  </RemoteImageGroup>
);

describe('RemoteImageGroup', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<RemoteImageGroupDefaults />)).toHaveNoViolations();
  });
});

describe('renders correct default', () => {
  it('renders correct default size if not specified - default size = 24x24', () => {
    const { getByTestId } = render(
      <RemoteImageGroup shape="circle" testID={TEST_ID}>
        <RemoteImage source={src} />
      </RemoteImageGroup>,
    );
    const box: HTMLElement | null = getByTestId(TEST_ID);
    expect(box).toBeTruthy();

    const children = Array.from(box?.children);
    const allChildHaveCorrectSize = true;

    children.forEach((child) => {
      if (!allChildHaveCorrectSize) return;

      const childImg = child.querySelector('img');
      const childWidth = childImg?.width;
      const childHeight = childImg?.height;

      expect(childWidth).toBe(24);
      expect(childHeight).toBe(24);
    });
    expect(allChildHaveCorrectSize).toBe(true);
  });
  it('renders correct default shape if not specified - default shape = circle', () => {
    const { getByTestId } = render(
      <RemoteImageGroup testID={TEST_ID}>
        <RemoteImage source={src} />
      </RemoteImageGroup>,
    );
    const box: HTMLElement | null = getByTestId(TEST_ID);
    expect(box).toBeTruthy();

    const children = Array.from(box?.children);
    let allChildrenHaveParentShape = true;

    children.forEach((child) => {
      if (!allChildrenHaveParentShape) return;

      const childImg = child.querySelector('img');
      const childBorderRadius = childImg?.style.getPropertyValue('border-radius');

      allChildrenHaveParentShape = childBorderRadius === SHAPE_TO_BORDERRADIUS_MAP.circle;
    });
    expect(allChildrenHaveParentShape).toBe(true);
  });
});

describe('renders different shapes', () => {
  const SHAPES = [
    'circle',
    'squircle',
    'square',
    'rectangle',
  ] as (keyof typeof SHAPE_TO_BORDERRADIUS_MAP)[];

  SHAPES.map((shape) => {
    return it(`all child elements have this ${shape} and size ${SIZE}x${SIZE}`, () => {
      const { getByTestId } = render(<RemoteImageGroupDefaults shape={shape as Shape} />);

      const box: HTMLElement | null = getByTestId(TEST_ID);
      expect(box).toBeTruthy();

      const children = Array.from(box?.children);
      let allChildrenHaveParentShape = true;
      let allChildHaveParentWidth = true;
      let allChildHaveParentHeight = true;

      children.forEach((child) => {
        if (!allChildrenHaveParentShape) return;

        const childImg = child.querySelector('img');
        const childBorderRadius = childImg?.style.getPropertyValue('border-radius');
        const childWidth = childImg?.width;
        const childHeight = childImg?.height;

        allChildrenHaveParentShape = childBorderRadius === SHAPE_TO_BORDERRADIUS_MAP[shape];
        allChildHaveParentHeight = childWidth === SIZE;
        allChildHaveParentWidth = childHeight === SIZE;
      });
      expect(allChildrenHaveParentShape).toBe(true);
      expect(allChildHaveParentWidth).toBe(true);
      expect(allChildHaveParentHeight).toBe(true);
    });
  });
});

import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { getNormalAvatarPixelSize } from '@cbhq/cds-common/media/useAvatarSize';
import { spectrumConfigs } from '@cbhq/cds-common/spectrum/spectrumConfigs';
import { colorSchemeMap } from '@cbhq/cds-common/tokens/avatar';
import { AvatarSize } from '@cbhq/cds-common/types/AvatarSize';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Avatar, avatarColoredFallbackClassName, staticClassName } from '../Avatar';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('Avatar', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Avatar alt="Test Name" src={src} />)).toHaveNoViolations();
  });

  it('renders an image with alt text', () => {
    const name = 'Test Name';
    const { queryByAltText } = render(<Avatar alt={name} src={src} />);

    const imgNode = queryByAltText(name);
    expect(imgNode).toBeTruthy();
    expect((imgNode as HTMLImageElement).src).toEqual(src);
  });

  it('has a border color', () => {
    const { container } = render(<Avatar alt="TestName" src={src} borderColor="positive" />);
    const box = container.querySelector(`.${staticClassName}`);

    expect(box).toBeTruthy();
    expect(box?.className).toContain('positive');
    expect(box?.className).toContain('borderStyles');
  });

  it('renders different sizes', () => {
    function renderAvatar(size: AvatarSize) {
      const px = getNormalAvatarPixelSize(size);

      const { container } = render(<Avatar alt="TestName" size={size} src={src} />);
      const box: HTMLDivElement | null = container.querySelector(`.${staticClassName}`);
      expect(box).toBeTruthy();
      expect(box?.style.width).toBe(`${px}px`);
      expect(box?.style.height).toBe(`${px}px`);
    }

    for (const size of ['m', 'l', 'xl', 'xxl', 'xxxl']) {
      renderAvatar(size as AvatarSize);
    }
  });

  it('handles shapes', () => {
    let { container } = render(<Avatar alt="TestName" src={src} />);

    let box: HTMLDivElement | null = container.querySelector(`.${staticClassName}`);
    expect(box).toBeTruthy();
    expect(box?.className).toContain('round');

    container = render(<Avatar alt="TestName" shape="square" src={src} />).container;
    box = container.querySelector(`.${staticClassName}`);
    expect(box).toBeTruthy();
    expect(box?.className).not.toContain('standard');
    expect(box?.className).toContain('roundedSmall');
  });
  it('when passed a name prop and no src is provided it shows a fallback color and first letter of name prop', () => {
    const { container } = render(<Avatar alt="" name="TestName" colorScheme="pink" />);
    const pinkBackgroundColor = `rgb(${
      // @ts-expect-error can't index readonly type
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      spectrumConfigs.base.light[colorSchemeMap.light.pink as string].join(', ')
    })`;

    expect(container.textContent).toBe('T');

    const fallbackBox: HTMLDivElement | null = container.querySelector(
      `.${avatarColoredFallbackClassName}`,
    );
    expect(fallbackBox).toBeTruthy();
    expect(fallbackBox?.style.background).toBe(pinkBackgroundColor);
  });
  it('does not render a border if there is a name prop and uses the fallback color treatment', () => {
    const { container } = render(
      <Avatar alt="" name="TestName" colorScheme="pink" borderColor="positive" />,
    );

    const box: HTMLDivElement | null = container.querySelector(`.${staticClassName}`);
    expect(box).toBeTruthy();
    expect(box?.className).not.toContain('borderStyles');
  });
});

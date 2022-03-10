import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { getNormalAvatarPixelSize } from '@cbhq/cds-common/media/useAvatarSize';
import { AvatarSize } from '@cbhq/cds-common/types/AvatarSize';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Avatar } from '../Avatar';

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
    const box = container.querySelector('.cds-avatar');

    expect(box).toBeTruthy();
    expect(box?.className).toContain('positive');
    expect(box?.className).toContain('borderStyles');
  });

  it('renders different sizes', () => {
    function renderAvatar(size: AvatarSize) {
      const px = getNormalAvatarPixelSize(size);

      const { container } = render(<Avatar alt="TestName" size={size} src={src} />);
      const box: HTMLDivElement | null = container.querySelector('.cds-avatar');
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

    let box: HTMLDivElement | null = container.querySelector('.cds-avatar');
    expect(box).toBeTruthy();
    expect(box?.className).toContain('round');

    container = render(<Avatar alt="TestName" shape="square" src={src} />).container;
    box = container.querySelector('.cds-avatar');
    expect(box).toBeTruthy();
    expect(box?.className).not.toContain('standard');
    expect(box?.className).not.toContain('round');
  });
});

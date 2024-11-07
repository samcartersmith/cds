import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';
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
    render(<Avatar alt={name} src={src} />);

    const imgNode = screen.queryByAltText(name);
    expect(imgNode).toBeTruthy();
    expect((imgNode as HTMLImageElement).src).toEqual(src);
  });

  it('has a border color', () => {
    render(<Avatar alt="TestName" borderColor="positive" src={src} testID="avatar-component" />);
    const box = screen.getByTestId('avatar-component');

    expect(box).toBeTruthy();
    expect(box).toHaveClass(staticClassName);
    expect(box?.className).toContain('positive');
    expect(box?.className).toContain('borderStyles');
  });

  it('renders different sizes', () => {
    function renderAvatar(size: AvatarSize) {
      const px = getNormalAvatarPixelSize(size);

      render(<Avatar alt="TestName" size={size} src={src} testID="avatar-component" />);
      const box = screen.getByTestId('avatar-component');

      expect(box).toBeTruthy();
      expect(box).toHaveClass(staticClassName);
      expect(box?.style.width).toBe(`${px}px`);
      expect(box?.style.height).toBe(`${px}px`);
      cleanup();
    }

    for (const size of ['m', 'l', 'xl', 'xxl', 'xxxl']) {
      renderAvatar(size as AvatarSize);
    }
  });

  it('handles shapes', () => {
    render(<Avatar alt="TestName" src={src} testID="avatar-component" />);

    const box = screen.getByTestId('avatar-component');
    expect(box).toBeTruthy();
    expect(box?.className).toContain('round');

    render(<Avatar alt="TestName" shape="square" src={src} testID="avatar-square-component" />);
    const square = screen.getByTestId('avatar-square-component');
    expect(square).toBeTruthy();
    expect(square?.className).not.toContain('standard');
    expect(square?.className).toContain('roundedSmall');

    render(<Avatar alt="TestName" shape="hexagon" src={src} testID="avatar-hexagon-component" />);
    const hexagon = screen.getByTestId('avatar-hexagon-component');
    expect(hexagon).toBeTruthy();
    expect(hexagon?.className).toContain('cds-hexagon');
  });
  it('when passed a name prop and no src is provided it shows a fallback color and first letter of name prop', () => {
    render(<Avatar alt="" colorScheme="pink" name="TestName" testID="avatar-component" />);
    const pinkBackgroundColor = `rgb(${
      // @ts-expect-error can't index readonly type
      spectrumConfigs.base.light[colorSchemeMap.light.pink as string].join(', ')
    })`;
    const fallbackBox = screen.getByTestId('avatar-component-fallback');

    expect(fallbackBox).toBeTruthy();
    expect(fallbackBox.textContent).toBe('T');
    expect(fallbackBox).toHaveClass(avatarColoredFallbackClassName);
    expect(fallbackBox?.style.background).toBe(pinkBackgroundColor);
  });
  it('when passed an empty string for src it shows a fallback image', () => {
    const name = 'Test Name';
    render(<Avatar alt={name} src="" />);

    const imgNode = screen.queryByAltText(name);

    expect(imgNode).toBeTruthy();
    expect((imgNode as HTMLImageElement).src).toMatch(/^data:image/);
  });
  it('does not render a border if there is a name prop and uses the fallback color treatment', () => {
    render(
      <Avatar
        alt=""
        borderColor="positive"
        colorScheme="pink"
        name="TestName"
        testID="avatar-component"
      />,
    );

    const box = screen.getByTestId('avatar-component');

    expect(box).toBeTruthy();
    expect(box).toHaveClass(staticClassName);
    expect(box?.className).not.toContain('borderStyles');
  });

  it('capitalizes first letter of avatar name', () => {
    const name = 'testName';
    render(<Avatar alt="" colorScheme="pink" name={name} testID="avatar-component" />);
    const { firstChild: childElement } = screen.getByTestId('avatar-component-fallback');
    expect(childElement instanceof HTMLElement && childElement.className).toContain('uppercase');
    expect(childElement).not.toBeNull();
  });
});

import { renderA11y } from '@cbhq/jest-utils';
import { render } from '@testing-library/react';
import { Avatar } from '../Avatar';
import '@testing-library/jest-dom';

describe('Avatar', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Avatar name="Test Name" />)).toHaveNoViolations();
  });

  it('has text fallback', () => {
    const { queryByText } = render(<Avatar name="TestName" />);
    expect(queryByText('T')).toBeInTheDocument();
  });

  it('renders an image with alt text', () => {
    const name = 'Test Name';
    const src = 'https://images.coinbase.com/avatar?s=56';
    const { queryByAltText, queryByText } = render(<Avatar name={name} src={src} />);

    const imgNode = queryByAltText(name);
    expect(imgNode).toBeTruthy();
    expect((imgNode as HTMLImageElement).src).toEqual(src);
    expect(queryByText('T')).not.toBeInTheDocument();
  });

  it('has a border color', () => {
    const { container } = render(<Avatar name="TestName" borderColor="positive" />);
    const box = container.querySelector('.cds-avatar');

    expect(box).toBeTruthy();
    expect(box?.className).toContain('positive');
    expect(box?.className).toContain('borderStyles');
  });

  it('renders a custom size', () => {
    const { container } = render(<Avatar name="TestName" dangerouslySetSize={100} />);
    const box: HTMLDivElement | null = container.querySelector('.cds-avatar');
    expect(box).toBeTruthy();
    expect(box?.style.width).toEqual('100px');
    expect(box?.style.height).toEqual('100px');
  });

  it('handles shapes', () => {
    let { container } = render(<Avatar name="TestName" />);

    let box: HTMLDivElement | null = container.querySelector('.cds-avatar');
    expect(box).toBeTruthy();
    expect(box?.className).toContain('round');

    container = render(<Avatar name="TestName" shape="squircle" />).container;
    box = container.querySelector('.cds-avatar');
    expect(box).toBeTruthy();
    expect(box?.className).toContain('standard');

    container = render(<Avatar name="TestName" shape="square" />).container;
    box = container.querySelector('.cds-avatar');
    expect(box).toBeTruthy();
    expect(box?.className).not.toContain('standard');
    expect(box?.className).not.toContain('round');
  });
});

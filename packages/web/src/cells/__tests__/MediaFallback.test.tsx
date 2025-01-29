import { render, screen } from '@testing-library/react';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { MediaFallback } from '../MediaFallback';

describe('MediaFallback.test', () => {
  it('renders media fallback', () => {
    render(<MediaFallback testID="test-media-fallback" type="asset" />);

    const element = screen.getByTestId('test-media-fallback');

    expect(element).toHaveStyle({
      width: `${mediaSize.normal}px`,
    });
  });

  it('renders image fallback', () => {
    render(<MediaFallback testID="test-media-fallback" type="image" />);

    expect(screen.getByTestId('test-media-fallback')).toHaveStyle({
      width: `${imageSize.normal}px`,
    });
  });
});

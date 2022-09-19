import { render } from '@testing-library/react';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { MediaFallback } from '../MediaFallback';

describe('MediaFallback.test', () => {
  it('renders media fallback', () => {
    const { getByTestId } = render(<MediaFallback type="asset" testID="test-media-fallback" />);

    expect(getByTestId('test-media-fallback')).toHaveStyle({ width: `${mediaSize.normal}px` });
  });

  it('renders image fallback', () => {
    const { getByTestId } = render(<MediaFallback type="image" testID="test-media-fallback" />);

    expect(getByTestId('test-media-fallback')).toHaveStyle({ width: `${imageSize.normal}px` });
  });
});

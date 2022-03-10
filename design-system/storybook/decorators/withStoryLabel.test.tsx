import { render } from '@testing-library/react';

import { StoryNameLabel } from './withStoryLabel';

describe('Decorators', () => {
  it('render children with a default label', () => {
    const { getByText } = render(<StoryNameLabel name="title">test</StoryNameLabel>);
    expect(getByText('test')).toBeDefined();
    expect(getByText('title')).toBeDefined();
  });
});

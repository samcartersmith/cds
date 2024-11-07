import { render, screen } from '@testing-library/react';

import { StoryNameLabel } from './withStoryLabel';

describe('Decorators', () => {
  it('render children with a default label', () => {
    render(<StoryNameLabel name="title">test</StoryNameLabel>);
    expect(screen.getByText('test')).toBeDefined();
    expect(screen.getByText('title')).toBeDefined();
  });
});

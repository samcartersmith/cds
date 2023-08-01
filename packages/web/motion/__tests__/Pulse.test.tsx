import { RefObject } from 'react';
import { act, render, screen } from '@testing-library/react';
import { useAnimation } from 'framer-motion';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Pulse } from '../Pulse';

jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...jest.requireActual('framer-motion'),
    useAnimation: jest.fn(),
  };
});

describe('Pulse', () => {
  let start = jest.fn();
  let stop = jest.fn();

  beforeEach(() => {
    start = jest.fn();
    stop = jest.fn();
    (useAnimation as jest.Mock).mockImplementation(() => ({
      start,
      stop,
      set: jest.fn(),
    }));
  });

  it('passes a11y', async () => {
    expect(
      await renderA11y(
        <Pulse>
          <div>Children</div>
        </Pulse>,
      ),
    ).toHaveNoViolations();
  });

  it('renders children', () => {
    const childrenText = 'Children text';
    render(
      <Pulse>
        <div>{childrenText}</div>
      </Pulse>,
    );
    expect(screen.getByText('Children text')).toBeInTheDocument();
  });

  it('starts animation on mount by default', () => {
    render(
      <Pulse>
        <div>Children</div>
      </Pulse>,
    );
    expect(start).toHaveBeenCalledTimes(1);
  });

  it('doesnt start animation on mount when disableAnimateOnMount', () => {
    render(
      <Pulse disableAnimateOnMount>
        <div>Children</div>
      </Pulse>,
    );
    expect(start).not.toHaveBeenCalled();
  });

  it('exposes imperative handlers that start and stop the animation', () => {
    const ref = { current: null } as RefObject<{
      play: () => Promise<void>;
      stop: () => Promise<void>;
    }>;
    render(
      <Pulse ref={ref}>
        <div>Children</div>
      </Pulse>,
    );
    start.mockClear();
    stop.mockClear();
    expect(stop).not.toHaveBeenCalled();
    act(() => void ref.current?.stop());
    expect(stop).toHaveBeenCalledTimes(1);
    expect(start).not.toHaveBeenCalled();
    act(() => void ref.current?.play());
    expect(start).toHaveBeenCalledTimes(1);
  });
});

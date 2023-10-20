import React, { useCallback, useRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMotionConfig } from '@cbhq/cds-common/motion/tokens';

import { ColorSurgeBackground } from '../..';
import { ColorSurge, ColorSurgeTypes } from '../ColorSurge';
import { useMotionProps } from '../useMotionProps';

const mockedSet = jest.fn();
const mockedStart = jest.fn();

jest.mock('../../layout', () => ({
  Box: jest.fn((props) => {
    return (
      <div>
        <div>MotionBox</div>
        <div data-testid="box-props">{JSON.stringify(props)}</div>
      </div>
    );
  }),
}));

jest.mock('framer-motion', () => ({
  ...jest.requireActual<object>('framer-motion'),
  useAnimation: jest.fn(() => ({
    set: mockedSet,
    start: mockedStart,
  })),
}));

jest.mock('../useMotionProps', () => ({
  useMotionProps: jest.fn(() => ({
    variants: {
      enter: {
        transition: {},
      },
    },
  })),
}));

const TestWrapper = (props: ColorSurgeTypes) => {
  const ref = useRef({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    play: async (background: ColorSurgeBackground | undefined) => {},
  });

  const handleClick = useCallback(async () => ref.current.play('positive'), []);

  return (
    <>
      <ColorSurge {...props} ref={ref} />
      <button onClick={handleClick} type="button">
        set background
      </button>
    </>
  );
};

describe('ColorSurge', () => {
  beforeEach(jest.clearAllMocks);
  it('should render motion box', () => {
    render(<TestWrapper />);
    expect(screen.getByText('MotionBox')).toBeInTheDocument();
  });

  it('default background should be primary', () => {
    render(<TestWrapper />);
    expect(screen.getByTestId('box-props').innerHTML).toContain('"background":"primary"');
  });

  it('should use motion props', () => {
    render(<TestWrapper />);
    expect(useMotionProps as jest.Mock).toHaveBeenCalledWith({
      enterConfigs: [createMotionConfig('fadeIn30', 'fast1')],
      exitConfigs: [createMotionConfig('fadeOut30', 'slow4', { delay: 200 })],
      animate: {
        set: expect.any(Function) as unknown,
        start: expect.any(Function) as unknown,
      },
    });
  });

  it('should set controls on mount if disableAnimateOnMount is false', () => {
    render(<TestWrapper disableAnimateOnMount={false} />);
    expect(mockedSet).toHaveBeenCalledWith('enter');
    expect(mockedStart).toHaveBeenCalledWith('exit');
  });

  it('should not set controls on mount if disableAnimateOnMount is true', () => {
    render(<TestWrapper disableAnimateOnMount />);
    expect(mockedSet).not.toHaveBeenCalledWith('enter');
    expect(mockedStart).not.toHaveBeenCalledWith('exit');
  });

  it('able to set background', async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByText('set background'));

    await waitFor(() =>
      expect(screen.getByTestId('box-props').innerHTML).toContain('"background":"positive"'),
    );
  });
});

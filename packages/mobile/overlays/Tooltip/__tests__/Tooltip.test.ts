import { renderHook } from '@testing-library/react-hooks';

import { useDimensions } from '../../../hooks/useDimensions';
import { TooltipPlacement, UseTooltipPositionParams } from '../TooltipProps';
import { useTooltipPosition } from '../useTooltipPosition';

import { basicCenterSubject } from './UseTooltipPositionTestData';

jest.mock('../../../hooks/useDimensions');
const mockUseDimensions = (mocks: ReturnType<typeof useDimensions>) => {
  (useDimensions as jest.Mock).mockReturnValue(mocks);
};

const mockPlatformAndroid = () => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => {
    const Platform = jest.requireActual<Record<string, unknown>>(
      'react-native/Libraries/Utilities/Platform',
    );
    Platform.OS = 'android';
    return Platform;
  });
};

const createHookInstance = (options: UseTooltipPositionParams) => {
  return renderHook(() => {
    return useTooltipPosition(options);
  });
};

describe('Tooltip', () => {
  describe('useTooltipPosition', () => {
    describe('when tooltip does not break screen boundaries', () => {
      it('positions itself above subject', () => {
        mockUseDimensions(basicCenterSubject.dimensions);
        mockPlatformAndroid();

        const placement: TooltipPlacement = 'top';
        const { subjectLayout, tooltipLayout, expectedTop } = basicCenterSubject;

        const { result } = createHookInstance({
          placement,
          subjectLayout,
          tooltipLayout,
        });

        expect(result.current.opacity).toEqual(expectedTop.opacity);
        expect(result.current.start).toEqual(expectedTop.start);
        expect(result.current.top).toEqual(expectedTop.top);
      });
      it.todo('positions itself below subject');
    });

    describe('when tooltip must adjust for horizontal screen boundaries', () => {
      describe('on left', () => {
        it.todo('should correct above subject');
        it.todo('should correct below subject');
      });

      describe('on right', () => {
        it.todo('should correct above subject');
        it.todo('should correct below subject');
      });
    });
  });
});

import { addMatchMediaListener, removeMatchMediaListener } from '../globalMatchMediaListener';

describe('global event listeners', () => {
  let listeners: (() => void)[];
  let queries: string[];

  beforeEach(() => {
    queries = [];
    listeners = [];
    // @ts-expect-error not mocking all window args
    jest.spyOn(window, 'matchMedia').mockImplementation((query: string) => {
      return {
        addEventListener: jest.fn((event: string, cb: () => void) => {
          queries.push(query);
          listeners.push(cb);
        }),
        removeEventListener: jest.fn((event: string, cb: () => void) => {
          listeners = listeners.filter((x) => x !== cb);
        }),
      };
    });
  });

  it('registers a single matchMedia watcher per query', () => {
    const testMqs = ['(max-width: 768px)', '(min-width: 769px)'];
    const mockEventHandler = jest.fn();

    testMqs.forEach((mq) => addMatchMediaListener(mq, mockEventHandler));

    expect(queries).toEqual(testMqs);
    expect(listeners).toHaveLength(2);

    testMqs.forEach((mq) => removeMatchMediaListener(mq, mockEventHandler));

    expect(listeners).toHaveLength(0);
  });

  it('groups callbacks by media query', () => {
    const testMqs = ['(max-width: 768px)', '(min-width: 769px)', '(max-width: 768px)'];
    const mockEventHandler = jest.fn();

    testMqs.forEach((mq) => addMatchMediaListener(mq, mockEventHandler));

    expect(queries).toHaveLength(2);

    testMqs.forEach((mq) => removeMatchMediaListener(mq, mockEventHandler));

    expect(listeners).toHaveLength(0);
  });

  it('unregisters event listeners', () => {
    const testMqs = ['(max-width: 768px)', '(min-width: 769px)'];
    const mockEventHandler = jest.fn();

    testMqs.forEach((mq) => addMatchMediaListener(mq, mockEventHandler));

    expect(queries).toEqual(testMqs);
    expect(listeners).toHaveLength(2);

    testMqs.forEach((mq) => removeMatchMediaListener(mq, mockEventHandler));

    expect(listeners).toHaveLength(0);
  });
});

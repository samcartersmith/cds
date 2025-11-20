import { logger } from '../logger';

describe('logger', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    delete process.env.VERBOSE_LOGS;
  });

  describe('log', () => {
    it('should always log messages to console', () => {
      logger.log('Test message');

      expect(consoleLogSpy).toHaveBeenCalledWith('Test message');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });

    it('should log multiple messages', () => {
      logger.log('Message 1');
      logger.log('Message 2');

      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'Message 1');
      expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'Message 2');
    });
  });

  describe('verbose', () => {
    it('should not log when VERBOSE_LOGS is not set', () => {
      logger.verbose('Verbose message');

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log when VERBOSE_LOGS is set to "1"', () => {
      process.env.VERBOSE_LOGS = '1';

      logger.verbose('Verbose message');

      expect(consoleLogSpy).toHaveBeenCalledWith('Verbose message');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });

    it('should not log when VERBOSE_LOGS is set to other values', () => {
      process.env.VERBOSE_LOGS = 'true';

      logger.verbose('Verbose message');

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not log when VERBOSE_LOGS is set to "0"', () => {
      process.env.VERBOSE_LOGS = '0';

      logger.verbose('Verbose message');

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log multiple verbose messages when enabled', () => {
      process.env.VERBOSE_LOGS = '1';

      logger.verbose('Verbose 1');
      logger.verbose('Verbose 2');

      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'Verbose 1');
      expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'Verbose 2');
    });
  });

  describe('mixed logging', () => {
    it('should log normal messages but not verbose messages when VERBOSE_LOGS is not set', () => {
      logger.log('Normal message');
      logger.verbose('Verbose message');
      logger.log('Another normal message');

      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'Normal message');
      expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'Another normal message');
    });

    it('should log both normal and verbose messages when VERBOSE_LOGS is set', () => {
      process.env.VERBOSE_LOGS = '1';

      logger.log('Normal message');
      logger.verbose('Verbose message');
      logger.log('Another normal message');

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'Normal message');
      expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'Verbose message');
      expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'Another normal message');
    });
  });
});

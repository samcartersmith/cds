import { getCurrentDateString, getMonthStartISODate, getQuarterStartDate } from '../date-utils';

// Fixed reference year used across all tests.
// Using a non-leap year far from DST edge cases to keep results predictable.
const YEAR = 2026;

// Month names for readable test labels (0-indexed, matching Date.getMonth())
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

describe('date-utils', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getCurrentDateString', () => {
    it('returns the current date formatted as a locale date string', () => {
      jest.setSystemTime(new Date(YEAR, 2, 15)); // March 15, 2026
      const result = getCurrentDateString();
      expect(result).toContain('Mar');
      expect(result).toContain('15');
      expect(result).toContain(String(YEAR));
    });
  });

  describe('getQuarterStartDate', () => {
    // Q1: January, February, March → quarter start is January 1
    describe.each([
      [0, 'January'],
      [1, 'February'],
      [2, 'March'],
    ])('Q1 months (month index %i — %s)', (monthIndex) => {
      it(`returns January 1 as the quarter start date`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).toContain('Jan');
        expect(result).toContain('01');
        expect(result).toContain(String(YEAR));
      });

      it(`does not return a month other than January`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).not.toMatch(/\b(Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
      });
    });

    // Q2: April, May, June → quarter start is April 1
    describe.each([
      [3, 'April'],
      [4, 'May'],
      [5, 'June'],
    ])('Q2 months (month index %i — %s)', (monthIndex) => {
      it(`returns April 1 as the quarter start date`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).toContain('Apr');
        expect(result).toContain('01');
        expect(result).toContain(String(YEAR));
      });

      it(`does not return a month other than April`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).not.toMatch(/\b(Jan|Feb|Mar|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
      });
    });

    // Q3: July, August, September → quarter start is July 1
    describe.each([
      [6, 'July'],
      [7, 'August'],
      [8, 'September'],
    ])('Q3 months (month index %i — %s)', (monthIndex) => {
      it(`returns July 1 as the quarter start date`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).toContain('Jul');
        expect(result).toContain('01');
        expect(result).toContain(String(YEAR));
      });

      it(`does not return a month other than July`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).not.toMatch(/\b(Jan|Feb|Mar|Apr|May|Jun|Aug|Sep|Oct|Nov|Dec)\b/);
      });
    });

    // Q4: October, November, December → quarter start is October 1
    describe.each([
      [9, 'October'],
      [10, 'November'],
      [11, 'December'],
    ])('Q4 months (month index %i — %s)', (monthIndex) => {
      it(`returns October 1 as the quarter start date`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).toContain('Oct');
        expect(result).toContain('01');
        expect(result).toContain(String(YEAR));
      });

      it(`does not return a month other than October`, () => {
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        const result = getQuarterStartDate();
        expect(result).not.toMatch(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Nov|Dec)\b/);
      });
    });

    it('returns the first day (01) of the quarter start month regardless of the current day', () => {
      // Spot-check: last day of Q2 should still give April 1
      jest.setSystemTime(new Date(YEAR, 5, 30)); // June 30
      const result = getQuarterStartDate();
      expect(result).toContain('Apr');
      expect(result).toContain('01');
    });

    it('carries the correct year when the quarter start is Jan 1', () => {
      jest.setSystemTime(new Date(YEAR, 2, 31)); // March 31 — last day of Q1
      const result = getQuarterStartDate();
      expect(result).toContain(String(YEAR));
    });
  });

  describe('getMonthStartISODate', () => {
    // Expected ISO date strings (YYYY-MM-01) for each month of 2026
    const monthCases: [number, string, string][] = [
      [0, 'January', `${YEAR}-01-01`],
      [1, 'February', `${YEAR}-02-01`],
      [2, 'March', `${YEAR}-03-01`],
      [3, 'April', `${YEAR}-04-01`],
      [4, 'May', `${YEAR}-05-01`],
      [5, 'June', `${YEAR}-06-01`],
      [6, 'July', `${YEAR}-07-01`],
      [7, 'August', `${YEAR}-08-01`],
      [8, 'September', `${YEAR}-09-01`],
      [9, 'October', `${YEAR}-10-01`],
      [10, 'November', `${YEAR}-11-01`],
      [11, 'December', `${YEAR}-12-01`],
    ];

    it.each(monthCases)(
      'returns %s-%s-01 for a day in %s (month index %i)',
      (monthIndex, _monthName, expected) => {
        // Test from the middle of the month to avoid any edge cases near month boundaries
        jest.setSystemTime(new Date(YEAR, monthIndex, 15));
        expect(getMonthStartISODate()).toBe(expected);
      },
    );

    it.each(monthCases)(
      'returns the same result regardless of which day in %s we are on (month index %i)',
      (monthIndex, _monthName, expected) => {
        // Verify the first, middle, and last days of the month all give the same result
        const daysToCheck = [1, 15, 28];
        for (const day of daysToCheck) {
          jest.setSystemTime(new Date(YEAR, monthIndex, day));
          expect(getMonthStartISODate()).toBe(expected);
        }
      },
    );

    it('returns a string in YYYY-MM-DD format', () => {
      jest.setSystemTime(new Date(YEAR, 6, 4)); // July 4
      const result = getMonthStartISODate();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('result is suitable for lexicographic date comparison with row.week values', () => {
      // The `week` field from Figma API uses YYYY-MM-DD format;
      // confirm the month start can be compared directly with >= / <=.
      jest.setSystemTime(new Date(YEAR, 2, 16)); // March 16
      const monthStart = getMonthStartISODate(); // "2026-03-01"

      const weekInMarch = '2026-03-08';
      const weekInFeb = '2026-02-22';

      expect(weekInMarch >= monthStart).toBe(true);
      expect(weekInFeb >= monthStart).toBe(false);
    });
  });

  describe('getQuarterStartDate and getMonthStartISODate boundary alignment', () => {
    it('quarter start month matches the expected month prefix in getMonthStartISODate for Q1', () => {
      jest.setSystemTime(new Date(YEAR, 0, 15)); // January
      expect(getQuarterStartDate()).toContain('Jan');
      expect(getMonthStartISODate()).toContain('-01-01');
    });

    it('quarter start month matches the expected month prefix in getMonthStartISODate for Q2', () => {
      jest.setSystemTime(new Date(YEAR, 3, 15)); // April
      expect(getQuarterStartDate()).toContain('Apr');
      expect(getMonthStartISODate()).toContain('-04-01');
    });

    it('quarter start month matches the expected month prefix in getMonthStartISODate for Q3', () => {
      jest.setSystemTime(new Date(YEAR, 6, 15)); // July
      expect(getQuarterStartDate()).toContain('Jul');
      expect(getMonthStartISODate()).toContain('-07-01');
    });

    it('quarter start month matches the expected month prefix in getMonthStartISODate for Q4', () => {
      jest.setSystemTime(new Date(YEAR, 9, 15)); // October
      expect(getQuarterStartDate()).toContain('Oct');
      expect(getMonthStartISODate()).toContain('-10-01');
    });
  });
});

/**
 * Date utility functions for the Figma metrics collection pipeline.
 *
 * All three helpers return strings accepted by the Figma Analytics API's
 * `start_date` query parameter, or ISO 8601 date strings used for local
 * row filtering.  They are kept pure (no side effects) so they can be
 * unit-tested by mocking the system clock via jest.useFakeTimers().
 */

/**
 * Get the current date as a locale date string for the Figma API.
 * The Figma API automatically rounds the value back to the start of the
 * week (Sunday) from the given start_date.
 */
export function getCurrentDateString(): string {
  return new Date().toDateString();
}

/**
 * Get the start date of the current quarter as a locale date string for
 * the Figma API.  Figma will further round this down to the nearest
 * preceding Sunday.
 *
 * Quarter boundaries:
 *   Q1 → Jan 1   Q2 → Apr 1   Q3 → Jul 1   Q4 → Oct 1
 */
export function getQuarterStartDate(): string {
  const now = new Date();
  const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
  return new Date(now.getFullYear(), quarterStartMonth, 1).toDateString();
}

/**
 * Get the first day of the current month in ISO 8601 format (YYYY-MM-DD).
 * Used to filter QTD rows down to only those whose `week` field falls
 * within the current month.
 */
export function getMonthStartISODate(): string {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstOfMonth.toISOString().split('T')[0];
}

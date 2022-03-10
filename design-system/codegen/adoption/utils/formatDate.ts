export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions | undefined = {}) {
  return date.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...opts,
  });
}

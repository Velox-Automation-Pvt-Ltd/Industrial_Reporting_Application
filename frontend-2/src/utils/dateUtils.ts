/**
 * Formats a Date object into "YYYY-MM-DDTHH:mm:ss"
 */
const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

/**
 * Returns today's date at 00:00:00 in "YYYY-MM-DDTHH:mm:ss" format
 */
export const getTodayStartDate = (): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return formatDateTime(today);
};

/**
 * Returns tomorrow's date at 00:00:00 in "YYYY-MM-DDTHH:mm:ss" format
 */
export const getTomorrowStartDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return formatDateTime(tomorrow);
};

export const formatToISODateTime = (dateString: string): string => {
  const [day, month, year] = dateString.split('-').map(Number);

  // Get current time components
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  const finalDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));

  return finalDate.toISOString();
};

import { todaysDate, tomorrowsDate } from 'src/constant/constants';

export const getScheduleDate = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  return currentHour < 16 ? todaysDate : tomorrowsDate;
};

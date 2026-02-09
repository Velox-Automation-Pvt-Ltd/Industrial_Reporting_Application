import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const DisablePastDates = (current: any, disableDay?: number) => {
  return (
    current &&
    current <
      dayjs()
        .subtract(disableDay || 3, 'day')
        .startOf('day')
  );
};

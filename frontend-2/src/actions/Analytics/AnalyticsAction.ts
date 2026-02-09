import analyticsService from 'src/services/analytics.service';

export const getScheduleAnalytics = async (startDate: string | null | Date) => {
  const res = await analyticsService.getScheduleAnalytics(startDate);
  return res?.data?.data;
};

export const getMonthlySummary = async (
  startDate: string | null | Date,
  endDate: string | null | Date,
) => {
  const res = await analyticsService.getMonthlySummary(startDate, endDate);
  return res?.data?.data;
};

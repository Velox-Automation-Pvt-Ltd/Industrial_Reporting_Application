import { http } from 'src/api/apiClient';

class AnalyticsService {
  getScheduleAnalytics(startDate: string | null | Date) {
    return http.get(`analytics/schedules?startDate=${startDate}`);
  }

  getMonthlySummary(startDate: string | null | Date, endDate: string | null | Date) {
    return http.get(`analytics/monthly-summary?startDate=${startDate}&endDate=${endDate}`);
  }
}

export default new AnalyticsService();

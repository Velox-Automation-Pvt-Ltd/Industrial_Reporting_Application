import { http } from '@/api/apiClient';
// import { Dashboard } from '@/types/dashboard';

class DashboardService {
  getDashboards() {
    return http.get(
      'tenant/dashboards?pageSize=100&page=0&sortProperty=createdTime&sortOrder=DESC',
    );
  }
  // getDashboardById(id: string) {
  //   return http.get(`dashboard/${id}`);
  // }
  // createDashboard(dashboard: Dashboard) {
  //   return http.post("dashboard", dashboard);
  // }
  // updateDashboard(id: string, dashboard: Dashboard) {
  //   return http.put(`dashboard/${id}`, dashboard);
  // }
  // deleteDashboard(id: string) {
  //   return http.delete(`dashboard/${id}`);
  // }
  // getDashboardWidgets(id: string) {
  //   return http.get(`dashboard/${id}/widgets`);
  // }
}

export default new DashboardService();

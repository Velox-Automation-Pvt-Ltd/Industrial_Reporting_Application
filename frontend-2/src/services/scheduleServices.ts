import { http } from 'src/api/apiClient';

class scheduleServices {
  getMasterData() {
    return http.get('master');
  }
  getLocations() {
    return http.get('master/locations');
  }
  getWorkOptions() {
    return http.get('master/work-options');
  }
  createSchedule(body: any) {
    return http.post('schedule', body);
  }
  getMySchedules(page: number, pageSize: number) {
    return http.get(`/schedule/own?page=${page}&pageSize=${pageSize}`);
  }
  getScheduleByGroupId(id: number) {
    return http.get(`schedule/group/${id}/today`);
  }
  getScheduleByGroupAndDate(groupId: number, startDate: string, page: number, pageSize: number) {
    return http.get(
      `schedule/group?groupId=${groupId}&startDate=${startDate}&page=${page}&size=${pageSize}`,
    );
  }

  updateSchedule(scheduleId: number, updatedData: any) {
    return http.put(`schedule/${scheduleId}`, updatedData);
  }

  getAllSchedulesList(startDate: string | null | Date, page: number, pageSize: number) {
    return http.get(`schedule/all?page=${page}&size=${pageSize}&startDate=${startDate}`);
  }

  getSchedulesByAllGroups() {
    return http.get('schedule/team-schedule');
  }

  getAllTeamSchedule(startDate: string | null | Date) {
    return http.get(`schedule/team-schedule?startDate=${startDate}`);
  }

  getScheduleByProject(projectId: number, workId: number, page: number, pageSize: number) {
    return http.get(
      `schedule/by-project?projectId=${projectId}&workId=${workId}&page=${page}&size=${pageSize}`,
    );
  }

  getScheduleByProjectSummary(projectId: number, workId: number) {
    return http.get(
      `schedule/project-schedule-summary-total?projectId=${projectId}&workId=${workId}`,
    );
  }
}

export default new scheduleServices();

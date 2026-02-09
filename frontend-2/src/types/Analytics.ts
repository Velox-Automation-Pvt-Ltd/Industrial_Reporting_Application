export type Counts = {
  office: number;
  site: number;
  leave: number;
};

export type UserSummary = {
  userId: number | null;
  empCode: string | null;
  username: string | null;
  groupName: string | null;
};

type Category = {
  count: number;
  users: UserSummary[] | null;
};

export interface ScheduleAnalyticsType {
  totalSchedules: number;
  totalEmployees: number;
  atOffice: Category;
  atSite: Category;
  atSiteAndOffice: Category;
  onLeave: Category;
  pendingSchedule: Category;
  pendingApproval: Category;
}

export type EmployeeAttendance = {
  employeeName: string;
  role?: string;
  siteDays: number;
  sitePercentage: number;
  officeDays: number;
  officePercentage: number;
  holidayAndLeaveDays: number;
  holidayAndLeavePercentage: number;
};

export type EmployeeAttendanceType = {
  members: EmployeeAttendance[];
  grandTotal: EmployeeAttendance;
  averagePerHead: EmployeeAttendance;
};

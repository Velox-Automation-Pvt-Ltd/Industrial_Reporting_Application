import { UserType } from './auth/auth';

export interface locationsType {
  locationId: number;
  locationName: string;
}

export interface projectsType {
  projectId: number;
  customerName: string;
  projectNo: number;
  projectName?: string;
  customerCode?: string;
  oafNo?: string;
}

export interface amcOptionsType {
  amcOrderId: number;
  customerName: string;
  amcPoNo: string;
  totalDays?: number;
  recurringMonth?: number;
  startDate?: string;
}

export interface serviceOrdersType {
  serviceId: number;
  customerName: string;
  servicePoNumber: string;
}

export interface masterDataType {
  locations: locationsType[];
  projects: projectsType[];
  amcOrders: amcOptionsType[];
  serviceOrders: serviceOrdersType[];
}

interface Role {
  roleId: number;
  roleName: string;
}

interface Group {
  groupId: number;
  groupName: string;
}

interface User {
  userId: number;
  username: string;
  email: string;
  role: Role;
  empCode: string;
  group: Group;
}

interface Work {
  workId: number;
  workName: string;
}

interface AmcOrderType {
  amcOrderId: number;
  customerName: string;
  amcPoNo: string;
}

interface Location {
  locationId: number;
  locationName: string;
}

export type statusType = 'SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Schedule {
  scheduleId: number;
  scheduleDate: string;
  status?: statusType;
  description: string;
  isChargeable: boolean;
  posted: boolean;
  user: User;
  work: Work | null;
  project: projectsType | null;
  serviceOrder: serviceOrdersType | null;
  amcOrder: AmcOrderType | null;
  location: Location;
  approvedBy: string | number | null;
  createdBy: string | number | null;
  updatedBy: string | number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ScheduleApiResponseType {
  data: Schedule;
}

export type ScheduleItemForTable = {
  scheduleId: number;
  scheduleDate: string; // e.g. '26-08-2025' — could be changed to Date if parsed
  employeeName: string;
  employeeId: string;
  groupNo: number;
  projectId: string; // "-" means no project
  locationId: string; // e.g. "Leave", could be enum
  workId: string; // empty string = not assigned
  workType: string;
  category: boolean;
  description: string;
  status: string; // add other statuses as needed
  isChargeable: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
};

export interface UserScheduleInTeam {
  userId: number;
  username: string;
  email: string;
  schedule: Schedule | null;
}

export interface GroupByScheduleType {
  groupId: number;
  groupName: string;
  groupLeaderId: number;
  groupLeaderName: string;
  users: UserScheduleInTeam[];
  // schedules?: Schedule[];
}

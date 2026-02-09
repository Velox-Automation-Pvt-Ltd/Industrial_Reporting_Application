export enum UserRole {
  ENGINEER = 'ENGINEER',
  TEAMLEAD = 'TEAMLEAD',
  COORDINATOR = 'COORDINATOR',
  ADMIN = 'ADMIN',
  MANAGEMENT = 'MANAGEMENT',
  SYSTEM = 'SYSTEM',
}

export enum LocationOption {
  SITE = 'Site',
  OFFICE = 'Office',
  SITE_OFFICE = 'Site + Office',
  WFH = 'WFH',
  LEAVE = 'Leave',
}

export type WorkLocation = 'Site' | 'Office' | 'Site + Office' | 'WFH' | 'Leave';

export type WorkOption = {
  workId: number;
  workName: string;
};

export enum WorkCategory {
  CHARGEABLE = 'chargeable',
  NON_CHARGEABLE = 'non_chargeable',
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: UserRole | string;
  group_no: number;
  is_team_leader: boolean;
  employeeId: string | number;
}

export interface ScheduleRequestType {
  date?: string | any;
  scheduleDate: string | any;
  employeeName?: string;
  employeeId?: string | number;
  groupNo?: string | number;
  projectId: string;
  serviceOrderId?: number;
  amcOrderId?: number;
  location?: string;
  locationId: number;
  workId: number;
  work?: string;
  workType?: String;
  category?: string;
  isTeamLeader?: boolean;
  description?: string;
  status?: 'SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
  isChargeable?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  projectName: string;
  client: string;
}

export type DataColumn = {
  id: string;
  header: string;
  accessorKey: string;
  sortable?: boolean;
  cell?: (info: any) => React.ReactNode;
  getValue?: (row: any) => string | number;
};
export type SortingState = {
  id: string;
  desc: boolean;
} | null;

export type FilterValue = {
  id: string;
  value: string;
};

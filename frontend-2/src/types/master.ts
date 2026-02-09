export type ProjectMasterStatusType = 'NOT_STARTED' | 'IN_PROCESS' | 'COMPLETED';
export enum ProjectMasterStatusEnum {
  'NOT_STARTED',
  'IN_PROCESS',
  'COMPLETED',
  'OVERDUE',
}

export type ProjectStatus = 'NOT_STARTED' | 'IN_PROCESS' | 'COMPLETED' | 'OVERDUE';

export interface ProjectMasterType {
  projectId: number;
  projectNo: number;
  projectName: string;
  customerName: string;
  customerCode: string;
  oafNo?: string;
  commissioningDays: number;
  commissioningDaysRemaining: number;
  commissioningStatus: string | ProjectStatus;
  swDevDays: number;
  swDevDaysRemaining: number;
  swDevStatus: string | ProjectStatus;
  completionStatus: string | ProjectStatus;
}

export interface Service {
  serviceId: number;
  customerName: string;
  servicePoNumber: string;
  serviceDays: number | null;
  serviceRemainingDays: number | null;
  startDate: string | null;
  endDate: string | null;
}

export interface AmcOrder {
  amcOrderId: number;
  customerName: string;
  amcPoNo: string;
  totalDays: number | null;
  totalDaysRemaining?: number | null;
  recurringMonth: number | null;
  startDate: string | null;
}

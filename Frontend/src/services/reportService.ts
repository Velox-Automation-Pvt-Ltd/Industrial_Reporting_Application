import api from './api';

export interface Report {
  id: number;
  name: string;
  description: string;
  databaseConnectionId: number;
  databaseConnectionName: string;
  tableName: string;
  sqlQuery: string;
  type: string;
  refreshInterval: number;
  isActive: boolean;
  displayOrder: number;
  columns: ReportColumn[];
}

export interface ReportColumn {
  id: number;
  columnName: string;
  displayName: string;
  isVisible: boolean;
  displayOrder: number;
  decimalPlaces: number;
  dataType: string;
  width: number;
}

export interface CreateReportRequest {
  name: string;
  description: string;
  databaseConnectionId: number;
  tableName: string;
  sqlQuery: string;
  type: string;
  refreshInterval: number;
}

export interface UpdateReportRequest {
  name: string;
  description: string;
  sqlQuery: string;
  refreshInterval: number;
  isActive: boolean;
  displayOrder: number;
}

class ReportService {
  async getAllReports(): Promise<Report[]> {
    const response = await api.get<Report[]>('/reports');
    return response.data;
  }

  async getReport(id: number): Promise<Report> {
    const response = await api.get<Report>(`/reports/${id}`);
    return response.data;
  }

  async createReport(data: CreateReportRequest): Promise<Report> {
    const response = await api.post<Report>('/reports', data);
    return response.data;
  }

  async updateReport(id: number, data: UpdateReportRequest): Promise<void> {
    await api.put(`/reports/${id}`, data);
  }

  async deleteReport(id: number): Promise<void> {
    await api.delete(`/reports/${id}`);
  }
}

export default new ReportService();

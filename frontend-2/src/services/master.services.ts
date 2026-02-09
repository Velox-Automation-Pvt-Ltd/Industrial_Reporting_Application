import { http } from 'src/api/apiClient';
import { paginationType } from 'src/types/app';
import { AmcOrder, ProjectMasterType, Service } from 'src/types/master';

class MasterService {
  getProjects(page: number, pageSize: number, searchQuery: string) {
    return http.get(`master/projects?page=${page}&pageSize=${pageSize}&keyword=${searchQuery}`);
  }
  createProject(data: ProjectMasterType) {
    return http.post(`master/projects`, data);
  }
  updateProject(projectId: number | undefined, data: ProjectMasterType) {
    return http.patch(`master/projects/${projectId}`, data);
  }

  getServices(page: number, pageSize: number, searchQuery: string) {
    return http.get(`master/services?page=${page}&pageSize=${pageSize}&keyword=${searchQuery}`);
  }
  createService(data: Service) {
    return http.post(`master/services`, data);
  }
  updateService(projectId: number | undefined, data: Service) {
    return http.patch(`master/services/${projectId}`, data);
  }

  getAmcServices(page: number, pageSize: number, searchQuery: string) {
    return http.get(`master/amc?page=${page}&pageSize=${pageSize}&keyword=${searchQuery}`);
  }
  createAmcService(data: AmcOrder) {
    return http.post(`master/amc`, data);
  }
  updateAmcService(projectId: number | undefined, data: AmcOrder) {
    return http.patch(`master/amc/${projectId}`, data);
  }
}

export default new MasterService();

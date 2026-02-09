import masterServices from 'src/services/master.services';
import { AmcOrder, ProjectMasterType, Service } from 'src/types/master';

export const fetchProjectMasterData = async (
  page: number,
  pageSize: number,
  searchQuery: string,
) => {
  const res = await masterServices.getProjects(page, pageSize, searchQuery);
  return res.data.data;
};

export const createProject = async (data: ProjectMasterType) => {
  const res = await masterServices.createProject(data);
  return res.data.data;
};

export const updateProject = async (projectId: number | undefined, data: ProjectMasterType) => {
  const res = await masterServices.updateProject(projectId, data);
  return res.data.data;
};

export const fetchServiceMasterData = async (
  page: number,
  pageSize: number,
  searchQuery: string,
) => {
  const res = await masterServices.getServices(page, pageSize, searchQuery);
  return res.data.data;
};

export const createService = async (data: Service) => {
  const res = await masterServices.createService(data);
  return res.data.data;
};

export const updateService = async (serviceId: number | undefined, data: Service) => {
  const res = await masterServices.updateService(serviceId, data);
  return res.data.data;
};

export const fetchAmcServiceMasterData = async (
  page: number,
  pageSize: number,
  searchQuery: string,
) => {
  const res = await masterServices.getAmcServices(page, pageSize, searchQuery);
  return res.data.data;
};

export const createAmcService = async (data: AmcOrder) => {
  const res = await masterServices.createAmcService(data);
  return res.data.data;
};

export const updateAmcService = async (amcOrderId: number | undefined, data: AmcOrder) => {
  const res = await masterServices.updateAmcService(amcOrderId, data);
  return res.data.data;
};

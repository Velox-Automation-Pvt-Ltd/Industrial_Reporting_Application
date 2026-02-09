import {
  createAmcService,
  createProject,
  createService,
  updateAmcService,
  updateProject,
  updateService,
} from 'src/actions/Master/MasterAction';
import { useGenericMutation } from 'src/hooks/useCustomMutation';
import { AmcOrder, ProjectMasterType, Service } from 'src/types/master';

export const useCreateProjectMaster = () =>
  useGenericMutation(createProject, 'createProject', {
    invalidateKeys: ['projects'],
    toastMessage: 'Project created successfully!',
  });

export const useUpdateProjectMaster = () =>
  useGenericMutation(
    ({ projectId, data }: { projectId: number | undefined; data: ProjectMasterType }) =>
      updateProject(projectId, data),
    'updateProject',
    {
      invalidateKeys: ['projects'],
      toastMessage: 'Project updated successfully!',
    },
  );

export const useCreateService = () =>
  useGenericMutation(createService, 'createSchedule', {
    invalidateKeys: ['services'],
    toastMessage: 'Service created successfully!',
  });

export const useUpdateServiceMaster = () =>
  useGenericMutation(
    ({ serviceId, data }: { serviceId: number | undefined; data: Service }) =>
      updateService(serviceId, data),
    'updateService',
    {
      invalidateKeys: ['services'],
      toastMessage: 'Service updated successfully!',
    },
  );

export const useCreateAmcService = () =>
  useGenericMutation(createAmcService, 'createAmcSchedule', {
    invalidateKeys: ['amc'],
    toastMessage: 'AMC Service created successfully!',
  });

export const useUpdateAmcServiceMaster = () =>
  useGenericMutation(
    ({ amcOrderId, data }: { amcOrderId: number | undefined; data: AmcOrder }) =>
      updateAmcService(amcOrderId, data),
    'updateAmcService',
    {
      invalidateKeys: ['amc'],
      toastMessage: 'AMC Service updated successfully!',
    },
  );

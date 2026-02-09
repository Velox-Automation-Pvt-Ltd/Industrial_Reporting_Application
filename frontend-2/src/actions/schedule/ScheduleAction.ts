import { useQuery } from '@tanstack/react-query';
import scheduleServices from 'src/services/scheduleServices';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import { ScheduleRequestType } from 'src/types';
// import { Schedule } from 'src/types';
import { Schedule, ScheduleApiResponseType } from 'src/types/data';
import { fetchData } from 'src/utils/fetchAPIData';
import { formatToISODateTime } from 'src/utils/formatToISODateTime';

export const fetchLoations = () => fetchData(scheduleServices.getLocations);

export const fetchWorkOptions = () => fetchData(scheduleServices.getWorkOptions);

export const fetchMasterData = () => fetchData(scheduleServices.getMasterData);

export const createSchedule = async (data: ScheduleRequestType) => {
  const body = {
    userId: data?.employeeId,
    groupId: data?.groupNo,
    locationId: data?.locationId,
    workId: data?.workId,
    scheduleDate: formatToISODateTime(data.scheduleDate),
    status: data?.isTeamLeader ? 'APPROVED' : 'PENDING',
    description: data?.description,
    isChargeable: data?.isChargeable,
    projectId: data?.projectId,
    serviceOrderId: data?.serviceOrderId,
    amcOrderId: data?.amcOrderId,
    posted: false,
    approvedBy: data?.isTeamLeader ? data?.employeeId : undefined,
  };

  const res = await scheduleServices.createSchedule(body);
  return res.data;
};

export const fetchMySchedules = async (page: number, pageSize: number) => {
  const res = await scheduleServices.getMySchedules(page, pageSize);
  return res.data.data;
};

export const fetchTodaysSchedule = async (groupId: number) => {
  const res = await scheduleServices.getScheduleByGroupId(groupId);
  return res.data;
};

export const fetchScheduleByGroupAndDate = async (groupId: number, date: string) => {
  const startDate = date;
  const page = 1;
  const pageSize = 100;

  const res = await scheduleServices.getScheduleByGroupAndDate(groupId, startDate, page, pageSize);
  return res.data.data;
};

export const ApprovedSchedule = async (scheduleId: number, userId: number) => {
  const data = {
    status: 'APPROVED',
    approvedBy: userId,
  };
  const res = await scheduleServices.updateSchedule(scheduleId, data);
  return res.data;
};

export const getScheduleByGroupForToday = () => {
  const userdata = useAppSelector((state: RootState) => state.auth.user);
  const groupId = userdata?.group_no;

  const { data } = useQuery<Schedule[]>({
    queryKey: ['todays', groupId],
    queryFn: () => fetchTodaysSchedule(groupId!),
    enabled: !!groupId,
  });

  return data;
};

export const updateSchedule = async (data: any) => {
  const body = {
    // scheduleId: data?.scheduleId,
    locationId: data?.locationId || null,
    workId: data?.workId || null,
    description: data?.description,
    isChargeable: data?.isChargeable,
    projectId: data?.projectId || null,
    serviceOrderId: data?.serviceOrderId || null,
    amcOrderId: data?.amcOrderId || null,
    // status: 'PENDING',
    // approvedBy: 1,
    posted: true,
  };
  const res = await scheduleServices.updateSchedule(data?.scheduleId, body);
  return res.data;
};

export const getScheduleByAllGroup = async () => {
  const res = await scheduleServices.getSchedulesByAllGroups();
  return res?.data?.data;
};

export const getAllSchedulesList = async (date: string, page: number, pageSize: number) => {
  const res = await scheduleServices.getAllSchedulesList(date, page, pageSize);
  return res?.data;
};

export const getAllTeamSchedule = async (date: string | null | Date) => {
  const startDate = date;
  const res = await scheduleServices.getAllTeamSchedule(startDate);
  return res?.data?.data;
};

export const getScheduleByProject = async (
  projectId: number,
  workId: number,
  page: number,
  pageSize: number,
) => {
  return scheduleServices
    .getScheduleByProject(projectId, workId, page, pageSize)
    .then((res) => res?.data?.data);
};

export const getScheduleByProjectSummary = async (projectId: number, workId: number) => {
  return scheduleServices
    .getScheduleByProjectSummary(projectId, workId)
    .then((res) => res?.data?.data);
};

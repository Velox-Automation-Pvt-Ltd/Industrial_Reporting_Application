import { useCallback, useMemo, useState } from 'react';
import { DataTable } from 'src/components/tables/DataTable';
import { DataColumn, ScheduleRequestType } from 'src/types';
import { Badge } from 'src/components/ui/badge';
import IconButton from 'src/components/Buttons/IconButton';
import Iconify from 'src/components/Buttons/Iconify';
import getRowColors from 'src/utils/getRowColors';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import ScheduleModal from 'src/components/modal/ScheduleModal';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { formatDate } from 'src/utils/dateFormatter';
import {
  fetchScheduleByGroupAndDate,
  fetchTodaysSchedule,
} from 'src/actions/schedule/ScheduleAction';
import { useQuery } from '@tanstack/react-query';
import {
  useApproveSchedule,
  useCreateSchedule,
  useUpadateSchedule,
} from 'src/api/mutations/schedule/scheduleMutation';
import toast from 'react-hot-toast';
import { Schedule } from 'src/types/data';
import { todaysDate } from 'src/constant/constants';
import { getTodayStartDate, getTomorrowStartDate } from 'src/utils/dateUtils';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar';
import { DatePicker, Space } from 'antd';
import { fetchAllUsersInGroup } from 'src/actions/Auth/authAction';
import { UserType } from 'src/types/auth/auth';
import { DisablePastDates } from 'src/utils/disableDatesUtil';

type scheduleFormData = {
  date: string | dayjs.Dayjs | null;
  scheduleDate: string | dayjs.Dayjs;
  locationId: number;
  projectId: string;
  serviceOrderId: number;
  amcOrderId: number;
  workId: number;
  workType?: String;
  isChargeable: boolean;
  description: string;
  userId?: number;
};

type ScheduleItem = {
  scheduleId: number;
  scheduleDate: string; // e.g. '26-08-2025' — could be changed to Date if parsed
  employeeName: string;
  employeeId: string;
  groupNo: number;
  projectId: string; // "-" means no project
  serviceOrderId: string;
  amcOrderId: string;
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

export default function TeamManagement() {
  const [visible, setVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState<'today' | 'tomorrow' | 'custom'>('today');
  // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const formatDateFn = (date: Dayjs | null) => {
    if (!date) return '';
    return format(date.toDate(), 'PPP');
  };

  const formatForBackend = (date: Dayjs | null) =>
    date ? date.format('YYYY-MM-DD') + 'T00:00:00' : null;

  const userdata = useAppSelector((state: RootState) => state?.auth?.user);
  const groupId = userdata?.group_no || 1;
  const userId = Number(userdata?.id);

  const customDate = formatForBackend(selectedDate);

  const date: string =
    dateFilter === 'today'
      ? getTodayStartDate()
      : dateFilter === 'tomorrow'
      ? getTomorrowStartDate()
      : dateFilter === 'custom'
      ? customDate ?? getTodayStartDate()
      : selectedDate
      ? selectedDate.toISOString()
      : getTodayStartDate();

  const {
    data: myGroupScheduleData,
    isLoading,
    refetch,
    isError,
  } = useQuery<any>({
    queryKey: ['todays', date],
    queryFn: () => fetchScheduleByGroupAndDate(groupId, date),
  });

  const { data: teamMembers } = useQuery<UserType[]>({
    queryKey: ['team-members', groupId],
    queryFn: () => fetchAllUsersInGroup(groupId),
  });

  const { mutate: updateScheduleCall } = useUpadateSchedule();
  const { mutate: approveScheduleCall } = useApproveSchedule();
  const { mutate: callCreateScheduleApi } = useCreateSchedule();

  const processedData = useMemo(() => {
    if (!myGroupScheduleData?.content) return [];

    let result = myGroupScheduleData?.content?.map((item: Schedule) => ({
      scheduleId: item?.scheduleId,
      scheduleDate: formatDate(item?.scheduleDate),
      employeeName: item?.user?.username || '',
      employeeId: item?.user?.empCode || '',
      groupNo: item?.user?.group?.groupId,
      projectId: item?.project?.projectNo?.toString() || '-',
      project: item?.project?.projectId,
      serviceOrderId: item?.serviceOrder?.serviceId,
      amcOrderId: item?.amcOrder?.amcOrderId,
      locationId: item?.location?.locationName || '',
      location: item?.location?.locationId || '',
      work: item?.work?.workId || '',
      workId: item?.work?.workName || '-',
      category: item?.isChargeable ? 'chargeable' : 'non-chargeable',
      description: item?.description || '-',
      status: item?.status || 'pending',
      supportFor: item?.project ? 'project' : 'service',
      clientPurpose: item?.project ? 'project' : 'sales',
      isChargeable: item?.isChargeable,
      createdAt: item?.createdAt || new Date().toISOString(),
      updatedAt: item?.updatedAt || new Date().toISOString(),
    }));

    return result;
  }, [myGroupScheduleData]);

  const handlePaginationChange = (pageNumber: number, pageSizeNumber: number) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
  };

  const openDeleteDialog = (data: any) => {
    // setIsDeleteModalOpen(true);
  };

  const openEditDialog = (record: any) => {
    setEditRecord(record);
    setVisible(true);
  };

  const handleApproval = useCallback(
    (record: any) => {
      approveScheduleCall(
        { scheduleId: record.scheduleId, userId },
        {
          onSuccess: () => {
            toast.success(`Approved schedule for ${record?.employeeName || ''}`);
            refetch();
          },
          onError: () => toast.error('Failed to approve schedule'),
        },
      );
    },
    [approveScheduleCall, refetch, userId],
  );

  const handleApprovalForAll = useCallback(() => {
    if (!Array.isArray(myGroupScheduleData?.content)) return;

    const pending = myGroupScheduleData?.content?.filter((s: Schedule) => s.status === 'PENDING');
    if (pending.length === 0) {
      toast.error('No pending schedules to approve');
      return;
    }

    Promise.allSettled(
      pending.map((item: any) => approveScheduleCall({ scheduleId: item.scheduleId, userId })),
    )
      .then(() => {
        toast.success('Approved all pending schedules');
        refetch();
      })
      .catch(() => toast.error('Failed to approve some schedules'));
  }, [myGroupScheduleData, approveScheduleCall, refetch]);

  const columns: DataColumn[] = [
    {
      id: 'employeeName',
      header: 'Employee',
      accessorKey: 'employeeName',
      sortable: true,
    },
    {
      id: 'projectId',
      header: 'Project No.',
      accessorKey: 'projectId',
      sortable: true,
      // cell: (row) => row.project?.projectNo || '—',
    },
    {
      id: 'workId',
      header: 'Work',
      accessorKey: 'workId',
      sortable: false,
    },
    {
      id: 'locationId',
      header: 'Location',
      accessorKey: 'locationId',
      sortable: false,
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      sortable: true,
    },
    {
      id: 'isChargeable',
      header: 'Category',
      accessorKey: 'isChargeable',
      sortable: true,
      cell: (row) => {
        const status = row.isChargeable ? 'Chargeable' : 'Non-Chargeable';
        const colorMap = {
          Chargeable: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          'Non-Chargeable': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        };

        return (
          <Badge className={colorMap[status] || ''} variant="outline">
            {status}
          </Badge>
        );
      },
    },
    {
      id: 'status',
      header: 'Approval',
      accessorKey: 'status',
      sortable: true,
      cell: (row) => {
        const rawStatus = String(row.status ?? '').toUpperCase();
        const colorMap = {
          APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          PENDING: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        } as const;

        const statusKey = (rawStatus in colorMap ? rawStatus : 'PENDING') as keyof typeof colorMap;

        return (
          <Badge className={colorMap[statusKey] || ''} variant="outline">
            {statusKey.toLowerCase()}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'actions',
      cell: (row: any) => {
        return (
          <div className="flex items-center gap-2">
            <IconButton
              title="Approve Schedule"
              disabled={row.status == 'APPROVED'}
              onClick={(e) => {
                e.stopPropagation();
                handleApproval(row);
              }}
            >
              <Iconify icon="mdi:approval" className="w-5 h-5" />
            </IconButton>
            <IconButton
              title="Edit"
              onClick={(e) => {
                e.stopPropagation();
                openEditDialog(row);
              }}
            >
              <Iconify icon="mdi:square-edit-outline" className="w-5 h-5" />
            </IconButton>
            {/* <IconButton
              title="Delete Schedule"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteDialog(row);
              }}
            >
              <Iconify icon="mdi:delete" className="w-5 h-5" />
            </IconButton> */}
          </div>
        );
      },
    },
  ];

  const handleRefresh = () => {
    refetch();
    if (!isError) {
      toast.success('Schedule refresh⚡️');
    }
  };

  const handleUpdateSchedule = (data: scheduleFormData) => {
    updateScheduleCall(data);
    setVisible(false);
  };

  const handleAssignScheduleClick = () => {
    setAddModalVisible(true);
  };

  const handleAssignSchedule = (record: scheduleFormData) => {
    const newSchedule: ScheduleRequestType = {
      scheduleDate: record?.scheduleDate,
      locationId: record?.locationId,
      projectId: record?.projectId,
      serviceOrderId: record?.serviceOrderId,
      amcOrderId: record.amcOrderId,
      workId: record.workId,
      workType: record.workType,
      isChargeable: record.isChargeable,
      description: record.description,
      isTeamLeader: userdata?.is_team_leader,
      employeeName: userdata?.name || 'Sample User',
      groupNo: userdata?.group_no || '0',
      status: 'PENDING',
      category: '',
      employeeId: record?.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    callCreateScheduleApi(newSchedule);
    setAddModalVisible(false);
  };

  return (
    <div className="p-2 md:p-6 lg:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full rounded-xl">
        <div className="mt-3 sm:mt-0">
          <span className="px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm">
            {formatDateFn(selectedDate)}
          </span>
        </div>

        <div className="flex gap-2 md:gap-4 mt-3 sm:mt-0">
          {/* Today Button */}
          <button
            onClick={() => {
              setDateFilter('today');
              const today = new Date();
              setSelectedDate(dayjs(today));
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer bg-gray-50 ${
              dateFilter === 'today'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            📅 Today
          </button>

          {/* Tomorrow Button */}
          <button
            onClick={() => {
              setDateFilter('tomorrow');
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setSelectedDate(dayjs(tomorrow));
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all text-black duration-200 cursor-pointer bg-gray-50 ${
              dateFilter === 'tomorrow'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            ⏰ Tomorrow
          </button>

          <DatePicker
            onClick={() => {
              setDateFilter('custom');
            }}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            format={'DD-MM-YYYY'}
            disabledDate={(current) => DisablePastDates(current, 3)}
            placeholder="📆 Custom"
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer bg-gray-50 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'`}
            allowClear={false}
          />
        </div>
      </div>

      <br />

      <DataTable
        data={processedData}
        isLoading={isLoading}
        columns={columns}
        tableTitle="Team Management"
        tableDescription={`Manage your team's Schedule`}
        onRefreshClick={handleRefresh}
        getRowClassName={getRowColors}
        filterableColumns={['employeeName', 'locationId']}
        totalPages={myGroupScheduleData?.totalPages}
        totalElements={myGroupScheduleData?.totalElements}
        numberOfElements={myGroupScheduleData?.numberOfElements}
        currentPage={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        onApprovalClick={handleApprovalForAll}
        needApproval={true}
        needSearch={false}
        addBtnText="Assign Schedule"
        onAddClick={handleAssignScheduleClick}
      />

      <ScheduleModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAssignSchedule}
        // initialData={editRecord}
        mode={'create'}
        modalTitle="Assign Schedule"
        teamMembersData={teamMembers}
        assign={true}
      />

      <ScheduleModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleUpdateSchedule}
        initialData={editRecord}
        mode={'edit'}
      />

      {/* <DeleteModal
        onDeleteConfirm={handleDelete}
        isDeleteDialogOpen={isDeleteModalOpen}
        setIsDeleteDialogOpen={setIsDeleteModalOpen}
        modalTitle="Delete Schedule"
        modalDescription={`Are you sure you want to delete the Schedule ?`}
      /> */}
    </div>
  );
}

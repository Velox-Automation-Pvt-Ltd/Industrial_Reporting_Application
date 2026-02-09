import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'src/components/tables/DataTable';
import { DataColumn, SortingState, FilterValue, ScheduleRequestType } from 'src/types';
import { Badge } from 'src/components/ui/badge';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import toast from 'react-hot-toast';
import ScheduleModal from 'src/components/modal/ScheduleModal';
import dayjs from 'dayjs';
import { useCreateSchedule, useUpadateSchedule } from 'src/api/mutations/schedule/scheduleMutation';
import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from 'src/actions/schedule/ScheduleAction';
import { formatDate } from 'src/utils/dateFormatter';
import getRowColors from 'src/utils/getRowColors';
import IconButton from 'src/components/Buttons/IconButton';
import Iconify from 'src/components/Buttons/Iconify';

type scheduleFormData = {
  date: string | dayjs.Dayjs;
  scheduleDate: string | dayjs.Dayjs;
  locationId: number;
  projectId: string;
  serviceOrderId: number;
  amcOrderId: number;
  workId: number;
  workType?: String;
  isChargeable: boolean;
  description: string;
};

export default function MySchedule() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [pageSize, setPageSize] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>(null);
  const [filters, setFilters] = useState<FilterValue[]>([]);

  const { user } = useAppSelector((state: RootState) => state.auth);

  const { mutate: updateScheduleCall } = useUpadateSchedule();

  const {
    data: myScheduleData,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery<any>({
    queryKey: ['Myschedules', page, pageSize],
    queryFn: () => fetchMySchedules(page, pageSize),
  });

  const processedData = useMemo(() => {
    if (!myScheduleData?.content) return [];

    let result = myScheduleData.content.map((item: any) => ({
      scheduleId: item.scheduleId,
      scheduleDate: formatDate(item.scheduleDate),
      employeeName: item?.user?.username || '',
      employeeId: item?.user?.empCode || '',
      groupNo: item?.user?.group?.groupId?.toString() || '',
      projectId: item?.project?.projectNo?.toString() || '-',
      project: item?.project?.projectId,
      serviceOrderId: item?.serviceOrder?.serviceId,
      amcOrderId: item?.amcOrder?.amcOrderId,
      locationId: item?.location?.locationName || '',
      location: item?.location?.locationId || '',
      work: item?.work?.workId || '',
      workId: item?.work?.workName || '',
      workType: item?.work?.workName || '',
      category: item?.isChargeable ? 'chargeable' : 'non-chargeable',
      description: item?.description || '',
      status: item?.status?.toLowerCase() || 'pending',
      supportFor: item?.project ? 'project' : 'service',
      clientPurpose: item?.project ? 'project' : 'sales',
      isChargeable: item?.isChargeable,
      createdAt: item?.createdAt || new Date().toISOString(),
      updatedAt: item?.updatedAt || new Date().toISOString(),
    }));

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter((item: any) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(lowerTerm)),
      );
    }

    if (filters.length > 0) {
      result = result.filter((item: any) =>
        filters.every((filter) => {
          const value = item[filter.id];
          return String(value).toLowerCase().includes(filter.value.toLowerCase());
        }),
      );
    }

    if (sorting) {
      result = [...result].sort((a, b) => {
        const aValue = a[sorting.id];
        const bValue = b[sorting.id];

        if (aValue === bValue) return 0;

        const comparison = aValue > bValue ? 1 : -1;
        return sorting.desc ? -comparison : comparison;
      });
    }

    return result;
  }, [myScheduleData, searchTerm, filters, sorting]);

  const openEditDialog = (record: any) => {
    setEditRecord(record);
    setModalMode('edit');
    setEditModalVisible(true);
  };

  const columns: DataColumn[] = [
    {
      id: 'projectId',
      header: 'Project No.',
      accessorKey: 'projectId',
      sortable: true,
    },
    {
      id: 'scheduleDate',
      header: 'Schedule Date',
      accessorKey: 'scheduleDate',
      sortable: true,
      cell: (row) => row.scheduleDate,
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
      header: 'category',
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
              disabled={row?.status === 'approved'}
              title={row?.status === 'pending' ? 'Can Edit' : "Can't Edit it's Approved"}
              onClick={(e) => {
                e.stopPropagation();
                openEditDialog(row);
              }}
            >
              <Iconify
                icon={
                  row?.status === 'pending'
                    ? 'mdi:square-edit-outline'
                    : 'mdi:account-cancel-outline'
                }
                className="w-5 h-5"
              />
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

  const handleAddClick = () => {
    setModalMode('create');
    setEditRecord(null);
    setModalVisible(true);
  };

  const { mutate: callCreateScheduleApi } = useCreateSchedule();

  const handleCreateSchedule = (record: scheduleFormData) => {
    const newSchedule: ScheduleRequestType = {
      scheduleDate: record.scheduleDate,
      locationId: record?.locationId,
      projectId: record?.projectId,
      serviceOrderId: record?.serviceOrderId,
      amcOrderId: record.amcOrderId,
      workId: record.workId,
      workType: record.workType,
      isChargeable: record.isChargeable,
      description: record.description,
      employeeName: user?.name || 'Sample User',
      groupNo: user?.group_no || '0',
      isTeamLeader: user?.is_team_leader,
      status: 'PENDING',
      category: '',
      employeeId: user?.id?.toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    callCreateScheduleApi(newSchedule);
    setModalVisible(false);
  };

  const handleRefresh = () => {
    refetch();
    if (!isError) {
      toast.success('Schedule refresh⚡️');
    }
  };

  const handleUpdateSchedule = (data: scheduleFormData) => {
    updateScheduleCall(data);
    setEditModalVisible(false);
  };

  const handlePaginationChange = (pageNumber: number, pageSizeNumber: number) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
  };

  const handleSearchChange = useCallback(
    (search: string) => {
      if (search !== searchTerm) {
        setPage(1);
      }
      setSearchTerm(search);
    },
    [searchTerm],
  );

  const handleSortingChange = (sort: SortingState) => {
    setSorting(sort);
  };

  const handleFilterChange = (filter: FilterValue[]) => {
    setFilters(filter);
  };

  return (
    <div className="p-2 md:p-6 lg:p-4">
      <DataTable
        addBtnText="Add New Schedule"
        data={processedData}
        isLoading={isLoading}
        columns={columns}
        tableTitle="My Schedules"
        onAddClick={handleAddClick}
        onRefreshClick={handleRefresh}
        getRowClassName={getRowColors}
        filterableColumns={['locationId']}
        totalPages={myScheduleData?.totalPages}
        totalElements={myScheduleData?.totalElements}
        numberOfElements={processedData.length}
        currentPage={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        onSearchChange={handleSearchChange}
        onSortingChange={handleSortingChange}
        onFilterChange={handleFilterChange}
      />

      <ScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateSchedule}
        initialData={editRecord}
        mode={'create'}
      />

      <ScheduleModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleUpdateSchedule}
        initialData={editRecord}
        mode={'edit'}
      />
    </div>
  );
}

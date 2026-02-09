import React, { useState, useMemo } from 'react';
import { Table, Input, Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchMySchedules } from 'src/actions/schedule/ScheduleAction';
import type { ColumnsType } from 'antd/es/table';
import SearchBar from '../Search/SearchBar';
import IconButton from '../Buttons/IconButton';
import Iconify from '../Buttons/Iconify';
import { cn } from 'src/lib/utils';
import { RefreshCw } from 'lucide-react';
import { formatDate } from 'src/utils/dateFormatter';
import { Badge } from '../ui/badge';

const { Search } = Input;

interface ScheduleData {
  scheduleId: number;
  scheduleDate: string;
  status: string;
  description: string | null;
  isChargeable: boolean;
  user: {
    username: string;
    empCode: string;
  };
  work: {
    workName: string;
  } | null;
  project: {
    projectNo: number;
  } | null;
  location: {
    locationName: string;
  };
}

// Row styling function
const getRowColors = (row: ScheduleData): string => {
  const isLeave = row.location?.locationName?.toLowerCase() === 'leave';
  if (isLeave) {
    return 'bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all';
  }

  if (row.isChargeable === true) {
    return 'bg-green-100 text-green-800 hover:bg-green-200 transition-all';
  }

  if (row.isChargeable === false) {
    return 'bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all';
  }

  return '';
};

export type DataTableProps = {
  tableTitle?: string;
  addBtnText?: string;
  tableDescription?: string;
  data?: any[];
  onRowClick?: (row: any) => void;
  onAddClick?: () => void;
  onRefreshClick?: () => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSearchChange?: (searchTerm: string) => void;
  filterableColumns?: string[];
  isLoading?: boolean;
  actionColumnCenter?: boolean;
  getRowClassName?: (row: any) => string;
  totalPages?: number | 0;
  totalElements?: number | 0;
  numberOfElements?: number | 0;
};

const AntDesignTable = ({ onAddClick, addBtnText }: DataTableProps) => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [searchText, setSearchText] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['Myschedules', tableParams.pagination.current, tableParams.pagination.pageSize],
    queryFn: () =>
      fetchMySchedules(tableParams.pagination.current || 1, tableParams.pagination.pageSize || 10),
  });

  const dataSource: ScheduleData[] = useMemo(() => {
    const raw = data?.content || [];
    if (!searchText.trim()) return raw;

    const lowerSearch = searchText.toLowerCase();
    return raw.filter((item: ScheduleData) =>
      [
        item.user?.username,
        item.user?.empCode,
        item.description,
        item.location?.locationName,
        item.work?.workName,
        item.project?.projectNo?.toString(),
      ]
        .filter(Boolean)
        .some((field) => field?.toString().toLowerCase().includes(lowerSearch)),
    );
  }, [data, searchText]);

  const total = data?.totalElements || 0;

  const handleTableChange: TableProps<ScheduleData>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination: {
        current: pagination.current!,
        pageSize: pagination.pageSize!,
      },
    });
  };

  const columns: ColumnsType<ScheduleData> = [
    {
      title: 'Date',
      dataIndex: 'scheduleDate',
      render: (value: string) => formatDate(value),
      sorter: true,
    },
    {
      title: 'Project No',
      dataIndex: ['project', 'projectNo'],
      render: (value) => value ?? '-',
    },
    {
      title: 'Location',
      dataIndex: ['location', 'locationName'],
    },
    {
      title: 'Work Type',
      dataIndex: ['work', 'workName'],
      render: (value) => value ?? '-',
    },
    {
      title: 'Chargeable',
      dataIndex: 'isChargeable',
      render: (value: boolean) => (
        <div>
          {/* <span className="font-semibold">{value ? 'Chargeable' : 'Non-Chargeable'}</span> */}
          <Badge
            className={
              value
                ? 'bg-green-200 text-green-800 border-none text-center rounded-2xl'
                : 'bg-red-200 text-red-800  border-none text-center rounded-2xl'
            }
            variant="outline"
          >
            {value ? 'Chargeable' : 'Non-Chargeable'}
          </Badge>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: string) => (
        <div>
          <Badge
            className={
              value.toLowerCase() === 'pending'
                ? 'bg-red-200 text-red-800  border-none text-center rounded-2xl'
                : 'bg-green-200 text-green-800 border-none text-center rounded-2xl'
            }
            variant="outline"
          >
            {value}
          </Badge>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (value) => value ?? '-',
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {/* <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom: 16 }}>
        <Search
          placeholder="Search schedule data"
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          enterButton
        />
      </Space> */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          <div>
            <h3 className="text-xl font-semibold text-[#0D355C] mb-2">{'My Schedules'}</h3>
            <p className="text-gray-600">{'Manage your schedules'}</p>
          </div>
        </div>
        <div className="flex mt-4 sm:mt-0 items-center space-x-2">
          <SearchBar
            query={searchText}
            setQuery={setSearchText}
            onClear={() => setSearchText('')}
          />

          {/* {addBtnText && ( */}
          <IconButton className="p-4" onClick={onAddClick} title="Add ">
            <Iconify icon={'mdi:plus'} size={24} /> &nbsp;
            {<span className="text-sm">{addBtnText}</span>}
          </IconButton>
          {/* )} */}

          <IconButton className="p-4" onClick={() => {}} title="Add Widget">
            <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin text-gray-400')} />
          </IconButton>

          {/* {onRefreshClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefreshClick}
              className={cn("h-8 w-8 p-0")}
            >
              <RefreshCw
                className={cn("h-4 w-4", isLoading && "animate-spin")}
              />
              <span className="sr-only">Refresh</span>
            </Button>
          )} */}
        </div>
      </div>
      <div className="rounded-md border border-gray-400 mt-6">
        <Table<ScheduleData>
          columns={columns}
          rowKey={(record) => record.scheduleId.toString()}
          dataSource={dataSource}
          pagination={{
            current: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
            total: total,
            showSizeChanger: true,
          }}
          loading={isLoading}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
          rowClassName={(record) => getRowColors(record)}
          bordered
        />
      </div>
    </div>
  );
};

export default AntDesignTable;

import { useState } from 'react';
import { DataTable } from 'src/components/tables/DataTable';
import { DataColumn } from 'src/types';
import getRowColors, { getRowColorsForAttendence } from 'src/utils/getRowColors';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getTodayStartDate } from 'src/utils/dateUtils';
import { format } from 'date-fns';
import { DatePicker, DatePickerProps } from 'antd';
import { getMonthlySummary } from 'src/actions/Analytics/AnalyticsAction';
import { EmployeeAttendanceType } from 'src/types/Analytics';
import { AttendenceSummary } from 'src/components/Cards/AttendenceSummary';

export default function MonthlySummary() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(40);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const formatDateFn = (date: Dayjs | null) => {
    if (!date) return '';
    return format(date.toDate(), 'MMMM yyyy');
  };

  const date: string = selectedDate ? selectedDate.toISOString() : getTodayStartDate();

  const startDate = dayjs(date).startOf('month').format('YYYY-MM-DDTHH:mm:ss');
  const endDate = dayjs(date).endOf('month').format('YYYY-MM-DDTHH:mm:ss');

  const { data: summaryData = {} as EmployeeAttendanceType, isLoading } =
    useQuery<EmployeeAttendanceType>({
      queryKey: ['monthly-summary', date],
      queryFn: () => getMonthlySummary(startDate, endDate),
    });

  const membersData = summaryData.members || [];

  const columns: DataColumn[] = [
    {
      id: 'employeeName',
      header: 'Employee',
      accessorKey: 'employeeName',
      sortable: true,
    },
    {
      id: 'siteDays',
      header: 'Days at Site',
      accessorKey: 'siteDays',
      sortable: true,
      // cell: (row) => row.project?.projectNo || '—',
    },
    {
      id: 'sitePercentage',
      header: 'Site Days in %',
      accessorKey: 'sitePercentage',
      // cell: (row: EmployeeAttendanceType) => `${row?.sitePercentage} %` || '—',
      sortable: false,
    },
    {
      id: 'officeDays',
      header: 'Days in Office',
      accessorKey: 'officeDays',
      sortable: false,
    },
    {
      id: 'officePercentage',
      header: 'Office Days in %',
      accessorKey: 'officePercentage',
      // cell: (row: EmployeeAttendanceType) => `${row?.officePercentage} %` || '—',
      sortable: true,
    },
    {
      id: 'holidayAndLeaveDays',
      header: 'Holidays & Leave',
      accessorKey: 'holidayAndLeaveDays',
      sortable: false,
    },
    {
      id: 'holidayAndLeavePercentage',
      header: 'Holiday & Leave in %',
      accessorKey: 'holidayAndLeavePercentage',
      // cell: (row: EmployeeAttendanceType) => `${row?.holidayAndLeavePercentage} %` || '—',
      sortable: true,
    },
  ];

  const handleRefresh = () => {
    // refetch();
    // if (!isError) {
    // }
    toast.success('Schedule refresh⚡️');
  };

  const customFormat: DatePickerProps['format'] = (value) => `📅  ${value.format('MMMM YYYY')}`;

  return (
    <div className="p-2 md:p-6 lg:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full rounded-xl">
        <div className="mt-3 sm:mt-0">
          <span className="px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm">
            {/* {formatDateFn(selectedDate)} */}
            Employee Attendance Summary - {formatDateFn(selectedDate)}
          </span>
        </div>
        <div className="mt-6 sm:mt-3 sm:ml-4">
          <DatePicker
            onClick={() => {
              // setDateFilter('custom');
            }}
            picker="month"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            // format={'DD-MM-YYYY'}
            format={customFormat}
            placeholder="📆 Custom"
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer bg-gray-50 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'`}
            allowClear={false}
          />
        </div>
      </div>

      {/* <br /> */}

      <div className="mt-3">
        <DataTable
          data={membersData}
          isLoading={isLoading}
          columns={columns}
          tableTitle={'Overview and Summary of Team Members'}
          tableDescription={`Monthly summary of schedules for all team members.`}
          onRefreshClick={handleRefresh}
          getRowClassName={getRowColorsForAttendence}
          // totalPages={myGroupScheduleData?.totalPages}
          // totalElements={myGroupScheduleData?.totalElements}
          // numberOfElements={myGroupScheduleData?.numberOfElements}
          currentPage={page}
          pageSize={pageSize}
          // onPaginationChange={handlePaginationChange}
          // onApprovalClick={handleApprovalForAll}
        />
      </div>

      <div className="mt-1">
        {/* <AttendenceSummaryTable /> */}
        <AttendenceSummary data={summaryData} />
      </div>
    </div>
  );
}

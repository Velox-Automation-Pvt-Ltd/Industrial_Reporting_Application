import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import {
  Search,
  Calendar,
  MapPin,
  Briefcase,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  MoreHorizontal,
  Eye,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmployeeAttendance, EmployeeAttendanceType } from 'src/types/Analytics';
import { useQuery } from '@tanstack/react-query';
import { getMonthlySummary } from 'src/actions/Analytics/AnalyticsAction';
import { AttendenceSummary } from 'src/components/Cards/AttendenceSummary';
import { capitalizeFirstLetter } from 'src/utils/CapitalizeFirstLetter';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { format } from 'date-fns';
import { getTodayStartDate } from 'src/utils/dateUtils';
import { Input } from 'src/components/ui/input';
import { DatePicker, DatePickerProps } from 'antd';
import { DataColumn } from 'src/types';
import { getRowColorsForAttendence } from 'src/utils/getRowColors';
import toast from 'react-hot-toast';

type SortField = keyof EmployeeAttendance | null;
type SortDirection = 'asc' | 'desc' | null;

export default function EmployeeAttendenceSummary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const formatDateFn = (date: Dayjs | null) => {
    if (!date) return '';
    return format(date.toDate(), 'MMM yyyy');
  };

  const date: string = selectedDate ? selectedDate.toISOString() : getTodayStartDate();

  const startDate = dayjs(date).startOf('month').format('YYYY-MM-DDTHH:mm:ss');
  const endDate = dayjs(date).endOf('month').format('YYYY-MM-DDTHH:mm:ss');

  const { data: summaryData = {} as EmployeeAttendanceType, isLoading } =
    useQuery<EmployeeAttendanceType>({
      queryKey: ['monthly-summary2', startDate, endDate],
      queryFn: () => getMonthlySummary(startDate, endDate),
    });

  const membersData = summaryData.members || [];

  const filteredAndSortedSchedules = useMemo(() => {
    const filtered = membersData.filter((count: EmployeeAttendance) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === '' || count.employeeName.toLowerCase().includes(searchLower);

      return matchesSearch;
    });

    if (sortField && sortDirection) {
      filtered.sort((a: any, b: any) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'officeDays' || sortField === 'holidayAndLeaveDays') {
          aValue = new Date(aValue as string).getTime();
          bValue = new Date(bValue as string).getTime();
        }

        if (
          sortField === 'sitePercentage' ||
          sortField === 'officePercentage' ||
          sortField === 'holidayAndLeavePercentage'
        ) {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [summaryData, searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    // setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-3 w-3 ml-1" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-3 w-3 ml-1" />;
    return <ArrowUpDown className="h-3 w-3 ml-1" />;
  };

  const exportToCSV = () => {
    if (filteredAndSortedSchedules?.length === 0) {
      toast.error('No data available to export');
      return;
    }
    const headers = [
      'Employee Name',
      'Site Days',
      'Site Days in %',
      'Office Days',
      'Office Days in %',
      'Holidays & Leave',
      'Holidays & Leave in %',
    ];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedSchedules.map((count: EmployeeAttendance) =>
        [
          count.employeeName,
          count.siteDays,
          count.sitePercentage,
          count.officeDays,
          count.officePercentage,
          count.holidayAndLeaveDays,
          count.holidayAndLeavePercentage,
        ].join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Employee-Monthly-Attendance-for-${formatDateFn(selectedDate)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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

  const customFormat: DatePickerProps['format'] = (value) => `📅  ${value.format('MMMM YYYY')}`;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* header  */}

      {/* <div className="px-1">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0D355C] mb-2">
            Overview and Attendance Summary of Team Member : {formatDateFn(selectedDate)}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Monthly Attendance summary of schedules for all team members.
          </p>
        </div>
      </div> */}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl text-secondary font-semibold mb-1">
                Overview and Attendance Summary of Team Member : {formatDateFn(selectedDate)}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-secondary">
                Monthly Attendance summary of schedules for all team members.
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
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
                  className={`px-3 py-1.5 w-full text-sm font-medium rounded-md transition-all duration-200 cursor-pointer bg-gray-50 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'`}
                  allowClear={false}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="w-full sm:w-auto bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 ">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by Employee Name ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="pl-10 text-sm sm:text-base"
            />
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="sticky left-0 bg-gray-50 z-10 min-w-[150px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('employeeName')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Employee
                          {getSortIcon('employeeName')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[50px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('siteDays')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Site Days
                          {getSortIcon('siteDays')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('sitePercentage')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Site Days in %{getSortIcon('sitePercentage')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('officeDays')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Office Days
                          {getSortIcon('officeDays')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('officePercentage')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Office Days in %{getSortIcon('officePercentage')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[120px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('holidayAndLeaveDays')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Holiday And Leave Days
                          {getSortIcon('holidayAndLeaveDays')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('holidayAndLeavePercentage')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Holiday And Leave Days in %{getSortIcon('holidayAndLeavePercentage')}
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedSchedules.map((count: EmployeeAttendance, index: number) => (
                      <TableRow
                        key={index}
                        className={`hover:bg-gray-50 ${getRowColorsForAttendence?.(
                          count?.sitePercentage,
                        )} `}
                      >
                        <TableCell className="sticky left-0 z-10">
                          <div>
                            <div className="font-medium text-[#0D355C] text-sm">
                              {count.employeeName}
                            </div>
                            <div className="text-xs text-gray-600">
                              {capitalizeFirstLetter(count?.role)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{count.siteDays}</TableCell>
                        <TableCell className="font-medium text-sm">
                          {count.sitePercentage}
                        </TableCell>
                        <TableCell>{count.officeDays}</TableCell>
                        <TableCell
                          className="max-w-[200px] truncate text-sm"
                          title={'Offices Days in %'}
                        >
                          {count.officePercentage}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{count.holidayAndLeaveDays}</span>
                          </div>
                        </TableCell>
                        <TableCell>{count.holidayAndLeavePercentage}</TableCell>
                      </TableRow>
                    ))}
                    {!isLoading && filteredAndSortedSchedules?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No records found.
                        </TableCell>
                      </TableRow>
                    )}
                    {isLoading &&
                      Array.from({ length: membersData?.length || 20 }).map((_, index) => (
                        <TableRow key={`skeleton-${index}`} className="animate-pulse">
                          {columns.map((column) => (
                            <TableCell key={`skeleton-cell-${column.id}`}>
                              <div className="h-4 w-full rounded bg-gray-200"></div>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-3">
            {filteredAndSortedSchedules?.map((count: EmployeeAttendance, index: number) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-[#0D355C]">
                          {count.employeeName}
                        </h4>
                        <p className="text-sm text-gray-500">{capitalizeFirstLetter(count.role)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-gray-600">Site Days</span>
                        <span className="text-lg font-semibold text-[#0D355C]">
                          {count.siteDays}
                        </span>
                        <span className="text-sm text-gray-500">{count.sitePercentage}%</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-gray-600">Office Days</span>
                        <span className="text-lg font-semibold text-[#0D355C]">
                          {count.officeDays}
                        </span>
                        <span className="text-sm text-gray-500">{count.officePercentage}%</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-gray-600">Holidays & Leave</span>
                        <span className="text-lg font-semibold text-[#0D355C]">
                          {count.holidayAndLeaveDays}
                        </span>
                        <span className="text-sm text-gray-500">
                          {count.holidayAndLeavePercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {/* {renderPagination()} */}

          {/* <AttendenceSummaryTable /> */}
          {!isLoading && Object.keys(summaryData).length > 0 && (
            <AttendenceSummary data={summaryData} />
          )}
        </CardContent>
        <div className="p-2 px-4 bg-gray-50 border-t">
          <p className="text-xs text-red-700">
            Note: The attendance summary above reflects only the approved schedule's day count. Your
            Team Leader can approve schedules only for the past 3 days. For any schedules pending
            approval that are older than 3 days, please contact the Project Coordinator for approval
          </p>
        </div>
      </Card>
    </div>
  );
}

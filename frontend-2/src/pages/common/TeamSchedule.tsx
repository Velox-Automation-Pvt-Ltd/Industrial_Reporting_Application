import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  CalendarDays,
  MoreHorizontal,
  Eye,
  Users,
  User,
  MapPin,
  Home,
  Building2,
  Globe,
  Briefcase,
  ChevronDown,
  ClockArrowUp,
  CalendarX,
  CalendarArrowDown,
} from 'lucide-react';
import { Calendar, Clock, UserCheck, UserX } from 'lucide-react';
import userImage from 'src/assets/images/profile/user-5.jpg';
import { useQuery } from '@tanstack/react-query';
import { getAllTeamSchedule, getScheduleByAllGroup } from 'src/actions/schedule/ScheduleAction';
import { GroupByScheduleType, Schedule, statusType, UserScheduleInTeam } from 'src/types/data';
import { capitalizeFirstLetter } from 'src/utils/CapitalizeFirstLetter';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { formatDate } from 'src/utils/dateFormatter';
import { SummaryCardWithHoverList } from 'src/components/Cards/SummaryCardWithHoverList';
import { getScheduleAnalytics } from 'src/actions/Analytics/AnalyticsAction';
import { ScheduleAnalyticsType } from 'src/types/Analytics';

type WorkCategory = 'Chargeable' | 'Non-Chargeable';
type Status = 'Planned' | 'In Progress' | 'Completed' | 'Blocked' | 'Leave';

// Extended presence types for summary
type Presence = 'Office' | 'Site' | 'WFH' | 'Leave';

type TeamSchedule = {
  id: string;
  employeeName: string;
  employeeId: string;
  projectNumber: string;
  work: string;
  location: 'Office' | 'Site' | 'WFH' | 'Leave' | string;
  workCategory: WorkCategory;
  workDescription: string;
  status: Status;
  groupId: string;
  groupName: string;
  groupNo: number;
  groupLead: string;
  presence?: Presence;
};

// Helpers
function getStatusColor(status: statusType | undefined) {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-600 text-white';
    case 'PENDING':
      return 'bg-amber-500 text-white';
    case 'SUBMITTED':
      return 'bg-gray-500 text-white';
    case 'REJECTED':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getLocationIcon(location: string) {
  const common = 'h-4 w-4 text-gray-500';
  const l = location.toLowerCase();
  if (l === 'wfh') return <Home className={common} aria-hidden="true" />;
  if (l === 'office') return <Building2 className={common} aria-hidden="true" />;
  if (l === 'site') return <MapPin className={common} aria-hidden="true" />;
  if (l === 'hybrid') return <MapPin className={common} aria-hidden="true" />;
  return <Globe className={common} aria-hidden="true" />;
}

function formatToday() {
  const d = new Date();
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

export default function TeamSchedule() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const daysInMonth = selectedDate ? selectedDate.daysInMonth() : 30;

  const formatForBackend = (date: Dayjs | null) =>
    date ? date.format('YYYY-MM-DD') + 'T00:00:00' : null;

  const backendDate = formatForBackend(selectedDate);

  const { data, isLoading } = useQuery<GroupByScheduleType[]>({
    queryKey: ['allTeamSchedule', backendDate],
    queryFn: () => getAllTeamSchedule(backendDate),
  });

  const { data: analyticsData, isLoading: analyticsLoading } = useQuery<ScheduleAnalyticsType>({
    queryKey: ['schedule-analytics', backendDate],
    queryFn: () => getScheduleAnalytics(backendDate),
  });

  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getPercentage = (part: number) => {
    const total = analyticsData?.totalEmployees ?? 0;
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  };

  const scheduleData = [
    {
      label: 'In Office',
      value: analyticsData?.atOffice?.count ?? 0,
      icon: Building2,
      bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      users: analyticsData?.atOffice?.users || [],
      trend: { value: getPercentage(analyticsData?.atOffice?.count ?? 0), isPositive: true },
    },
    {
      label: 'At Site',
      value: analyticsData?.atSite?.count ?? 0,
      icon: MapPin,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-700',
      users: analyticsData?.atSite?.users || [],
      trend: { value: getPercentage(analyticsData?.atSite?.count ?? 0), isPositive: true },
    },
    {
      label: 'Site + Office',
      value: analyticsData?.atSiteAndOffice?.count ?? 0,
      icon: Briefcase,
      bgColor: 'bg-cyan-500/10 dark:bg-cyan-500/20',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      users: analyticsData?.atSiteAndOffice?.users || [],
      trend: { value: getPercentage(analyticsData?.atSiteAndOffice?.count ?? 0), isPositive: true },
    },
    {
      label: 'On Leave',
      value: analyticsData?.onLeave?.count ?? 0,
      icon: UserX,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
      users: analyticsData?.onLeave?.users || [],
      trend: { value: getPercentage(analyticsData?.onLeave?.count ?? 0), isPositive: false },
    },
    {
      label: 'Pending Schedule',
      value: analyticsData?.pendingSchedule?.count ?? 0,
      icon: CalendarArrowDown,
      bgColor: 'bg-rose-100',
      iconColor: 'text-rose-700',
      users: analyticsData?.pendingSchedule?.users || [],
      trend: {
        value: getPercentage(analyticsData?.pendingSchedule?.count ?? 0),
        isPositive: false,
      },
    },
    {
      label: 'Pending Approval',
      value: analyticsData?.pendingApproval?.count ?? 0,
      icon: Clock,
      bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      users: analyticsData?.pendingApproval?.users || [],
      trend: { value: getPercentage(analyticsData?.pendingApproval?.count ?? 0), isPositive: true },
    },
  ];

  return (
    <main className="p-2 md:p-6 lg:p-4">
      <header className="mb-6 flex justify-between flex-wrap">
        <div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-secondary">
            Team Schedules by Group
          </h1>
          <p className="text-sm text-secondary">
            Overview of {formatDate(selectedDate?.toISOString())} schedules for multiple groups.
            Each section shows group details and members.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />

          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            format={'DD-MM-YYYY'}
            placeholder="📆 Custom"
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer bg-gray-50 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'`}
            allowClear={false}
            // suffixIcon={null}
          />
        </div>
      </header>
      <h2 id="overall-summary-title" className="sr-only">
        Overall Team Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scheduleData.map((data) => (
          <SummaryCardWithHoverList
            key={data.label}
            label={data.label}
            value={data.value}
            icon={data.icon}
            bgColor={data.bgColor}
            iconColor={data.iconColor}
            users={data.users || []}
            trend={data.trend}
          />
        ))}
      </div>

      {/* Overall Team Summary */}
      <section aria-labelledby="overall-summary-title" className="mb-8">
        {/* <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {summaryData.map((item, idx) => (
            <Card key={idx} className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${item.bgColor} flex items-center justify-center`}
                    >
                      <item.icon className={`h-5 w-5 ${item.iconColor}`} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="text-2xl font-semibold">{item.value}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Distribution bar */}
        <div className="mt-4">
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <div className="inline-flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full border-1 border-gray-300 bg-white"
                aria-hidden="true"
              />
              <span>Approved Schedule</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
              <span className="text-amber-500">Pending Approval Schedule</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-red-400" aria-hidden="true" />
              <span className="text-rose-400">Schedule Not yet Created</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped sections */}
      <div className="space-y-8">
        {data?.map((group: GroupByScheduleType) => {
          return (
            <section key={group.groupId} aria-labelledby={`group-${group.groupId}-title`}>
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between p-4 border-b bg-white">
                  <div className="flex items-center gap-4">
                    <img src={userImage} alt="icon" className="h-12 w-12 rounded-full" />

                    <div>
                      <CardTitle
                        id={`group-${group.groupId}-title`}
                        className="text-xl font-semibold text-gray-900"
                      >
                        {group.groupName}
                      </CardTitle>
                      <p className="text-sm text-gray-500">ID: {group.groupId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-full border border-gray-200">
                    <User className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="font-medium">{group.groupLeaderName}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="hidden lg:block">
                    <div className="rounded-md border overflow-hidden">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead className="sticky left-0 bg-gray-50 z-10 min-w-[150px]">
                                <Button
                                  variant="ghost"
                                  className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                                >
                                  Employee
                                </Button>
                              </TableHead>

                              <TableHead className="min-w-[100px]">
                                <Button
                                  variant="ghost"
                                  className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                                >
                                  Project
                                </Button>
                              </TableHead>
                              <TableHead className="min-w-[100px]">
                                <Button
                                  variant="ghost"
                                  className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                                >
                                  Work
                                </Button>
                              </TableHead>
                              <TableHead className="min-w-[80px]">
                                <Button
                                  variant="ghost"
                                  className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                                >
                                  Location
                                </Button>
                              </TableHead>
                              <TableHead className="min-w-[100px]">
                                <Button
                                  variant="ghost"
                                  className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                                >
                                  Category
                                </Button>
                              </TableHead>
                              <TableHead className="min-w-[250px]">
                                <Button
                                  variant="ghost"
                                  className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                                >
                                  Description
                                </Button>
                              </TableHead>
                              <TableHead className="min-w-[130px]">
                                <Button
                                  variant="ghost"
                                  className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                                >
                                  Approval
                                </Button>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {group?.users.map((user: UserScheduleInTeam) => {
                              const schedule = user.schedule;
                              let rowClass = 'hover:bg-gray-50';
                              if (!schedule) {
                                rowClass =
                                  'bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all';
                              } else if (schedule?.status === 'PENDING') {
                                rowClass =
                                  'bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all';
                              }
                              return (
                                <TableRow
                                  key={`${user.userId}-${schedule?.scheduleId}`}
                                  className={rowClass}
                                >
                                  <TableCell className="sticky left-0 bg-inherit z-10">
                                    <div>
                                      <div className="font-medium text-[#0D355C] text-sm">
                                        {user?.username}
                                      </div>
                                      {/* <div className="text-xs text-gray-600">
                                        {capitalizeFirstLetter(schedule?.user?.role?.roleName)}
                                      </div> */}
                                    </div>
                                  </TableCell>

                                  {schedule ? (
                                    <>
                                      <TableCell>
                                        {schedule?.project?.projectNo ? (
                                          <Badge
                                            title={schedule?.project?.customerName}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {schedule?.project?.projectNo}
                                          </Badge>
                                        ) : (
                                          '-'
                                        )}
                                      </TableCell>
                                      <TableCell
                                        className="max-w-[200px] truncate text-sm"
                                        title={schedule?.work?.workName}
                                      >
                                        {schedule?.work?.workName ?? '-'}
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-2">
                                          {schedule?.location?.locationName &&
                                            getLocationIcon(schedule?.location?.locationName)}
                                          <span className="text-sm">
                                            {schedule?.location?.locationName}
                                          </span>
                                        </div>
                                      </TableCell>

                                      <TableCell>
                                        {schedule?.location?.locationName != 'Leave' ? (
                                          <Badge
                                            variant={
                                              schedule?.isChargeable ? 'default' : 'secondary'
                                            }
                                            className={`text-xs ${
                                              schedule?.isChargeable
                                                ? 'bg-green-700 text-white'
                                                : 'bg-red-600 text-white'
                                            }`}
                                          >
                                            {schedule?.isChargeable
                                              ? 'Chargeable'
                                              : 'Non-Chargeable'}
                                          </Badge>
                                        ) : (
                                          '-'
                                        )}
                                      </TableCell>
                                      <TableCell
                                        className="max-w-[200px] truncate text-sm"
                                        title={schedule?.description}
                                      >
                                        {schedule?.description ?? '-'}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant={schedule?.status ? 'default' : 'secondary'}
                                          className={`text-xs ${
                                            schedule?.status === 'APPROVED'
                                              ? 'bg-green-700 text-white'
                                              : 'bg-red-600 text-white'
                                          }`}
                                        >
                                          {schedule?.status}
                                        </Badge>
                                      </TableCell>
                                    </>
                                  ) : (
                                    <>
                                      <TableCell
                                        colSpan={6}
                                        className="text-center font-medium opacity-50"
                                      >
                                        Schedule not created
                                      </TableCell>
                                    </>
                                  )}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>

                  {/* Mobile/Tablet Card View */}
                  <div className="lg:hidden space-y-3">
                    {group?.users.map((user: UserScheduleInTeam) => {
                      const schedule = user.schedule;
                      return (
                        <Card
                          key={schedule?.scheduleId || user.userId}
                          className={`border border-gray-200 bg-green-50 ${
                            !schedule ? 'text-rose-800 blink-error' : ''
                          }`}
                        >
                          <CardContent className="p-4 ">
                            {/* Case 1: Schedule exists */}
                            {schedule ? (
                              <>
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-[#0D355C] text-sm mb-1">
                                      {schedule?.user?.username}
                                    </div>
                                    <div className="text-xs text-gray-600 mb-2">
                                      {capitalizeFirstLetter(schedule?.user?.role?.roleName)}
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        Group {group?.groupId}
                                      </Badge>

                                      {schedule?.project?.projectNo ? (
                                        <Badge variant="outline" className="text-xs">
                                          {schedule?.project?.projectNo}
                                        </Badge>
                                      ) : null}

                                      <Badge
                                        className={`text-xs ${getStatusColor(schedule?.status)}`}
                                      >
                                        {schedule?.status || 'Unknown'}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-1 pt-3 border-t border-gray-100 space-y-2">
                                  <div>
                                    <span className="text-gray-500 text-xs">Project :</span>
                                    <div className="text-sm mt-1">
                                      {capitalizeFirstLetter(schedule?.project?.projectName) || '-'}
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-gray-500 text-xs">Location:</span>
                                    <div className="text-sm mt-1">
                                      {schedule?.location?.locationName}
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-gray-500 text-xs">Work:</span>
                                    <div className="text-sm mt-1">{schedule?.work?.workName}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 text-xs">Category:</span>
                                    <div className="mt-1">
                                      <Badge
                                        variant={schedule?.isChargeable ? 'default' : 'secondary'}
                                        className={`text-xs ${
                                          schedule?.isChargeable
                                            ? 'bg-green-700 text-white'
                                            : 'bg-red-600 text-white'
                                        }`}
                                      >
                                        {schedule?.isChargeable ? 'Chargeable' : 'Non-Chargeable'}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 text-xs">Description:</span>
                                    <div className="text-sm mt-1">{schedule?.description}</div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              /* Case 2: No Schedule */
                              <div className="text-center py-6 ">
                                <div className="font-medium text-sm text-rose-800">
                                  {user.username}
                                </div>
                                <div className="text-xs text-rose-900">Schedule not created</div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
                {/* ) : (
                  <p className="text-sm text-gray-300 text-center">
                    Schedule not created.
                  </p>
                )} */}
              </Card>
            </section>
          );
        })}
      </div>
    </main>
  );
}

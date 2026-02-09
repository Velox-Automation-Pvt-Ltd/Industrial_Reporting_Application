import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import {
  Users,
  Search,
  Calendar,
  MapPin,
  Briefcase,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  group_no: number;
  is_team_leader: boolean;
  employeeId: string;
}

interface TeamViewTabProps {
  user: User;
}

interface Schedule {
  id: number;
  date: string;
  employeeName: string;
  employeeId: string;
  groupNo: number;
  projectNumber: string;
  location: string;
  work: string;
  workCategory: string;
  workDescription: string;
  status: string;
}

type SortField = keyof Schedule;
type SortDirection = 'asc' | 'desc' | null;

const getLocationIcon = (location: string) => {
  switch (location) {
    case 'Site':
      return <MapPin className="h-3 w-3 text-blue-500" />;
    case 'Office':
      return <Briefcase className="h-3 w-3 text-green-500" />;
    case 'WFH':
      return <Calendar className="h-3 w-3 text-purple-500" />;
    case 'Site + Office':
      return <MapPin className="h-3 w-3 text-orange-500" />;
    default:
      return <Calendar className="h-3 w-3 text-gray-500" />;
  }
};

export default function Report() {
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const [selectedEmployee, setSelectedEmployee] = useState('all');

  const teamSchedules: Schedule[] = [
    {
      id: 1,
      date: '2024-01-15',
      employeeName: 'John Engineer',
      employeeId: 'VEL001',
      groupNo: 1,
      projectNumber: 'PRJ001',
      location: 'Site',
      work: 'Service',
      workCategory: 'Chargeable',
      workDescription: 'Commissioning and system integration for industrial automation project',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2024-01-15',
      employeeName: 'Sarah Developer',
      employeeId: 'VEL005',
      groupNo: 1,
      projectNumber: 'PRJ002',
      location: 'Office',
      work: 'Software Development ',
      workCategory: 'Non-chargeable',
      workDescription: 'Project Development and documentation review',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2024-01-16',
      employeeName: 'Mike Technician',
      employeeId: 'VEL006',
      groupNo: 2,
      projectNumber: 'PRJ003',
      location: 'WFH',
      work: ' Software Development ',
      workCategory: 'Chargeable',
      workDescription: 'Online Support and remote troubleshooting',
      status: 'Pending',
    },
    {
      id: 4,
      date: '2024-01-16',
      employeeName: 'Lisa Engineer',
      employeeId: 'VEL007',
      groupNo: 2,
      projectNumber: 'PRJ004',
      location: 'Site + Office',
      work: 'Project Development',
      workCategory: 'Chargeable',
      workDescription: 'Service & Project Development coordination',
      status: 'Scheduled',
    },
    {
      id: 5,
      date: '2024-01-17',
      employeeName: 'David Support',
      employeeId: 'VEL008',
      groupNo: 3,
      projectNumber: 'PRJ005',
      location: 'Site',
      work: 'Commissioning',
      workCategory: 'Chargeable',
      workDescription: 'Client Meeting and requirement analysis',
      status: 'Scheduled',
    },

    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 6,
      date: `2024-01-${18 + (i % 10)}`,
      employeeName: `Employee ${i + 6}`,
      employeeId: `VEL${String(i + 12).padStart(3, '0')}`,
      groupNo: (i % 4) + 1,
      projectNumber: `PRJ${String(i + 6).padStart(3, '0')}`,
      location: ['Site', 'Office', 'WFH', 'Site + Office'][i % 4],
      work: [
        'Service',
        'Commissioning',
        'Project Development',
        'Online Support',
        'Software Development',
        'Client Meeting',
        'Training',
      ][i % 4],
      workCategory: i % 2 === 0 ? 'Chargeable' : 'Non-chargeable',
      workDescription: [
        'Software Development and testing',
        'System commissioning and validation',
        'Client training and support',
        'Project documentation and review',
        'Hardware installation and setup',
      ][i % 5],
      status: ['Completed', 'Pending', 'Scheduled'][i % 3],
    })),
  ];

  const groups = [
    { value: 'all', label: 'All Groups' },
    { value: '1', label: 'Group 1' },
    { value: '2', label: 'Group 2' },
    { value: '3', label: 'Group 3' },
    { value: '4', label: 'Group 4' },
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Scheduled', label: 'Scheduled' },
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'Site', label: 'Site' },
    { value: 'Office', label: 'Office' },
    { value: 'Site + Office', label: 'Site + Office' },
    { value: 'WFH', label: 'Work from Home' },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Chargeable', label: 'Chargeable' },
    { value: 'Non-chargeable', label: 'Non-chargeable' },
  ];

  const employees = [
    { value: 'all', label: 'All Employees' },
    ...Array.from(new Set(teamSchedules.map((s) => s.employeeName)))
      .sort()
      .map((name) => ({ value: name, label: name })),
  ];

  const filteredAndSortedSchedules = useMemo(() => {
    const filtered = teamSchedules.filter((schedule) => {
      const matchesGroup = selectedGroup === 'all' || schedule.groupNo.toString() === selectedGroup;
      const matchesStatus = selectedStatus === 'all' || schedule.status === selectedStatus;
      const matchesLocation = selectedLocation === 'all' || schedule.location === selectedLocation;
      const matchesCategory =
        selectedCategory === 'all' || schedule.workCategory === selectedCategory;

      const matchesEmployee =
        selectedEmployee === 'all' || schedule.employeeName === selectedEmployee;

      const scheduleDate = new Date(schedule.date);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      const matchesDateRange =
        (!fromDate || scheduleDate >= fromDate) && (!toDate || scheduleDate <= toDate);

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === '' ||
        schedule.employeeName.toLowerCase().includes(searchLower) ||
        schedule.employeeId.toLowerCase().includes(searchLower) ||
        schedule.projectNumber.toLowerCase().includes(searchLower) ||
        schedule.location.toLowerCase().includes(searchLower) ||
        schedule.workCategory.toLowerCase().includes(searchLower) ||
        schedule.workDescription.toLowerCase().includes(searchLower) ||
        schedule.status.toLowerCase().includes(searchLower) ||
        schedule.groupNo.toString().includes(searchLower);

      return (
        matchesEmployee &&
        matchesGroup &&
        matchesStatus &&
        matchesLocation &&
        matchesCategory &&
        matchesDateRange &&
        matchesSearch
      );
    });

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'date') {
          aValue = new Date(aValue as string).getTime();
          bValue = new Date(bValue as string).getTime();
        }

        if (sortField === 'groupNo') {
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
  }, [
    selectedGroup,
    selectedStatus,
    selectedLocation,
    selectedCategory,
    searchTerm,
    dateFrom,
    dateTo,
    sortField,
    sortDirection,
    selectedEmployee,
  ]);

  const totalPages = Math.ceil(filteredAndSortedSchedules.length / itemsPerPage);
  const paginatedSchedules = filteredAndSortedSchedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-3 w-3 ml-1" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-3 w-3 ml-1" />;
    return <ArrowUpDown className="h-3 w-3 ml-1" />;
  };

  const clearAllFilters = () => {
    setSelectedGroup('all');
    setSelectedStatus('all');
    setSelectedLocation('all');
    setSelectedCategory('all');
    setSearchTerm('');
    setDateFrom('');
    setDateTo('');
    setSortField(null);
    setSortDirection(null);
    setCurrentPage(1);
    setSelectedEmployee('all');
  };

  const exportToCSV = () => {
    const headers = [
      'Employee Name',
      'Employee ID',
      'Group',
      'Date',
      'Project',
      'Location',
      'Category',
      'Description',
      'Status',
    ];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedSchedules.map((schedule) =>
        [
          schedule.employeeName,
          schedule.employeeId,
          `Group ${schedule.groupNo}`,
          schedule.date,
          schedule.projectNumber,
          schedule.location,
          schedule.workCategory,
          schedule.workDescription,
          schedule.status,
        ].join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team-schedules-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const groupStats = groups.slice(1).map((group) => {
    const groupSchedules = filteredAndSortedSchedules.filter(
      (s) => s.groupNo.toString() === group.value,
    );
    return {
      group: group.label,
      total: groupSchedules.length,
      completed: groupSchedules.filter((s) => s.status === 'Completed').length,
      pending: groupSchedules.filter((s) => s.status === 'Pending').length,
      scheduled: groupSchedules.filter((s) => s.status === 'Scheduled').length,
    };
  });

  const activeFiltersCount = [
    selectedGroup !== 'all',
    selectedStatus !== 'all',
    selectedLocation !== 'all',
    selectedCategory !== 'all',
    dateFrom !== '',
    dateTo !== '',
    searchTerm !== '',
    selectedEmployee !== 'all',
  ].filter(Boolean).length;

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredAndSortedSchedules.length);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
        <div className="text-sm text-gray-600 order-2 sm:order-1">
          Showing {startItem} to {endItem} of {filteredAndSortedSchedules.length} results
        </div>

        <div className="flex items-center gap-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="hidden sm:flex"
          >
            First
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          {/* Mobile pagination - show only current page */}
          <div className="flex items-center gap-1 sm:hidden">
            <span className="px-3 py-1 text-sm bg-[#0D355C] text-white rounded">{currentPage}</span>
            <span className="text-sm text-gray-500">of {totalPages}</span>
          </div>

          {/* Desktop pagination - show page numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? 'bg-[#0D355C] text-white' : ''}
                >
                  {pageNum}
                </Button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-2 text-gray-400">...</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="hidden sm:flex"
          >
            Last
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="px-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#0D355C] mb-2">Team Schedules</h3>
        <p className="text-sm sm:text-base text-gray-600">
          View all team members' schedules across different groups
        </p>
      </div>

      {/* Group Statistics - Responsive Grid */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {groupStats.map((stat) => (
          <Card key={stat.group} className="border-l-4 border-l-[#0D355C]">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 flex items-center gap-1 sm:gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate">{stat.group}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-2xl font-bold text-[#0D355C] mb-1 sm:mb-2">
                {stat.total}
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs">
                <Badge className="bg-green-100 text-green-800 text-xs px-1 py-0.5">
                  {stat.completed} Done
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 text-xs px-1 py-0.5">
                  {stat.scheduled} Scheduled
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl text-[#0D355C]">
                Team Schedule Overview
              </CardTitle>
              <CardDescription className="text-sm">
                Advanced filtering and search across all team schedules
                {filteredAndSortedSchedules.length !== teamSchedules.length && (
                  <span className="ml-2 text-[#0D355C] font-medium">
                    ({filteredAndSortedSchedules.length} of {teamSchedules.length} records)
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
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
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full sm:w-auto bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Clear Filters ({activeFiltersCount})</span>
                  <span className="sm:hidden">Clear ({activeFiltersCount})</span>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 ">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search across all fields..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 text-sm sm:text-base"
            />
          </div>

          {/* Collapsible Advanced Filters */}
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs text-white"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
                {isFiltersOpen ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Employee</Label>
                  <Select
                    value={selectedEmployee}
                    onValueChange={(value) => {
                      setSelectedEmployee(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="text-sm ">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.value} value={emp.value}>
                          {emp.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Group</Label>
                  <Select
                    value={selectedGroup}
                    onValueChange={(value) => {
                      setSelectedGroup(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="text-sm ">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.value} value={group.value}>
                          {group.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Status</Label>
                  <Select
                    value={selectedStatus}
                    onValueChange={(value) => {
                      setSelectedStatus(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <Select
                    value={selectedLocation}
                    onValueChange={(value) => {
                      setSelectedLocation(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* date filter  */}

                <div>
                  <Label className="text-sm font-medium mb-2 block">From Date</Label>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">To Date</Label>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

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
                      <TableHead className="min-w-[80px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('groupNo')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Group
                          {getSortIcon('groupNo')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('date')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Date
                          {getSortIcon('date')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('projectNumber')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Project
                          {getSortIcon('projectNumber')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('projectNumber')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Work
                          {getSortIcon('projectNumber')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[120px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('location')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Location
                          {getSortIcon('location')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('workCategory')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Category
                          {getSortIcon('workCategory')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[200px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('workDescription')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Description
                          {getSortIcon('workDescription')}
                        </Button>
                      </TableHead>
                      <TableHead className="min-w-[100px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('status')}
                          className="h-auto p-0 font-semibold hover:bg-transparent text-xs"
                        >
                          Status
                          {getSortIcon('status')}
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSchedules.map((schedule) => (
                      <TableRow key={schedule.id} className="hover:bg-gray-50">
                        <TableCell className="sticky left-0 bg-white z-10">
                          <div>
                            <div className="font-medium text-[#0D355C] text-sm">
                              {schedule.employeeName}
                            </div>
                            <div className="text-xs text-gray-600">{schedule.employeeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            Group {schedule.groupNo}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          {new Date(schedule.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {schedule.projectNumber}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-sm" title={schedule.work}>
                          {schedule.work}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getLocationIcon(schedule.location)}
                            <span className="text-sm">{schedule.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              schedule.workCategory === 'Chargeable' ? 'default' : 'secondary'
                            }
                            className={`text-xs ${
                              schedule.workCategory === 'Chargeable'
                                ? 'bg-green-700 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {schedule.workCategory}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className="max-w-[200px] truncate text-sm"
                          title={schedule.workDescription}
                        >
                          {schedule.workDescription}
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getStatusColor(schedule.status)}`}>
                            {schedule.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-3">
            {paginatedSchedules.map((schedule) => (
              <Card key={schedule.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#0D355C] text-sm mb-1">
                        {schedule.employeeName}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{schedule.employeeId}</div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Group {schedule.groupNo}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {schedule.projectNumber}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(schedule.status)}`}>
                          {schedule.status}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleRowExpansion(schedule.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {expandedRows.has(schedule.id) ? 'Hide Details' : 'View Details'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {expandedRows.has(schedule.id) && (
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                      <div>
                        <span className="text-gray-500 text-xs">Category:</span>
                        <div className="mt-1">
                          <Badge
                            variant={
                              schedule.workCategory === 'Chargeable' ? 'default' : 'secondary'
                            }
                            className={`text-xs ${
                              schedule.workCategory === 'Chargeable'
                                ? 'bg-[#0D355C] text-white'
                                : ''
                            }`}
                          >
                            {schedule.workCategory}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Description:</span>
                        <div className="text-sm mt-1">{schedule.workDescription}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {renderPagination()}

          {/* Empty State */}
          {filteredAndSortedSchedules.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules found</h3>
              <p className="text-gray-600 mb-4 text-sm">
                {activeFiltersCount > 0
                  ? 'Try adjusting your filters or search terms'
                  : 'No team schedules available'}
              </p>
              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
} from 'lucide-react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import SearchBar from '../Search/SearchBar';
import DebouncedSearchBar from '../Search/DebouncedSearchBar';
import IconButton from '../Buttons/IconButton';
import Iconify from '../Buttons/Iconify';
import { useIsMobile } from 'src/hooks/useModal';
import { DataColumn } from 'src/types';
import { useTheme } from 'src/context/ThemeContext';

export type SortingState = {
  id: string;
  desc: boolean;
} | null;

export type FilterValue = {
  id: string;
  value: string;
};

export type DataTableProps = {
  tableTitle: string;
  addBtnText?: string;
  tableDescription?: string;
  data: any[];
  columns: DataColumn[];
  onRowClick?: (row: any) => void;
  onAddClick?: () => void;
  onApprovalClick?: () => void;
  onRefreshClick?: () => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPaginationChange?: (page: number, pageSize: number) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onSearchChange?: (searchTerm: string) => void;
  onFilterChange?: (filters: FilterValue[]) => void;
  filterableColumns?: string[];
  isLoading?: boolean;
  actionColumnCenter?: boolean;
  getRowClassName?: (row: any) => string;
  totalPages?: number;
  totalElements?: number;
  numberOfElements?: number;
  currentPage?: number;
  needApproval?: boolean;
  needSearch?: boolean;
  needRefreshBtn?: boolean;
  searchPlaceholder?: string;
  useDebounceSearch?: boolean;
  searchDebounceDelay?: number;
};

export function DataTable({
  tableTitle,
  addBtnText,
  data,
  columns,
  onRowClick,
  onAddClick,
  onApprovalClick,
  onRefreshClick,
  pageSize: propPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  onPaginationChange,
  onSortingChange,
  onSearchChange,
  onFilterChange,
  filterableColumns = [],
  isLoading = false,
  actionColumnCenter,
  getRowClassName,
  tableDescription,
  totalPages: propTotalPages = 0,
  totalElements: propTotalElements = 0,
  numberOfElements: propNumberOfElements = 0,
  currentPage: propCurrentPage = 1,
  needApproval,
  needSearch = true,
  needRefreshBtn = true,
  searchPlaceholder = 'Search...',
  useDebounceSearch = false,
  searchDebounceDelay = 500,
}: DataTableProps) {
  // const { theme } = useTheme();
  const isDarkMode = false;
  const isMobile = useIsMobile();

  // State
  // const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>(null);
  const [filters, setFilters] = useState<FilterValue[]>([]);

  // Use props directly for pagination
  const currentPage = propCurrentPage;
  const pageSize = propPageSize;
  const totalPages = propTotalPages;
  const totalElements = propTotalElements;
  const numberOfElements = propNumberOfElements;

  // Determine if we're doing server-side operations
  const isServerSide = useMemo(
    () => !!onPaginationChange || !!onSortingChange || !!onSearchChange || !!onFilterChange,
    [onPaginationChange, onSortingChange, onSearchChange, onFilterChange],
  );

  // Derived state - use server-side data as-is when server-side operations are enabled
  const processedData = useMemo(() => {
    if (isServerSide) {
      // For server-side operations, use data as-is since filtering/sorting/searching is done on server
      return data;
    } else {
      // For client-side operations, apply local filtering, searching, and sorting
      const filteredData = applyFilters(applySearch(data, searchTerm), filters);
      return applySorting(filteredData, sorting);
    }
  }, [data, searchTerm, filters, sorting, isServerSide]);

  const sortedData = processedData;

  // Effects for calling parent callbacks
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  }, [searchTerm, onSearchChange]);

  useEffect(() => {
    if (onSortingChange) {
      onSortingChange(sorting);
    }
  }, [sorting, onSortingChange]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  const handleSort = (columnId: string) => {
    setSorting((prev) => {
      if (prev?.id === columnId) {
        return prev.desc ? null : { id: columnId, desc: true };
      }
      return { id: columnId, desc: false };
    });
  };

  // Handlers
  // const handleSort = useCallback(
  //   (columnId: string) => {
  //     const newSorting =
  //       sorting?.id === columnId
  //         ? sorting.desc
  //           ? null
  //           : { id: columnId, desc: true }
  //         : { id: columnId, desc: false };

  //     setSorting(newSorting);
  //     if (onPaginationChange) {
  //       onPaginationChange(1, pageSize);
  //     }
  //   },
  //   [sorting, pageSize, onPaginationChange],
  // );

  const handlePageChange = useCallback(
    (page: number) => {
      if (onPaginationChange) {
        onPaginationChange(page, pageSize);
      }
    },
    [pageSize, onPaginationChange],
  );

  const handlePageSizeChange = useCallback(
    (size: string) => {
      const newSize = Number(size);
      if (onPaginationChange) {
        onPaginationChange(1, newSize);
      }
    },
    [onPaginationChange],
  );

  // const handleSearch = useCallback(
  //   (value: string) => {
  //     setSearchTerm(value);
  //     if (onPaginationChange) {
  //       onPaginationChange(1, pageSize);
  //     }
  //   },
  //   [pageSize, onPaginationChange],
  // );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // setCurrentPage(1);
  };

  const handleFilter = useCallback((columnId: string, value: string) => {
    setFilters((prev) => {
      const existingIndex = prev.findIndex((f) => f.id === columnId);

      if (existingIndex >= 0) {
        if (!value) {
          return prev.filter((f) => f.id !== columnId);
        }
        const newFilters = [...prev];
        newFilters[existingIndex] = { id: columnId, value };
        return newFilters;
      }

      if (!value) return prev;
      return [...prev, { id: columnId, value }];
    });

    // if (onPaginationChange) {
    //   onPaginationChange(1, pageSize);
    // }
  }, []);

  function applySearch(data: any[], term: string) {
    if (!term) return data;
    const lowerTerm = term.toLowerCase();
    return data?.filter((item) => {
      return Object.values(item).some((value) => String(value).toLowerCase().includes(lowerTerm));
    });
  }

  function applyFilters(data: any[], filters: FilterValue[]) {
    if (!filters?.length) return data;
    return data.filter((item) => {
      return filters.every((filter) => {
        const value = item[filter.id];
        return String(value).toLowerCase().includes(filter.value.toLowerCase());
      });
    });
  }

  function applySorting(data: any[], sorting: SortingState) {
    if (!sorting) return data;
    return [...data]?.sort((a, b) => {
      const aValue = a[sorting.id];
      const bValue = b[sorting.id];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sorting.desc ? -comparison : comparison;
    });
  }

  // Render functions
  const renderSortIcon = useCallback(
    (column: DataColumn) => {
      if (!column.sortable) return null;

      if (sorting?.id === column.id) {
        return sorting.desc ? (
          <ChevronDown className="ml-2 h-4 w-4" />
        ) : (
          <ChevronUp className="ml-2 h-4 w-4" />
        );
      }

      return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />;
    },
    [sorting],
  );

  const renderFilterDropdown = useCallback(
    (column: DataColumn) => {
      if (!filterableColumns.includes(column.id)) return null;

      const uniqueValues = Array.from(new Set(data.map((item) => item[column.id])));
      const currentFilter = filters.find((f) => f.id === column.id);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Filter {column.header}</span>
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={cn(isDarkMode ? 'bg-gray-800' : 'bg-gray-100')}
          >
            <div className="p-2">
              <Input
                placeholder="Filter..."
                value={currentFilter?.value || ''}
                onChange={(e) => handleFilter(column.id, e.target.value)}
                className="h-8"
              />
            </div>
            {uniqueValues.slice(0, 10).map((value) => (
              <DropdownMenuItem
                key={String(value)}
                onClick={() => handleFilter(column.id, String(value))}
              >
                {String(value)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    [filterableColumns, data, filters, handleFilter, isDarkMode],
  );

  return (
    <div className={cn('w-full space-y-6', isDarkMode ? 'text-white' : 'text-gray-900')}>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center flex-col">
          <div>
            <h3 className="text-xl font-bold text-secondary">{tableTitle || 'My Schedules'}</h3>
            <p className="text-secondary font-medium">{tableDescription || 'Manage schedules'}</p>
          </div>
        </div>
        <div className="flex mt-4 sm:mt-0 items-center space-x-2">
          {needSearch &&
            (useDebounceSearch ? (
              <DebouncedSearchBar
                query={searchTerm}
                onSearch={setSearchTerm}
                onClear={() => setSearchTerm('')}
                placeholder={searchPlaceholder}
                debounceDelay={searchDebounceDelay}
              />
            ) : (
              <SearchBar
                placeholder={searchPlaceholder}
                query={searchTerm}
                setQuery={setSearchTerm}
                onClear={() => setSearchTerm('')}
              />
            ))}

          {addBtnText && (
            <IconButton className="p-4" onClick={onAddClick} title="Add ">
              <Iconify icon={'mdi:plus'} size={24} /> &nbsp;
              {!isMobile && <span className="text-sm">{addBtnText}</span>}
            </IconButton>
          )}
          {needApproval && (
            <IconButton
              className="p-4"
              onClick={onApprovalClick}
              title="Approved Schedule for All "
            >
              <Iconify icon={'mdi:approval'} size={24} /> &nbsp;
              {!isMobile && <span className="text-sm">Approve All Schedules</span>}
            </IconButton>
          )}

          {needRefreshBtn && (
            <IconButton
              disabled={isLoading}
              className="p-4"
              onClick={onRefreshClick}
              title="Refresh"
            >
              <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin text-gray-400')} />
            </IconButton>
          )}
        </div>
      </div>

      <div className="rounded-sm border border-gray-400 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="">
              {columns.map((column, index) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    column.sortable && 'cursor-pointer select-none rounded-sm',
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
                  )}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div
                    className={`flex items-center ${
                      index === columns.length - 1 && actionColumnCenter && 'justify-center'
                    }`}
                  >
                    {column.header}
                    {renderSortIcon(column)}
                    {renderFilterDropdown(column)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`} className="animate-pulse">
                  {columns.map((column) => (
                    <TableCell key={`skeleton-cell-${column.id}`}>
                      <div className="h-4 w-full rounded bg-gray-200"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={cn(
                    onRowClick && 'cursor-pointer  hover:bg-muted/50',
                    isDarkMode ? 'border-gray-700' : 'border-gray-500',
                    getRowClassName?.(row),
                  )}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns?.map((column) => (
                    <TableCell key={column.id} className="border-gray-500">
                      {column.cell ? column.cell(row) : row[column.accessorKey]}
                      {/* {column.getValue ? column.getValue(row) : row[column.accessorKey]} */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div>
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, totalElements)} of {totalElements} results
            </div>
            {/* <div className="flex items-center">
              <span className="mr-2">Rows:</span>
              <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="h-8 w-[70px] bg-gray-200 rounded-3xl border">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent className={cn(isDarkMode ? 'bg-gray-800' : 'bg-gray-100')}>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm whitespace-nowrap">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {currentPage}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

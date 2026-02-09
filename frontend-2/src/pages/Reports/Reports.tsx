import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

import { Plus, Search, Download } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'Tabular' | 'Graphical' | 'Live';
  lastUpdated: string;
  status: 'Active' | 'Draft';
}

const columns: ColumnDef<Report>[] = [
  { accessorKey: 'name', header: 'Report Name' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'lastUpdated', header: 'Last Updated' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
        >
          {status}
        </span>
      );
    },
  },
];

export default function Reports() {
  const [globalFilter, setGlobalFilter] = useState('');

  const { data: reports = [], isLoading } = useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: async () => {
      // const { data } = await api.get('/reports');
      // return data;
      return [
        {
          id: '1',
          name: 'Monthly Production',
          type: 'Tabular',
          lastUpdated: '2024-02-01',
          status: 'Active',
        },
        {
          id: '2',
          name: 'Machine Performance',
          type: 'Graphical',
          lastUpdated: '2024-01-28',
          status: 'Draft',
        },
        {
          id: '3',
          name: 'Real-time Sensor Data',
          type: 'Live',
          lastUpdated: '2024-02-05',
          status: 'Active',
        },
      ];
    },
  });

  const table = useReactTable({
    data: reports,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { globalFilter },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Reports</h1>
          <p className="text-gray-500">Manage and monitor all industrial reports</p>
        </div>

        <button className="bg-secondary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium shadow-lg shadow-secondary/30 hover:scale-105 transition">
          <Plus size={20} />
          New Report
        </button>
      </div>

      {/* Search & Actions */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search reports..."
            className="w-full pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
        <button className="px-6 bg-white border border-gray-200 rounded-2xl flex items-center gap-2 text-gray-600 hover:bg-gray-50">
          <Download size={20} />
          Export All
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id} className="border-b border-gray-100 bg-blue-gray">
                {headerGroup.headers.map((header: any) => (
                  <th
                    key={header.id}
                    className="px-8 py-5 text-left text-sm font-semibold text-primary"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row: any) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 hover:bg-blue-gray/50 transition"
              >
                {row.getVisibleCells().map((cell: any) => (
                  <td key={cell.id} className="px-8 py-5 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-8 py-4 border-t">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

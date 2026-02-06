import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import reportService from '../services/reportService';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function Reports() {
  const queryClient = useQueryClient();
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportService.getAllReports(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => reportService.deleteReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--theme-color-std-text)' }}>
            Reports
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--theme-color-soft-text)' }}>
            Manage your industrial reports
          </p>
        </div>
        <button 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: 'var(--theme-color-primary)',
            color: 'var(--theme-color-inv-contrast-text)',
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Report
        </button>
      </div>

      <div 
        className="shadow overflow-hidden sm:rounded-md" 
        style={{ backgroundColor: 'var(--theme-color-component-1)' }}
      >
        {isLoading ? (
          <div 
            className="p-6 text-center" 
            style={{ color: 'var(--theme-color-soft-text)' }}
          >
            Loading reports...
          </div>
        ) : reports.length === 0 ? (
          <div 
            className="p-6 text-center" 
            style={{ color: 'var(--theme-color-soft-text)' }}
          >
            No reports found. Click "Create Report" to get started.
          </div>
        ) : (
          <ul style={{ borderTop: '1px solid var(--theme-color-soft-bdr)' }}>
            {reports.map((report, index) => (
              <li 
                key={report.id}
                style={{ 
                  borderBottom: index < reports.length - 1 ? '1px solid var(--theme-color-soft-bdr)' : 'none'
                }}
              >
                <div 
                  className="px-4 py-4 sm:px-6 hover:bg-opacity-50 transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--theme-color-component-2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p 
                        className="text-sm font-medium truncate"
                        style={{ color: 'var(--theme-color-primary)' }}
                      >
                        {report.name}
                      </p>
                      <p 
                        className="mt-2 text-sm"
                        style={{ color: 'var(--theme-color-soft-text)' }}
                      >
                        {report.description}
                      </p>
                      <div 
                        className="mt-2 flex items-center text-sm"
                        style={{ color: 'var(--theme-color-soft-text)' }}
                      >
                        <span className="mr-4">
                          Type: {report.type}
                        </span>
                        <span className="mr-4">
                          Connection: {report.databaseConnectionName}
                        </span>
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{
                            backgroundColor: report.isActive 
                              ? 'var(--theme-color-success)' 
                              : 'var(--theme-color-weak-bdr)',
                            color: 'var(--theme-color-inv-contrast-text)',
                          }}
                        >
                          {report.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 rounded transition-colors"
                        title="View Report"
                        style={{ color: 'var(--theme-color-primary)' }}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 rounded transition-colors"
                        title="Edit Report"
                        style={{ color: 'var(--theme-color-warning)' }}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="p-2 rounded transition-colors"
                        title="Delete Report"
                        disabled={deleteMutation.isPending}
                        style={{ color: 'var(--theme-color-alarm)' }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

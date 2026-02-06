import { useQuery } from '@tanstack/react-query';
import reportService from '../services/reportService';
import { FileText, Database, Activity, Users } from 'lucide-react';

export default function Dashboard() {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportService.getAllReports(),
  });

  const stats = [
    {
      name: 'Total Reports',
      value: reports.length,
      icon: FileText,
      color: '#1976d2',
    },
    {
      name: 'Active Reports',
      value: reports.filter(r => r.isActive).length,
      icon: Activity,
      color: '#4caf50',
    },
    {
      name: 'Database Connections',
      value: new Set(reports.map(r => r.databaseConnectionId)).size,
      icon: Database,
      color: '#9c27b0',
    },
    {
      name: 'Users',
      value: 1,
      icon: Users,
      color: '#ff9800',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--theme-color-std-text)' }}>
          Dashboard
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--theme-color-soft-text)' }}>
          Overview of your industrial reporting system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="overflow-hidden shadow rounded-lg" 
            style={{ backgroundColor: 'var(--theme-color-component-1)' }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div 
                  className="flex-shrink-0 rounded-md p-3" 
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt 
                      className="text-sm font-medium truncate" 
                      style={{ color: 'var(--theme-color-soft-text)' }}
                    >
                      {stat.name}
                    </dt>
                    <dd 
                      className="text-lg font-semibold" 
                      style={{ color: 'var(--theme-color-std-text)' }}
                    >
                      {isLoading ? '...' : stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="mt-8">
        <div 
          className="shadow rounded-lg" 
          style={{ backgroundColor: 'var(--theme-color-component-1)' }}
        >
          <div 
            className="px-4 py-5 sm:px-6" 
            style={{ borderBottom: '1px solid var(--theme-color-soft-bdr)' }}
          >
            <h3 
              className="text-lg leading-6 font-medium" 
              style={{ color: 'var(--theme-color-std-text)' }}
            >
              Recent Reports
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {isLoading ? (
              <p style={{ color: 'var(--theme-color-soft-text)' }}>Loading reports...</p>
            ) : reports.length === 0 ? (
              <p style={{ color: 'var(--theme-color-soft-text)' }}>
                No reports found. Create your first report!
              </p>
            ) : (
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--theme-color-component-2)' }}
                  >
                    <div className="flex items-center">
                      <FileText 
                        className="h-8 w-8" 
                        style={{ color: 'var(--theme-color-primary)' }}
                      />
                      <div className="ml-4">
                        <p 
                          className="text-sm font-medium" 
                          style={{ color: 'var(--theme-color-std-text)' }}
                        >
                          {report.name}
                        </p>
                        <p 
                          className="text-sm" 
                          style={{ color: 'var(--theme-color-soft-text)' }}
                        >
                          {report.description}
                        </p>
                      </div>
                    </div>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

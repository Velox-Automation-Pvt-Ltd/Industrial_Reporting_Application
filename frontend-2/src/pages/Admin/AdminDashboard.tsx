import { Greeting } from 'src/utils/Greetings';
import TeamSchedule from '../common/TeamSchedule';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Activity, FileText, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const COLORS = ['#183A68', '#E63312', '#2A4B7F', '#F0F8FF'];

export default function AdminDashboard() {
  // return (
  //   <div>
  //     <div className="mb-8 ml-2">
  //       <div className="ml-3">
  //         <Greeting />
  //       </div>
  //       {/* <p className="text-gray-600">Manage your schedules and track
  //       your activities</p> */}
  //       {/* <TeamSchedule /> */}

  //     </div>
  //   </div>
  // );

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // const { data } = await api.get('/reports/stats'); // adjust if needed
      // return data;
    },
  });

  const sampleBarData = [
    { name: 'Jan', value: 420 },
    { name: 'Feb', value: 380 },
    { name: 'Mar', value: 510 },
    { name: 'Apr', value: 680 },
    { name: 'May', value: 590 },
  ];

  const samplePieData = [
    { name: 'Live Reports', value: 45 },
    { name: 'Tabular', value: 32 },
    { name: 'Graphical', value: 23 },
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold text-primary">Welcome back, Admin</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your reports today</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">February 07, 2026</p>
          <p className="text-xs text-emerald-600 font-medium">All systems operational</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Reports</p>
              <p className="text-4xl font-bold text-primary mt-2">{87}</p>
            </div>
            <FileText className="text-secondary" size={32} />
          </div>
          <div className="text-emerald-600 text-sm mt-4 flex items-center gap-1">
            <TrendingUp size={16} /> +12% this month
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Live Connections</p>
              <p className="text-4xl font-bold text-primary mt-2">{14}</p>
            </div>
            <Activity className="text-emerald-500" size={32} />
          </div>
          <div className="text-emerald-600 text-sm mt-4">All online</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Exports Today</p>
              <p className="text-4xl font-bold text-primary mt-2">{23}</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
          <div className="text-amber-600 text-sm mt-4">Next export in 2h 14m</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Response Time</p>
              <p className="text-4xl font-bold text-primary mt-2">187ms</p>
            </div>
            <div className="text-emerald-500 text-3xl">⚡</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="font-semibold text-primary mb-6">Monthly Report Activity</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={sampleBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#183A68" />
              <YAxis stroke="#183A68" />
              <Tooltip />
              <Bar dataKey="value" fill="#0e2f55" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="font-semibold text-primary mb-6">Report Types Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={samplePieData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {samplePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

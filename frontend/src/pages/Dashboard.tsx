import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';

const mockChartData = [
  { name: 'Jan', mrr: 4000 },
  { name: 'Feb', mrr: 3000 },
  { name: 'Mar', mrr: 2000 },
  { name: 'Apr', mrr: 2780 },
  { name: 'May', mrr: 1890 },
  { name: 'Jun', mrr: 2390 },
  { name: 'Jul', mrr: 3490 },
];

export function Dashboard() {
  const [metrics, setMetrics] = useState({ mrr: 0, churnRate: 0, activeCustomers: 0 });

  useEffect(() => {
    // In a real app we would fetch like this
    // api.get('/dashboard/metrics').then(res => setMetrics(res.data.data)).catch(console.error);

    // Mock data for immediate preview
    setMetrics({ mrr: 15400, churnRate: 2.5, activeCustomers: 42 });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Monthly Recurring Revenue" value={`$${metrics.mrr.toLocaleString()}`} />
        <MetricCard title="Churn Rate" value={`${metrics.churnRate}%`} />
        <MetricCard title="Active Customers" value={metrics.activeCustomers.toString()} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-100 h-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">MRR Growth</h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Area type="monotone" dataKey="mrr" stroke="#4F46E5" fill="#EEF2FF" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

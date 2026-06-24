import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const Statistics = () => {
  const { data: tempTrend } = useQuery({
    queryKey: ['tempTrend'],
    queryFn: () => fetch(`${API_BASE}/api/trends/temperature/`).then(res => res.json())
  });

  const { data: humTrend } = useQuery({
    queryKey: ['humTrend'],
    queryFn: () => fetch(`${API_BASE}/api/trends/humidity/`).then(res => res.json())
  });

  const chartData = tempTrend?.map((item, index) => ({
    date: new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    temp: parseFloat(item.avg_value).toFixed(1),
    humidity: parseFloat(humTrend?.[index]?.avg_value || 0).toFixed(1)
  })) || [];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Responsive Navigation */}
        <aside className="fixed bottom-0 left-0 right-0 md:static md:w-20 bg-white/80 backdrop-blur-xl md:rounded-3xl p-4 md:p-6 flex md:flex-col justify-around md:justify-start items-center gap-4 md:gap-8 text-blue-600 shadow-xl md:shadow-blue-100/50 border-t md:border border-white z-50">
          <Link to="/" className="p-3 rounded-2xl hover:bg-blue-50 transition-all"><Home size={24} /></Link>
          {/*<Link to="/security" className="p-3 rounded-2xl hover:bg-blue-50 transition-all"><Shield size={24} /></Link>*/}
          <Link to="/statistics" className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200"><BarChart2 size={24} /></Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Analytics Dashboard</h1>
            <p className="text-slate-500 mt-1">Monitoring your environmental trends</p>
          </header>

          <section className="bg-white p-4 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-xl font-bold text-slate-800">Historical Trends</h2>
              <div className="flex gap-2">
                <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">Temperature</span>
                <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Humidity</span>
              </div>
            </div>
            
            <div className="h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} dot={{r: 3}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={3} dot={{r: 3}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Statistics;
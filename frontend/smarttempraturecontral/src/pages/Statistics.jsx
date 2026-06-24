import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const Statistics = () => {
  // Fetching data from your Django API
  const { data: tempTrend } = useQuery({
    queryKey: ['tempTrend'],
    queryFn: () => fetch('http://127.0.0.1:8000/api/trends/temperature/').then(res => res.json())
  });

  const { data: humTrend } = useQuery({
    queryKey: ['humTrend'],
    queryFn: () => fetch('http://127.0.0.1:8000/api/trends/humidity/').then(res => res.json())
  });

  // Combine data by date (Assuming both return same dates)
  const chartData = tempTrend?.map((item, index) => ({
    date: new Date(item.date).toLocaleDateString(),
    temp: item.avg_value,
    humidity: humTrend?.[index]?.avg_value || 0
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 transition-colors duration-300">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-20 bg-white rounded-3xl p-6 flex flex-col items-center gap-8 text-blue-600 shadow-sm border border-gray-100">
          <Link to="/" className="hover:text-blue-400"><Home size={28} /></Link>
          <Link to="/security" className="hover:text-blue-400"><Shield size={28} /></Link>
          <Link to="/statistics" className="hover:text-blue-400"><BarChart2 size={28} /></Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          </header>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Historical Trends</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="temp" name="Temp (°C)" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#10b981" strokeWidth={3} />
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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Home, Shield, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock Data - Replace this with your API call data
const data = [
  { time: '00:00', temp: 22, humidity: 45 },
  { time: '04:00', temp: 20, humidity: 48 },
  { time: '08:00', temp: 24, humidity: 42 },
  { time: '12:00', temp: 28, humidity: 35 },
  { time: '16:00', temp: 27, humidity: 38 },
  { time: '20:00', temp: 23, humidity: 40 },
];

const Statistics = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-blue-50 dark:bg-gray-900 transition-colors duration-300 p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-20 bg-blue-600 dark:bg-gray-800 rounded-3xl p-6 flex flex-col items-center gap-8 text-white transition-colors">
            <Link to="/" className="hover:text-blue-200"><Home size={28} /></Link>
            <Link to="/security" className="hover:text-blue-200"><Shield size={28} /></Link>
            <Link to="/statistics" className="hover:text-blue-200"><BarChart2 size={28} /></Link>
            <div className="mt-auto">
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Analytics</h1>
            </header>

            <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg transition-colors">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">24h Sensor Trends</h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="time" stroke={isDarkMode ? "#9ca3af" : "#4b5563"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#4b5563"} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: 'none' }}
                    />
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
    </div>
  );
};

export default Statistics;
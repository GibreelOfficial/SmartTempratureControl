import { useState } from 'react';
import { Sun, Moon, Home, Shield, BarChart2, Thermometer } from 'lucide-react';
import SensorGauge from '../components/Gauge';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-blue-50'} transition-colors duration-300 p-6`}>
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-20 bg-blue-600 rounded-3xl p-6 flex flex-col items-center gap-8 text-white">
          <Home className="cursor-pointer" />
          <Shield className="cursor-pointer" />
          <BarChart2 className="cursor-pointer" />
          <div className="mt-auto">
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-500">Welcome, Smart Temprature Control panel</h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weather Card - Placeholder for AccuWeather API */}
            <div className="lg:col-span-2 bg-blue-500 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-xl">Weather Forecast</h2>
              {/* Insert AccuWeather Component here */}
            </div>

            {/* Sensor Gauges */}
            <SensorGauge url="http://127.0.0.1:8000/api/temperature/" title="Temperature" unit="°C" maxVal={50} dataKey="temperature" />
            <SensorGauge url="http://127.0.0.1:8000/api/humidity/" title="Humidity" unit="%" maxVal={100} dataKey="humidity" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
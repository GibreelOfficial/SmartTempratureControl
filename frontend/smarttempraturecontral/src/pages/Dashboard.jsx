import { useState } from 'react';
import { Sun, Moon, Home, Shield, BarChart2, Thermometer, CloudSun } from 'lucide-react';
import SensorGauge from '../components/Gauge';
import WeatherWidget from '../components/WeatherWidget';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-blue-50'} transition-colors duration-300 p-6`}>
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-20 bg-blue-600 dark:bg-blue-800 rounded-3xl p-6 flex flex-col items-center gap-8 text-white">
          <Home size={28} />
          <Shield size={28} />
          <BarChart2 size={28} />
          <div className="mt-auto">
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Smart Home Monitor</h1>
          </header>

          {/* Outdoor Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <CloudSun /> Outdoor Environment
            </h2>
            <div className="bg-blue-500 dark:bg-blue-900 rounded-3xl shadow-xl overflow-hidden">
              <WeatherWidget city="Kampala" />
            </div>
          </section>

          {/* Indoor Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Thermometer /> Indoor Monitoring (Arduino)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SensorGauge 
                url="http://127.0.0.1:8000/api/temperature/" 
                title="Indoor Temperature" 
                unit="°C" 
                maxVal={50} 
                dataKey="temperature" 
              />
              <SensorGauge 
                url="http://127.0.0.1:8000/api/humidity/" 
                title="Indoor Humidity" 
                unit="%" 
                maxVal={100} 
                dataKey="humidity" 
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
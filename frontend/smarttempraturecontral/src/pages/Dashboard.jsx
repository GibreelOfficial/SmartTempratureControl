import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Home, Shield, BarChart2, Thermometer, CloudSun } from 'lucide-react';
import SensorGauge from '../components/Gauge';
import WeatherWidget from '../components/WeatherWidget';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-blue-50 dark:bg-gray-900 transition-colors duration-300 p-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-20 bg-blue-600 dark:bg-gray-800 rounded-3xl p-6 flex flex-col items-center gap-8 text-white transition-colors">
            <Link to="/" className="hover:text-blue-200 transition-colors"><Home size={28} /></Link>
            <Link to="/security" className="hover:text-blue-200 transition-colors"><Shield size={28} /></Link>
            <Link to="/statistics" className="hover:text-blue-200 transition-colors"><BarChart2 size={28} /></Link>
            
            <div className="mt-auto">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="hover:text-blue-200 transition-colors"
              >
                {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
                Smart Climate Monitoring Panel
              </h1>
            </header>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2 transition-colors">
                <CloudSun /> Outdoor Environment
              </h2>
              <div className="bg-blue-500 dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transition-colors">
                <WeatherWidget city="Kampala" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2 transition-colors">
                <Thermometer /> Indoor Monitoring (Arduino)
              </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Update the URL to point to your Django view */}
                <SensorGauge 
                  url="http://127.0.0.1:8000/api/temperature/" 
                  title="Indoor Temperature" 
                  unit="°C" 
                  maxVal={80} 
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
    </div>
  );
};

export default Dashboard;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, BarChart2, Thermometer, CloudSun } from 'lucide-react';
import SensorGauge from '../components/Gauge';
import WeatherWidget from '../components/WeatherWidget';
import FanSwitch from '../components/FanSwitch';

const Dashboard = () => {
  // Theme is locked to light mode
  return (
    <div className="min-h-screen bg-gray-200 p-6 transition-colors duration-300">
      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-20 bg-white rounded-3xl p-6 flex flex-col items-center gap-8 text-blue-600 shadow-sm border border-gray-100">
          <Link to="/" className="hover:text-blue-400 transition-colors"><Home size={28} /></Link>
          {/*<Link to="/security" className="hover:text-blue-400 transition-colors"><Shield size={28} /></Link>*/}
          <Link to="/statistics" className="hover:text-blue-400 transition-colors"><BarChart2 size={28} /></Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">
              Smart Temparture Control Dashboard 
            </h1>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <CloudSun /> Outdoor Environment
            </h2>
            <div className="bg-blue-600 rounded-3xl shadow-lg overflow-hidden text-white">
              <WeatherWidget city="Kampala" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Thermometer /> Indoor Monitoring (Arduino)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <FanSwitch DatabaseUrl="http://127.0.0.1:8000/api" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
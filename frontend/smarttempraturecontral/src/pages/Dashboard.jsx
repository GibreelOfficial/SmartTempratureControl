import { Link } from 'react-router-dom';
import { Home, BarChart2, Thermometer, CloudSun } from 'lucide-react';
import SensorGauge from '../components/Gauge';
import WeatherWidget from '../components/WeatherWidget';
import FanSwitch from '../components/FanSwitch';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-6 transition-colors duration-300 pb-24 md:pb-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        
        {/* Sidebar Navigation: Bottom on mobile, Side on desktop */}
        <aside className="fixed bottom-0 left-0 right-0 md:static md:w-20 bg-white/80 backdrop-blur-xl md:rounded-3xl p-4 md:p-6 flex md:flex-col justify-around md:justify-start items-center gap-4 md:gap-8 text-gray-100 shadow-xl md:shadow-blue-100/50 border-t md:border border-white z-50">
          <Link to="/" className="p-3 rounded-2xl bg-blue-500 hover:bg-blue-50 transition-all"><Home size={24} /></Link>
          {/*<Link to="/security" className="p-3 rounded-2xl hover:bg-blue-50 transition-all"><Shield size={24} /></Link>*/}
          <Link to="/statistics" className="p-3 rounded-2xl bg-white text-blue-500 "><BarChart2 size={24} /></Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Smart Temprature Control Dashboard 
            </h1>
          </header>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <CloudSun /> Outdoor Environment
            </h2>
            <div className="bg-blue-600 rounded-3xl shadow-lg overflow-hidden text-white">
              <WeatherWidget city="Kampala" />
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Thermometer /> Indoor Monitoring
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <SensorGauge 
                url={`${API_BASE}/api/temperature/`}
                title="Temperature" 
                unit="°C" 
                maxVal={80} 
                dataKey="temperature" 
              />
              <SensorGauge 
                url={`${API_BASE}/api/humidity/`} 
                title="Humidity" 
                unit="%" 
                maxVal={100} 
                dataKey="humidity" 
              />
              <FanSwitch />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
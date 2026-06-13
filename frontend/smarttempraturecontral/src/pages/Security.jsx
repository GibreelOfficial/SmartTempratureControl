import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Home, Shield, BarChart2, Lock, Camera, AlertTriangle } from 'lucide-react';

const Security = () => {
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
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:text-blue-200 transition-colors">
                {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
                Security System
              </h1>
            </header>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border-l-4 border-green-500 transition-colors">
                <Lock className="text-green-500 mb-2" size={32} />
                <h3 className="text-gray-800 dark:text-white font-bold">Main Door</h3>
                <p className="text-green-500 font-semibold">Locked</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border-l-4 border-yellow-500 transition-colors">
                <Camera className="text-yellow-500 mb-2" size={32} />
                <h3 className="text-gray-800 dark:text-white font-bold">Front Camera</h3>
                <p className="text-yellow-500 font-semibold">Active</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border-l-4 border-red-500 transition-colors">
                <AlertTriangle className="text-red-500 mb-2" size={32} />
                <h3 className="text-gray-800 dark:text-white font-bold">Alarm</h3>
                <p className="text-red-500 font-semibold">Standby</p>
              </div>
            </div>

            {/* Log Section */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg transition-colors">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Access Logs</h2>
              <ul className="space-y-4">
                <li className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700 pb-2">08:45 AM - Door unlocked by admin</li>
                <li className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700 pb-2">07:20 AM - Motion detected on front porch</li>
                <li className="text-gray-600 dark:text-gray-300">06:00 AM - System armed</li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Security;
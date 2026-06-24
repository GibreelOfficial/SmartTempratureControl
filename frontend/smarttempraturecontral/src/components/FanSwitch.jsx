import React, { useState } from 'react';
import { Fan } from 'lucide-react';

const FanSwitch = ({ firebaseDbUrl }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleFan = async () => {
    const newState = !isOn;
    setIsOn(newState);

    await fetch('http://127.0.0.1:8000/api/fan-control/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_on: newState }),
    });
};

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Cooling Control</h3>
      
      {/* Spinning Fan Icon */}
      <div className={`transition-all duration-500 ${isOn ? 'text-blue-500' : 'text-gray-300'}`}>
        <Fan size={64} className={isOn ? 'animate-spin' : ''} />
      </div>

      {/* Glowing Switch */}
      <button
        onClick={toggleFan}
        className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
          isOn ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'bg-gray-300'
        }`}
      >
        <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isOn ? 'translate-x-8' : 'translate-x-0'}`} />
      </button>
      
      <span className="text-sm font-bold dark:text-white">
        {isOn ? 'FAN ACTIVE' : 'FAN OFF'}
      </span>
    </div>
  );
};

export default FanSwitch;
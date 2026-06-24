import React from 'react';
import { useQuery } from '@tanstack/react-query';

const SensorGauge = ({ url, title, unit, maxVal, dataKey }) => {
  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => fetch(url).then(res => res.json()),
    refetchInterval: 5000
  });

  // Access the first item in the array, then the specific key
  const value = data && data.length > 0 ? data[0][dataKey] : 0;
  const percentage = Math.min(Math.max((value / maxVal) * 100, 0), 100);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">{title}</h3>
      
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle className="text-gray-200 dark:text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
          <circle 
            className="text-blue-500 transition-all duration-1000 ease-out" 
            strokeWidth="10" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r={radius} 
            cx="50" 
            cy="50" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl dark:text-white">
          {isLoading ? '...' : `${value}${unit}`}
        </div>
      </div>
    </div>
  );
};

export default SensorGauge;
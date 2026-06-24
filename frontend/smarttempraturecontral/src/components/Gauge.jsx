import React from 'react';
import { useQuery } from '@tanstack/react-query';

const SensorGauge = ({ url, title, unit, maxVal, dataKey }) => {
  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => fetch(url).then(res => res.json()),
    refetchInterval: 5000
  });

  const value = data && data.length > 0 ? data[0][dataKey] : 0;
  const percentage = Math.min(Math.max((value / maxVal) * 100, 0), 100);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-gray-100 p-6 rounded-3xl shadow-sm border border-gray-800 flex flex-col items-center">
      <h3 className="text-sm font-medium text-gray-800 uppercase tracking-wider mb-4">{title}</h3>
      
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track color changed to gray-100 for better visibility in light mode */}
          <circle className="text-white" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
          <circle 
            className="text-blue-600 transition-all duration-1000 ease-out" 
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
        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-gray-800">
          {isLoading ? '...' : `${value}${unit}`}
        </div>
      </div>
    </div>
  );
};

export default SensorGauge;
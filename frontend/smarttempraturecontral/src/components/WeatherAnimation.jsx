import React from 'react';

const WeatherAnimation = ({ iconCode }) => {
  const getAnimation = (code) => {
    if (code.includes('01')) return 'sun';
    if (code.includes('02') || code.includes('03')) return 'cloud';
    if (code.includes('09') || code.includes('10')) return 'rain';
    if (code.includes('13')) return 'snow';
    return 'cloud';
  };

  const type = getAnimation(iconCode);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* Sun */}
      {type === 'sun' && (
        <div className="w-12 h-12 bg-yellow-400 rounded-full animate-weather-pulse shadow-[0_0_20px_rgba(251,191,36,0.6)]"></div>
      )}
      
      {/* Rain */}
      {type === 'rain' && (
        <div className="flex gap-2">
          <div className="w-2 h-4 bg-blue-400 rounded-full animate-weather-rain"></div>
          <div className="w-2 h-4 bg-blue-400 rounded-full animate-weather-rain delay-75"></div>
        </div>
      )}

      {/* Cloud */}
      {type === 'cloud' && (
        <div className="w-12 h-8 bg-white/80 rounded-full animate-bounce"></div>
      )}
      
      {/* Snow */}
      {type === 'snow' && (
        <div className="w-4 h-4 bg-white rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default WeatherAnimation;
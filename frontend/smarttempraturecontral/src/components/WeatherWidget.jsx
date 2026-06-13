import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../services/weatherService';
import WeatherAnimation from './WeatherAnimation';

const WeatherWidget = ({ city = 'Kampala' }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false 
  });

  if (isLoading) return <div className="text-white text-sm p-6">Updating weather...</div>;
  if (error) return <div className="text-white text-sm p-6">Weather unavailable</div>;

  return (
    <div className="text-white p-6">
      {/* Main Temp Row */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">{data.name}</h2>
          <p className="text-5xl font-light">{Math.round(data.main.temp)}°C</p>
          <p className="text-sm opacity-80 capitalize">{data.weather[0].description}</p>
        </div>
        <WeatherAnimation iconCode={data.weather[0].icon} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-4 border-t border-blue-400 pt-4 text-center">
        <div>
          <p className="text-xs opacity-60">Humidity</p>
          <p className="font-bold">{data.main.humidity}%</p>
        </div>
        <div>
          <p className="text-xs opacity-60">Wind</p>
          <p className="font-bold">{data.wind.speed} m/s</p>
        </div>
        <div>
          <p className="text-xs opacity-60">Pressure</p>
          <p className="font-bold">{data.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
const WeatherWidget = () => {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/YOUR_LOCATION_KEY?apikey=YOUR_API_KEY`).then(res => res.json())
  });

  return (
    <div className="text-white">
      <p className="text-4xl">{data?.DailyForecasts[0].Temperature.Maximum.Value}°C</p>
      <p>Probability of Rain: {data?.DailyForecasts[0].Day.PrecipitationProbability}%</p>
    </div>
  );
};